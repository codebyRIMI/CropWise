# 🌾 CropWise

### AI-Powered Precision Agriculture Platform

CropWise is a full-stack precision agriculture platform that combines **machine learning, computer vision, weather intelligence, soil analysis, and farm management** to help users make data-informed agricultural decisions.

The project was developed as a final-year B.Tech project using **React, Django REST Framework, Machine Learning, TensorFlow, PostgreSQL, Redis, and WebSockets**.

---

## ✨ Features

### 🌱 AI Crop Recommendation

* Crop recommendation based on:

  * Nitrogen (N)
  * Phosphorus (P)
  * Potassium (K)
  * Temperature
  * Humidity
  * Soil pH
  * Rainfall
* Random Forest ML model
* Top-5 crop recommendations
* Prediction history
* Location-assisted recommendations using weather and soil data

### 🧪 Soil Analysis

* Soil test analysis using NPK, pH and organic carbon
* Soil health recommendations
* CNN-based soil image classification
* Classification of 7 soil types:

  * Alluvial
  * Arid
  * Black
  * Laterite
  * Mountain
  * Red
  * Yellow
* Image-based moisture and fertility estimation

> Soil image fertility/moisture results are application-level estimates and are not intended to replace laboratory soil testing.

### ☁️ Weather Intelligence

* Current weather
* 5-day forecast
* Temperature and feels-like temperature
* Humidity
* Wind
* UV and precipitation information
* Weather caching
* Stale-cache fallback
* Weather-based notifications

### 🚜 Farm Management

* Planting records
* Harvest records
* Sales
* Expenses
* Resource usage
* Personal farm history

### 🔔 Real-Time Notifications

* Weather notifications
* System notifications
* Notification preferences
* Read/unread status
* Real-time delivery using **Django Channels + WebSockets + Redis/Valkey**

### 👤 Authentication & User Management

* User registration
* Email verification
* JWT authentication
* Access/refresh tokens
* Logout and token blacklisting
* Password reset
* Profile management
* User preferences

### 📊 Analytics

* Crop prediction activity
* Weather activity
* Soil analysis activity
* Soil health statistics
* User activity analytics

### 🌐 Additional Features

* English, Bengali and Hindi support
* Light/Dark theme
* Responsive React interface
* Admin dashboard
* Cloudinary image storage
* Brevo email integration

---

## 🏗️ Architecture

```text
                  ┌─────────────────────┐
                  │    React Frontend   │
                  │  Vite + MUI + SCSS  │
                  └──────────┬──────────┘
                             │
                    REST API / WebSocket
                             │
                  ┌──────────▼──────────┐
                  │   Django Backend    │
                  │       DRF + JWT     │
                  └──────┬─────┬────────┘
                         │     │
             ┌───────────┘     └────────────┐
             ▼                              ▼
      ┌──────────────┐              ┌──────────────┐
      │ ML / CNN     │              │ External APIs│
      │ Crop + Soil  │              │ Weather/Soil │
      └──────────────┘              └──────────────┘
             │
      ┌──────▼───────┐
      │ PostgreSQL   │
      │ Redis/Valkey │
      └──────────────┘
```

---

## 🛠️ Tech Stack

| Category              | Technologies                    |
| --------------------- | ------------------------------- |
| Frontend              | React, Vite, JavaScript         |
| UI                    | Material UI, SCSS, Lucide React |
| Backend               | Django, Django REST Framework   |
| Authentication        | JWT / SimpleJWT                 |
| Database              | SQLite / PostgreSQL             |
| Real-time             | Django Channels, WebSockets     |
| Cache / Channel Layer | Redis / Valkey                  |
| ML                    | Python, scikit-learn            |
| Crop Model            | Random Forest                   |
| Deep Learning         | TensorFlow / Keras              |
| Computer Vision       | OpenCV, Pillow                  |
| Weather               | Tomorrow.io, Open-Meteo         |
| Soil Data             | SoilGrids                       |
| Email                 | Brevo                           |
| Image Storage         | Cloudinary                      |
| Scheduling            | APScheduler                     |

