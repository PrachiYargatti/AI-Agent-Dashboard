import os
import requests

from dotenv import load_dotenv

from app.services.gemini_service import ask_gemini
from app.database.connection import tasks_collection

load_dotenv()


def get_weather():

    api_key = os.getenv("OPENWEATHER_API_KEY")

    url = (
        f"https://api.openweathermap.org/data/2.5/weather"
        f"?q=Mumbai"
        f"&appid={api_key}"
        f"&units=metric"
    )

    data = requests.get(url).json()

    return (
        f"Weather in {data['name']}: "
        f"{data['main']['temp']}°C, "
        f"{data['weather'][0]['main']}"
    )


def get_news():

    api_key = os.getenv("NEWS_API_KEY")

    url = (
        f"https://newsapi.org/v2/top-headlines"
        f"?category=technology"
        f"&language=en"
        f"&pageSize=5"
        f"&apiKey={api_key}"
    )

    data = requests.get(url).json()

    headlines = []

    for article in data.get("articles", []):

        headlines.append(
            article.get("title", "")
        )

    return "\n".join(headlines)


def get_tasks():

    tasks = []

    for task in tasks_collection.find():

        title = task.get("title")

        if title:
            tasks.append(title)

    if len(tasks) == 0:
        return "No tasks found."

    return "\n".join(tasks)


def get_github():

    username = os.getenv("GITHUB_USERNAME")

    url = f"https://api.github.com/users/{username}/events"

    events = requests.get(url).json()

    activities = []

    for event in events[:5]:

        activities.append(
            f"{event['type']} - {event['repo']['name']}"
        )

    return "\n".join(activities)


def generate_my_day():

    weather = get_weather()

    news = get_news()

    tasks = get_tasks()

    prompt = f"""
You are a productivity assistant.

Weather:
{weather}

News:
{news}

Tasks:
{tasks}

Generate a concise daily briefing.

Format:

Good morning.

Weather:
...

Top News:
...

Tasks:
...

Recommended Focus:
...
"""

    return ask_gemini(prompt)


def route_query(query):

    query = query.lower()

    if "weather" in query:
        return get_weather()

    elif "task" in query:
        return get_tasks()

    elif "news" in query:
        return get_news()

    elif "github" in query:
        return get_github()

    elif (
        "generate my day" in query
        or "daily briefing" in query
        or "my day" in query
    ):
        return generate_my_day()

    else:
        return ask_gemini(query)