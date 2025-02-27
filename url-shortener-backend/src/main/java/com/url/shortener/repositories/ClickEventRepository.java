package com.url.shortener.repositories;

import com.url.shortener.models.ClickEvent;
import com.url.shortener.models.UrlMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ClickEventRepository extends JpaRepository<ClickEvent, Long> {
    List<ClickEvent> findByUrlMappingAndClickDateBetween(UrlMapping urlMapping, LocalDateTime startDate, LocalDateTime endDate);

    List<ClickEvent> findByUrlMappingInAndClickDateBetween(List<UrlMapping> urlMappingList, LocalDateTime startDate, LocalDateTime endDate);
}
