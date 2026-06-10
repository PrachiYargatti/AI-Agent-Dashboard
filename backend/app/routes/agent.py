from fastapi import APIRouter

router = APIRouter(prefix="/agent", tags=["AI Agent"])

@router.post("/")
def ask_agent(data: dict):

    query = data.get("query", "")

    if "weather" in query.lower():
        return {
            "response":
            "Current weather in Pune is 30°C and Cloudy."
        }

    elif "github" in query.lower():
        return {
            "response":
            "You have 3 open PRs and 2 issues."
        }

    else:
        return {
            "response":
            f"You asked: {query}"
        }