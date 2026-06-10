# AI Agent Dashboard

## 🚀 Project Overview

AI Agent Dashboard is a full-stack intelligent productivity dashboard built for busy IT professionals who need a single place to monitor important information, manage tasks, and interact with an AI-powered assistant.

The dashboard combines real-time data from external APIs with an AI agent powered by Gemini to provide actionable insights, answer user queries, and generate personalized daily briefings.

---

## ✨ Key Features

### 🌦 Real-Time Weather Monitoring

* Search weather for any city worldwide
* Live temperature updates
* Weather conditions
* Humidity information
* Wind speed details
* Dynamic weather chart visualization

### 📰 Technology News Feed

* Fetches latest technology news in real time
* Displays top headlines from trusted sources
* Direct links to full articles

### 💻 GitHub Activity Tracker

* View recent GitHub activity
* Repository event tracking
* Developer productivity insights
* Dynamic GitHub username support

### 📋 Task Management System

* Add new tasks
* Delete tasks
* Persistent storage using MongoDB Atlas
* Real-time updates

### 🤖 AI Agent (Gemini Powered)

* Natural language interaction
* Tool-based responses
* Intelligent query routing
* Real-time information retrieval

### ☀️ Generate My Day

A personalized AI-generated daily briefing that combines:

* Current weather
* Latest tech news
* Existing tasks

The AI agent analyzes all available information and generates a concise productivity-focused summary for the user.

---

## 🏗 System Architecture

```text
React Frontend
       │
       ▼
FastAPI Backend
       │
       ▼
AI Agent Layer
       │
 ┌─────┼─────────────┐
 ▼     ▼             ▼
Weather API     News API
GitHub API      MongoDB Atlas
       │
       ▼
   Gemini AI
```

---

## 🛠 Tech Stack

### Frontend

* React.js
* Axios
* CSS3
* Recharts

### Backend

* FastAPI
* Python
* Requests

### Database

* MongoDB Atlas

### AI

* Google Gemini API

### External APIs

* OpenWeather API
* News API
* GitHub API

---

## 📂 Project Structure

```text
ai-agent-dashboard/

├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Agent.jsx
│   │   │   ├── Weather.jsx
│   │   │   ├── WeatherChart.jsx
│   │   │   ├── News.jsx
│   │   │   ├── Github.jsx
│   │   │   └── Tasks.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   └── App.css
│
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── database/
│   │   └── main.py
│   │
│   └── .env
│
└── README.md
```

---

## ⚙️ Installation & Setup

### Clone Repository

```bash
git clone <repository-url>
cd ai-agent-dashboard
```

---

### Backend Setup

```bash
cd backend

py -m venv venv

venv\Scripts\activate

pip install -r requirements.txt
```

Create `.env`

```env
OPENWEATHER_API_KEY=YOUR_KEY
NEWS_API_KEY=YOUR_KEY
GEMINI_API_KEY=YOUR_KEY
MONGODB_URI=YOUR_MONGODB_URI
```

Run Backend

```bash
uvicorn app.main:app --reload
```

Backend URL:

```text
http://127.0.0.1:8000
```

---

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

## 🔄 Application Workflow

### Weather Flow

```text
User
 ↓
Search City
 ↓
React
 ↓
FastAPI
 ↓
OpenWeather API
 ↓
Dashboard
```

### AI Agent Flow

```text
User Query
 ↓
Agent Router
 ↓
Weather / News / GitHub / Tasks
 ↓
Gemini
 ↓
Response
```

### Generate My Day Flow

```text
Weather
   +
News
   +
Tasks
   ↓
Gemini
   ↓
Daily Briefing
```

---

## 🎯 Design Decisions

### Why FastAPI?

* High performance
* Easy API development
* Excellent documentation support

### Why React?

* Component-based architecture
* Fast UI updates
* Strong ecosystem

### Why MongoDB Atlas?

* Cloud-hosted database
* Easy integration
* Flexible document model

### Why Gemini?

* Fast inference
* Strong reasoning capabilities
* Effective tool integration

---

## 🚧 Future Improvements

* User authentication
* Dark/Light theme toggle
* Calendar integration
* Email summaries
* Task completion tracking
* Multi-user support
* Weather forecast analytics
* Notification system
* AI chat history
* Dashboard personalization

---

## 📸 Screenshots

Add screenshots here before submission:

### Dashboard

[Dashboard Screenshot]

### AI Agent

[Agent Screenshot]

### Generate My Day

[Daily Briefing Screenshot]

### Task Manager

[Task Manager Screenshot]

---

## 🎥 Demo Highlights

The demonstration showcases:

* Real-time weather retrieval
* Live technology news
* GitHub activity tracking
* MongoDB task persistence
* AI-powered assistant
* Personalized daily briefing generation

---

## 👨‍💻 Author

Developed as part of the AI Agent Dashboard Technical Assessment.

Built using React, FastAPI, MongoDB Atlas, Gemini AI, OpenWeather API, News API, GitHub API, and Recharts.
