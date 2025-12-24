package com.example.themealdbexplorer.dto;


import lombok.Data;
import java.util.List;

@Data
public class MealSearchResponse {
    private List<MealDTO> meals;
}