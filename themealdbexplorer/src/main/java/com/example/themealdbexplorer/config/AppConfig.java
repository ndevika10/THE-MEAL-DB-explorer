package com.example.themealdbexplorer.config;


import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.caffeine.CaffeineCache;
import org.springframework.cache.support.SimpleCacheManager;
import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

import java.util.concurrent.TimeUnit;

@Configuration
@EnableCaching
public class AppConfig {

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    @Bean
    public CacheManager cacheManager() {

        SimpleCacheManager cacheManager = new SimpleCacheManager();

        // 🔵 Long-lived caches
        CaffeineCache mealSearchCache = new CaffeineCache(
                "mealSearch",
                Caffeine.newBuilder()
                        .expireAfterWrite(60, TimeUnit.MINUTES)
                        .maximumSize(500)
                        .build()
        );

        CaffeineCache mealSearchByAreaCache = new CaffeineCache(
                "mealSearchByArea",
                Caffeine.newBuilder()
                        .expireAfterWrite(60, TimeUnit.MINUTES)
                        .maximumSize(300)
                        .build()
        );

        CaffeineCache mealDetailsCache = new CaffeineCache(
                "mealDetails",
                Caffeine.newBuilder()
                        .expireAfterWrite(120, TimeUnit.MINUTES)
                        .maximumSize(1000)
                        .build()
        );

        // 🔀 Short-lived random meal cache
        CaffeineCache randomMealCache = new CaffeineCache(
                "randomMeal",
                Caffeine.newBuilder()
                        .expireAfterWrite(60, TimeUnit.SECONDS) // 👈 key point
                        .maximumSize(1)
                        .build()
        );

        cacheManager.setCaches(
                List.of(
                        mealSearchCache,
                        mealSearchByAreaCache,
                        mealDetailsCache,
                        randomMealCache
                )
        );


        return cacheManager;
    }
}
