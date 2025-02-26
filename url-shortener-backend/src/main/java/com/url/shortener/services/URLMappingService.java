package com.url.shortener.services;

import com.url.shortener.dtos.ClickEventResponse;
import com.url.shortener.dtos.URLMapResponse;
import com.url.shortener.models.ClickEvent;
import com.url.shortener.models.UrlMapping;
import com.url.shortener.models.User;
import com.url.shortener.repositories.ClickEventRepository;
import com.url.shortener.repositories.UrlMappingRepository;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class URLMappingService {

    private final UrlMappingRepository urlMappingRepository;
    private final ClickEventRepository eventRepository;

    public URLMappingService(UrlMappingRepository urlMappingRepository, ClickEventRepository eventRepository) {
        this.urlMappingRepository = urlMappingRepository;
        this.eventRepository = eventRepository;
    }

    public URLMapResponse createShortURL(String url, User user) {
        String shortURL = generateShortURL();

        UrlMapping urlMapping = new UrlMapping();
        urlMapping.setOriginalURL(url);
        urlMapping.setShortURL(shortURL);
        urlMapping.setUser(user);
        urlMapping.setCreatedAt(LocalDateTime.now());

        UrlMapping savedMapping = urlMappingRepository.save(urlMapping);
        return convertToDTO(savedMapping);
    }

    private URLMapResponse convertToDTO(UrlMapping urlMapping) {
        URLMapResponse response = new URLMapResponse();
        response.setId(urlMapping.getId());
        response.setOriginalUrl(urlMapping.getOriginalURL());
        response.setShortUrl(urlMapping.getShortURL());
        response.setUsername(urlMapping.getUser().getUsername());
        response.setClickCount(urlMapping.getClickCount());
        response.setCreatedDate(urlMapping.getCreatedAt());
        response.setUsername(urlMapping.getUser().getUsername());
        return response;
    }

    private String generateShortURL() {
        return RandomStringUtils.randomAlphanumeric(8);
    }


    public List<URLMapResponse> getAllURLByUser(User user) {
        return urlMappingRepository.findByUser(user)
                .orElse(Collections.emptyList())
                .stream()
                .map(this::convertToDTO)  // Apply conversion method
                .collect(Collectors.toList());
    }

    public List<ClickEventResponse> getClickEventByDate(LocalDateTime startTime, LocalDateTime endTime, String shortUrl) {
        UrlMapping urlMapping = urlMappingRepository.findByShortURL(shortUrl).orElseThrow(() -> new RuntimeException("Short URL not found!"));
        return convertClickEventToResponse(eventRepository.findByUrlMappingAndClickDateBetween(urlMapping, startTime, endTime));
    }

    public List<ClickEventResponse> getTotalClicksByDate(User user, LocalDate startTime, LocalDate endTime) {
        List<UrlMapping> urlMappingList = urlMappingRepository.findByUser(user).orElseThrow(() -> new RuntimeException("User not found!"));
        return convertClickEventToResponse(eventRepository.findByUrlMappingInAndClickDateBetween(urlMappingList, startTime.atStartOfDay(), endTime.atStartOfDay()));
    }

    private List<ClickEventResponse> convertClickEventToResponse(List<ClickEvent> clickEvents) {
        return clickEvents.stream()
                .collect(Collectors.groupingBy(click -> click.getClickDate().toLocalDate(), Collectors.counting()))
                .entrySet().stream()
                .map(entry -> {
                    ClickEventResponse response = new ClickEventResponse();
                    response.setClickDate(entry.getKey());
                    response.setCount(entry.getValue());
                    return response;
                }).toList();
    }

    public UrlMapping getOriginalURL(String shortURL) {
        UrlMapping urlMapping = urlMappingRepository.findByShortURL(shortURL).orElseThrow(() -> new RuntimeException("Short URL not found!"));

        // Record the analytics
        // Increase click count by 1
        urlMapping.setClickCount(urlMapping.getClickCount() + 1);
        urlMappingRepository.save(urlMapping);

        //Record the click event
        ClickEvent clickEvent = new ClickEvent();
        clickEvent.setUrlMapping(urlMapping);
        clickEvent.setClickDate(LocalDateTime.now());
        eventRepository.save(clickEvent);

        return urlMapping;
    }
}