---

## 🤖 Machine Learning

### Crop Recommendation

The final deployed crop recommendation model is a **Random Forest Classifier** using 7 agricultural/environmental features:

```text
N
P
K
Temperature
Humidity
pH
Rainfall
```

The model supports **22 crop classes** and returns the top five predictions.

The inference pipeline uses:

```text
User Input
    ↓
StandardScaler
    ↓
Random Forest
    ↓
Label Encoder
    ↓
Top-5 Crop Recommendations
```

### Soil Image Classification

A CNN model is used to classify soil images into seven soil categories.

```text
Image
  ↓
CNN Feature Extraction
  ↓
Soil Classification
  ↓
Image-based Analysis
  ↓
Moisture / Fertility Estimates
  ↓
Crop Recommendations
```

---

## 📁 Project Structure

```text
CropWise/
│
├── Backend/
│   ├── api/
│   ├── soil/
│   ├── weather/
│   ├── records/
│   ├── profiles/
│   ├── analytics/
│   ├── users/
│   ├── settings/
│   ├── admin_notifications/
│   └── crop_backend/
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api/
│   │   ├── context/
│   │   ├── admin/
│   │   ├── i18n/
│   │   └── scss/
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Backend

```bash
cd Backend

python -m venv venv
```

Windows:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run migrations:

```bash
python manage.py migrate
```

Start the backend:

```bash
python manage.py runserver
```

For ASGI/WebSocket support:

```bash
daphne crop_backend.asgi:application
```

### Frontend

```bash
cd Frontend
npm install
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file for the backend and configure the required services:

```env
SECRET_KEY=your-secret-key
DEBUG=False

DATABASE_URL=your-database-url
REDIS_URL=your-redis-url

WEATHER_API_KEY=your-weather-api-key

BREVO_API_KEY=your-brevo-api-key

CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

Frontend environment variables:

```env
VITE_API_URL=http://localhost:8000
VITE_WS_URL=ws://localhost:8000
```

**Never commit real API keys, passwords, database credentials, or `.env` files to GitHub.**

---

## 🔒 Security

CropWise implements:

* JWT authentication
* Password hashing
* Refresh-token blacklisting
* Email verification
* Protected API endpoints
* User-specific data access
* Protected admin routes
* Environment-based secret management
* Authenticated WebSocket connections

For production deployment, additional rate limiting, stricter CORS/HTTPS configuration, secure headers, and stronger file-upload validation are recommended.

---

## ⚠️ Current Limitations

CropWise is a **final-year academic project and prototype**, rather than a fully production-ready agricultural platform.

* Market-price functionality is currently a UI prototype.
* Some admin dashboard data is mock/demo data.
* ML training datasets and complete training pipelines are not included in the main application repository.
* Location-based recommendations use a combination of real external data and derived/estimated values.
* Soil-image fertility and moisture results are heuristic estimates and should not replace laboratory testing.
* Automated test coverage can be expanded.

---

## 🔮 Future Improvements

* Real-time agricultural market prices
* Advanced fertilizer recommendations
* Explainable AI / SHAP integration
* Larger and more diverse soil-image datasets
* ML model versioning
* Automated CI/CD
* Comprehensive automated testing

---

## 🎓 Academic Project

**CropWise — AI-Powered Precision Agriculture Crop Recommendation System**

This project demonstrates the integration of:

**Full-Stack Development • Machine Learning • Deep Learning • Computer Vision • REST APIs • WebSockets • Cloud Services • Database Management • Real-Time Notifications**

Developed as a B.Tech Computer Science & Engineering final-year project.

---

## 👩‍💻 Contributors

* Shreya Chakraborty
* Rimi Halder
* Debasis Chakraborty
* Ravi Kumar Tiwari
* Aritra Manna

---

## 📄 License

