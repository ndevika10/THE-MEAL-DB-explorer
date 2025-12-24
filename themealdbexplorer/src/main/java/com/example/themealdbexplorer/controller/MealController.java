package com.example.themealdbexplorer.controller;


import com.example.themealdbexplorer.dto.MealDTO;
import com.example.themealdbexplorer.dto.MealSearchResponse;
import com.example.themealdbexplorer.service.MealService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/meals")
@CrossOrigin(origins = "http://localhost:5173")
public class MealController {

    private final MealService mealService;

    public MealController(MealService mealService) {
        this.mealService = mealService;
    }

    @GetMapping("/search")
    public ResponseEntity<MealSearchResponse> searchMeals(
            @RequestParam String name,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "12") int size) {
        return ResponseEntity.ok(mealService.searchMeals(name, page, size));
    }
    @GetMapping("/searchByArea")
    public ResponseEntity<MealSearchResponse> searchMealsByArea(
            @RequestParam String area) {

        return ResponseEntity.ok(mealService.searchMealsByArea(area));
    }

    @GetMapping("/{id}")
    public ResponseEntity<MealDTO> getMealById(@PathVariable("id") String id) {

        MealDTO meal = mealService.getMealDetails(id);

        if (meal == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(meal);
    }

    @GetMapping("/random")
    public ResponseEntity<MealDTO> getRandomMeal() {

        MealDTO meal = mealService.getRandomMeal();

        if (meal == null) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(meal);
    }
}