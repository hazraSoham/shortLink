package com.url.shortener.controllers;

import com.url.shortener.models.UrlMapping;
import com.url.shortener.services.URLMappingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RedirectController {

    private final URLMappingService urlMappingService;

    public RedirectController(URLMappingService urlMappingService) {
        this.urlMappingService = urlMappingService;
    }

    // http://localhost:8080/j7FN0ssH -> redirects to google.com
    @GetMapping("/{shortURL}")
    public ResponseEntity<Void> redirect(@PathVariable String shortURL) {
        UrlMapping urlMapping = urlMappingService.getOriginalURL(shortURL);
        if (urlMapping == null) {
            return ResponseEntity.notFound().build();
        }

        // response 302 means temporary redirection
        return  ResponseEntity.status(302).header("Location", urlMapping.getOriginalURL()).build();
    }
}
