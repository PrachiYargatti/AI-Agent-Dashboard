import os
import requests

from dotenv import load_dotenv
from bson import ObjectId
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.connection import tasks_collection
from app.services.agent_service import route_query

load_dotenv()

app = FastAPI(title="AI Agent Dashboard")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://ai-agent-dashboard-eta-fawn.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "Backend Running Successfully"
    }


# ==========================
# WEATHER
# ==========================

@app.get("/weather")
def get_weather(city: str = "Pune"):

    try:

        api_key = os.getenv("OPENWEATHER_API_KEY")

        url = (
            f"https://api.openweathermap.org/data/2.5/weather"
            f"?q={city}"
            f"&appid={api_key}"
            f"&units=metric"
        )

        response = requests.get(url, timeout=10)

        data = response.json()

        if response.status_code != 200:

            return {
                "error": "City not found"
            }

        return {

            "city": data["name"],

            "temperature": data["main"]["temp"],

            "condition": data["weather"][0]["main"],

            "humidity": data["main"]["humidity"],

            "wind_speed": data["wind"]["speed"]

        }

    except Exception:

        return {
            "error": "Unable to fetch weather data"
        }


# ==========================
# GITHUB
# ==========================

@app.get("/github")
def get_github_activity(username: str = "octocat"):

    username = username.strip("'").strip('"')

    try:

        url = (
            f"https://api.github.com/users/"
            f"{username}/events/public"
        )

        response = requests.get(url, timeout=10)

        if response.status_code != 200:

            return []

        events = response.json()

        activities = []

        for event in events[:5]:

            activities.append({

                "type": event.get("type"),

                "repo": event.get(
                    "repo",
                    {}
                ).get("name")

            })

        return activities

    except Exception:

        return []


# ==========================
# NEWS
# ==========================

@app.get("/news")
def get_news():

    try:

        api_key = os.getenv("NEWS_API_KEY")

        url = (
            f"https://newsapi.org/v2/top-headlines"
            f"?category=technology"
            f"&language=en"
            f"&pageSize=5"
            f"&apiKey={api_key}"
        )

        response = requests.get(url, timeout=10)

        data = response.json()

        news = []

        for article in data.get("articles", []):

            news.append({

                "title": article.get("title"),

                "source": article.get(
                    "source",
                    {}
                ).get("name"),

                "url": article.get("url")

            })

        return news

    except Exception:

        return []


# ==========================
# AI AGENT
# ==========================

@app.post("/agent")
def agent(data: dict):

    try:

        query = data.get("query", "")

        response = route_query(query)

        return {
            "response": response
        }

    except Exception as e:

        return {
            "response": f"Agent Error: {str(e)}"
        }


# ==========================
# TASKS
# ==========================

@app.get("/tasks")
def get_tasks():

    try:

        tasks = []

        for task in tasks_collection.find():

            task["_id"] = str(task["_id"])

            tasks.append(task)

        return tasks

    except Exception:

        return []


@app.post("/tasks")
def add_task(task: dict):

    try:

        tasks_collection.insert_one(task)

        return {
            "message": "Task Added Successfully"
        }

    except Exception as e:

        return {
            "error": str(e)
        }


@app.delete("/tasks/{task_id}")
def delete_task(task_id: str):

    try:

        tasks_collection.delete_one(
            {"_id": ObjectId(task_id)}
        )

        return {
            "message": "Task Deleted Successfully"
        }

    except Exception as e:

        return {
            "error": str(e)
        }