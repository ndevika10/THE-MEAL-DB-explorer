package com.example.themealdbexplorer.dto;


import lombok.Data;
import java.util.ArrayList;
import java.util.List;

@Data
public class MealDTO {
    private String idMeal;
    private String strMeal;
    private String strCategory;
    private String strArea;
    private String strInstructions;
    private String strMealThumb;
    private String strYoutube;

    private List<String> ingredients = new ArrayList<>();
    private List<String> measures = new ArrayList<>();
}