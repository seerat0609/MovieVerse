import requests
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("TMDB_API_KEY")

url = (
    f"https://api.themoviedb.org/3/movie/550"
    f"?api_key={API_KEY}"
)

try:
    response = requests.get(
        url,
        timeout=20
    )

    print("STATUS:", response.status_code)
    print(response.text[:500])

except Exception as e:
    print("ERROR:")
    print(e)