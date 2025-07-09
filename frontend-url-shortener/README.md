# Frontend URL Shortener - AffordMed Placement Test Submission

## 📌 Overview

This is a React-based frontend application built for the AffordMed Campus Hiring Evaluation (Frontend Track). It allows users to shorten URLs (with optional custom shortcodes and expiry) and uses a custom logging middleware to log important application events.

---

## 🧱 Technologies Used

* **React (Vite)** – for fast, modern SPA development
* **JavaScript** – language for application logic
* **Material UI** – for clean and responsive UI design
* **Custom Logging Middleware** – to report logs to the evaluation server

---

## 📁 Folder Structure

```
frontend-url-shortener/
├── src/
│   ├── App.jsx           # Main component
│   ├── main.jsx          # Entry point
│   ├── index.css         # Global styles
│   └── assets/           # Optional image/font assets
├── public/               # Vite public assets
├── index.html            # HTML template
├── package.json          # Project metadata and dependencies
├── vite.config.js        # Vite configuration
└── .gitignore
```

The logging middleware is placed in a sibling folder:

```
logging-middleware/
└── log.js
```

---

## 🚀 How to Run the App

```bash
# Install dependencies
npm install

# Start the app
npm run dev

# App runs on: http://localhost:3000
```

---

## ✨ Features

* ✅ Shorten up to 5 URLs at once
* ✅ Optional: Custom shortcodes
* ✅ Optional: Set expiry time (in minutes)
* ✅ Client-side validation
* ✅ Logs events like validation errors, API calls, and failures using the provided token

---

## 📝 Logging Middleware

Implemented a reusable function:

```js
logEvent(level, package, message, token)
```

Logs are posted to:

```http
POST http://29.244.56.144/eva1uation-service/logs
```

Used inside `App.jsx` to report real-time frontend events.

---

## 📦 Dependencies

* `@mui/material`
* `react`, `react-dom`
* `vite`

---

## ⚠️ Notes

* This project is for demonstration only.
* API logic is mocked as per instructions; no real shortening server is used.
* The `token` must be kept secure and is hardcoded here for test purposes only.

---
