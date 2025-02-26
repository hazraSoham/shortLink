package com.url.shortener.repositories;

import com.url.shortener.models.UrlMapping;
import com.url.shortener.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UrlMappingRepository extends JpaRepository<UrlMapping, Long> {
    Optional<List<UrlMapping>> findByUser(User user);
    Optional<UrlMapping> findByShortURL(String shortUrl);
}
