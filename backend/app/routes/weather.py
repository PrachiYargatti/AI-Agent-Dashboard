from fastapi import APIRouter
import requests
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter(
    prefix="/weather",
    tags=["Weather"]
)

@router.get("/")
def get_weather(city: str = "Pune"):

    try:

        api_key = os.getenv(
            "OPENWEATHER_API_KEY"
        )

        url = (
            f"https://api.openweathermap.org/data/2.5/weather"
            f"?q={city}"
            f"&appid={api_key}"
            f"&units=metric"
        )

        response = requests.get(url)

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
            "error":
            "Unable to fetch weather data"
        }