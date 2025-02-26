package com.url.shortener.controllers;

import com.url.shortener.dtos.ClickEventResponse;
import com.url.shortener.dtos.URLMapRequest;
import com.url.shortener.dtos.URLMapResponse;
import com.url.shortener.models.User;
import com.url.shortener.services.URLMappingService;
import com.url.shortener.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/api/urls")
public class URLMappingController {

    private final URLMappingService urlMappingService;
    private final UserService userService;

    public URLMappingController(URLMappingService urlMappingService, UserService userService) {
        this.urlMappingService = urlMappingService;
        this.userService = userService;
    }

    // Principal is auto-injected if preauthorize passed
    @PostMapping("/shorten")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<URLMapResponse> createShortURL(@RequestBody URLMapRequest urlMapRequest, Principal principal) {
        User user = userService.findByUsername(principal.getName());
        return ResponseEntity.ok(urlMappingService.createShortURL(urlMapRequest.getUrl(), user));
    }

    @GetMapping("/myurls")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<URLMapResponse>> getUserURLs(Principal principal) {
        User user = userService.findByUsername(principal.getName());
        return ResponseEntity.ok(urlMappingService.getAllURLByUser(user));
    }

    @GetMapping("/analytics/{shortUrl}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<ClickEventResponse>> getUrlAnalytics(@PathVariable String shortUrl,
                                                                    @RequestParam("startDate") String startDate,
                                                                    @RequestParam("endDate") String endDate) {

        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
        LocalDateTime startTime = LocalDateTime.parse(startDate, formatter);
        LocalDateTime endTime = LocalDateTime.parse(endDate, formatter);

        return ResponseEntity.ok(urlMappingService.getClickEventByDate(startTime, endTime, shortUrl));
    }

    @GetMapping("/analytics/totalClicks")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<ClickEventResponse>> getTotalClicksByDate(Principal principal,
                                                                         @RequestParam("startDate") String startDate,
                                                                         @RequestParam("endDate") String endDate) {
        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE;
        LocalDate startTime = LocalDate.parse(startDate, formatter);
        LocalDate endTime = LocalDate.parse(endDate, formatter);

        User user = userService.findByUsername(principal.getName());

        return ResponseEntity.ok(urlMappingService.getTotalClicksByDate(user, startTime, endTime));
    }

}
