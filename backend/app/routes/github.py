# @app.get("/github")
# def github():

#     username = "PrachiYargatti"

#     url = f"https://api.github.com/users/{username}/events"

#     events = requests.get(url).json()

#     return events[:5]