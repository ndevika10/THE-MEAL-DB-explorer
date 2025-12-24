package com.example.themealdbexplorer.service;

import com.example.themealdbexplorer.dto.MealDTO;
import com.example.themealdbexplorer.dto.MealSearchResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Collections;
import java.util.List;

@Service
public class MealService {

    private final RestTemplate restTemplate;

    @Value("${themealdb.api.base-url:https://www.themealdb.com/api/json/v1/1}")
    private String baseUrl;

    public MealService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Cacheable(value = "mealSearch", key = "#name + ':' + #page + ':' + #size")
    public MealSearchResponse searchMeals(String name, int page, int size) {
        String url = UriComponentsBuilder.fromHttpUrl(baseUrl + "/search.php")
                .queryParam("s", name)
                .build()
                .toUriString();

        MealSearchResponse response = restTemplate.getForObject(url, MealSearchResponse.class);

        List<MealDTO> allMeals = (response != null && response.getMeals() != null)
                ? response.getMeals()
                : Collections.emptyList();

        // Manual pagination
        int start = (page - 1) * size;
        int end = Math.min(start + size, allMeals.size());

        List<MealDTO> paginated = start < allMeals.size()
                ? allMeals.subList(start, end)
                : Collections.emptyList();

        MealSearchResponse result = new MealSearchResponse();
        result.setMeals(paginated);

        return result;
    }

    @Cacheable(value = "mealSearchByArea", key = "#area")
    public MealSearchResponse searchMealsByArea(String area) {

        String url = UriComponentsBuilder
                .fromHttpUrl(baseUrl + "/filter.php")
                .queryParam("a", area)
                .toUriString();

        MealSearchResponse response =
                restTemplate.getForObject(url, MealSearchResponse.class);

        return response != null ? response : new MealSearchResponse();
    }
    @Cacheable(value = "mealDetails", key = "#mealId")
    public MealDTO getMealDetails(String mealId) {

        String url = UriComponentsBuilder
                .fromHttpUrl(baseUrl + "/lookup.php")
                .queryParam("i", mealId)
                .toUriString();

        MealSearchResponse response =
                restTemplate.getForObject(url, MealSearchResponse.class);

        if (response == null || response.getMeals() == null || response.getMeals().isEmpty()) {
            return null;
        }

        MealDTO meal = response.getMeals().get(0);

        return meal;
    }
    @Cacheable(value = "randomMeal")
    public MealDTO getRandomMeal() {

        String url = UriComponentsBuilder
                .fromHttpUrl(baseUrl + "/random.php")
                .build()
                .toUriString();

        MealSearchResponse response =
                restTemplate.getForObject(url, MealSearchResponse.class);

        if (response == null || response.getMeals() == null || response.getMeals().isEmpty()) {
            return null;
        }

        // TheMealDB random.php always returns exactly one meal
        return response.getMeals().get(0);
    }

}
