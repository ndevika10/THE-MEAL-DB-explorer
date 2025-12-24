# 🍽️ TheMealDB Explorer

A **full-stack web application** built using **Spring Boot (REST API)** and **React (Vite + Tailwind CSS)** that allows users to explore meals from **TheMealDB public API**.

This project demonstrates **REST API best practices**, **backend caching**, and **clean frontend–backend separation**, built as part of a time-bound coding challenge.

---

## 🚀 Features

### 🔹 Frontend (React + Vite)
- Search meals by name
- Browse meals by area
- View detailed meal information
- 🎲 Random Meal Generator
- Responsive UI using Tailwind CSS
- Centralized API service layer (`api.js`)

### 🔹 Backend (Spring Boot)
- RESTful API layer over TheMealDB
- Backend-controlled interaction with external API
- Caffeine-based caching for performance optimization
- Separate cache strategies for:
  - Meal search
  - Area-based meals
  - Meal details
  - Random meal (short TTL)
- DTO-based response mapping
- CORS configuration for frontend communication

---

## 🧠 Architecture Overview
┌──────────────────────────────┐
│     React Frontend           │
│  (Vite + Tailwind CSS)       │
│  http://localhost:5173       │
└───────────────┬──────────────┘
                │
                │ HTTP (REST)
                ▼
┌──────────────────────────────┐
│   Spring Boot Backend        │
│     REST API Layer           │
│  http://localhost:8080       │
│                              │
│  - Caffeine Caching          │
│  - DTO Mapping               │
│  - REST Validation           │
└───────────────┬──────────────┘
                │
                │ External API Calls
                ▼
┌──────────────────────────────┐
│   TheMealDB Public API       │
│ https://www.themealdb.com    │
│    /api/json/v1/1            │
└──────────────────────────────┘



### Why this architecture?
- Frontend never calls external APIs directly
- Backend controls caching, API structure, and error handling
- Clean separation of concerns
- Easy to extend or replace the external API later

---

## 📡 Backend API Endpoints

Base URL: `http://localhost:8080/api/meals`

| Method | Endpoint | Description |
|------|--------|-------------|
| GET | `/search?name={meal}` | Search meals by name |
| GET | `/searchByArea?area={area}` | Search meals by area |
| GET | `/{id}` | Get meal details by ID |
| GET | `/random` | 🎲 Fetch a random meal |

---

## ⚡ Caching Strategy (Caffeine)

| Cache Name | TTL | Purpose |
|-----------|-----|--------|
| `mealSearch` | 60 minutes | Search results |
| `mealSearchByArea` | 60 minutes | Area-based meals |
| `mealDetails` | 120 minutes | Meal details |
| `randomMeal` | 60 seconds | Random meal |

Caching reduces external API calls and improves response time.

---

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Fetch API

### Backend
- Java
- Spring Boot
- Spring Web
- Spring Cache
- Caffeine Cache
- RestTemplate

---
## ▶️ Running the Project Locally

### 1️⃣ Backend (Spring Boot)
- http://localhost:8080


### 2️⃣ Frontend (React)
-http://localhost:5173

---

