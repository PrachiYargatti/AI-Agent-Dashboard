from fastapi import APIRouter

router = APIRouter(prefix="/news", tags=["News"])

@router.get("/")
def latest_news():
    return [
        {"title": "AI Industry Update"},
        {"title": "New Open Source Model Released"}
    ]