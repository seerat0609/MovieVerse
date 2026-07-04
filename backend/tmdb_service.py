import os
import json
import time
import requests

from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("TMDB_API_KEY")

CACHE_FILE = "movie_cache.json"
CAST_CACHE_FILE = "cast_cache.json"

# -----------------------------
# MOVIE CACHE
# -----------------------------

if os.path.exists(CACHE_FILE):

    with open(
        CACHE_FILE,
        "r",
        encoding="utf-8"
    ) as file:

        movie_cache = json.load(file)

else:

    movie_cache = {}

# -----------------------------
# CAST CACHE
# -----------------------------

if os.path.exists(
    CAST_CACHE_FILE
):

    with open(
        CAST_CACHE_FILE,
        "r",
        encoding="utf-8"
    ) as file:

        cast_cache = json.load(file)

else:

    cast_cache = {}


def save_cache():

    with open(
        CACHE_FILE,
        "w",
        encoding="utf-8"
    ) as file:

        json.dump(
            movie_cache,
            file,
            ensure_ascii=False,
            indent=4
        )


def save_cast_cache():

    with open(
        CAST_CACHE_FILE,
        "w",
        encoding="utf-8"
    ) as file:

        json.dump(
            cast_cache,
            file,
            ensure_ascii=False,
            indent=4
        )


def get_cast(movie_id):

    global cast_cache

    movie_id = str(movie_id)

    # -------------------------
    # USE CACHE ONLY IF CAST EXISTS
    # -------------------------

    if (
        movie_id in cast_cache
        and len(
            cast_cache[movie_id]
        ) > 0
    ):

        print(
            f"USING CAST CACHE: {movie_id}"
        )

        return cast_cache[
            movie_id
        ]

    try:

        credits_url = (
            f"https://api.themoviedb.org/3/movie/"
            f"{movie_id}/credits"
        )

        response = requests.get(
            credits_url,
            params={
                "api_key": API_KEY
            },
            timeout=15
        )

        data = response.json()

        cast_members = []

        for actor in data.get(
            "cast",
            []
        )[:5]:

            profile_path = actor.get(
                "profile_path"
            )

            image_url = None

            if profile_path:

                image_url = (
                    "https://image.tmdb.org/t/p/w185"
                    + profile_path
                )

            cast_members.append(
                {
                    "name":
                    actor.get(
                        "name"
                    ),

                    "image":
                    image_url
                }
            )

        print(
            f"CAST FOUND: {len(cast_members)} actors"
        )

        cast_cache[
            movie_id
        ] = cast_members

        save_cast_cache()

        return cast_members

    except Exception as e:

        print(
            "CAST ERROR:"
        )

        print(e)

        return []


def get_movie_poster(movie_name):

    global movie_cache

    # -------------------------
    # USE MOVIE CACHE ONLY IF
    # CAST EXISTS
    # -------------------------

    if movie_name in movie_cache:

        cached_movie = movie_cache[
            movie_name
        ]

        if (
            "cast" in cached_movie
            and len(
                cached_movie[
                    "cast"
                ]
            ) > 0
        ):

            print(
                f"USING CACHE: {movie_name}"
            )

            return cached_movie

        print(
            f"REFRESHING CACHE: {movie_name}"
        )

    for attempt in range(3):

        try:

            print(
                f"\nSearching TMDB: {movie_name}"
            )

            response = requests.get(
                "https://api.themoviedb.org/3/search/movie",
                params={
                    "api_key": API_KEY,
                    "query": movie_name
                },
                headers={
                    "User-Agent":
                    "Mozilla/5.0"
                },
                timeout=15
            )

            data = response.json()

            if (
                "results" not in data
                or len(
                    data["results"]
                ) == 0
            ):

                return None

            movie = data[
                "results"
            ][0]

            movie_id = movie.get(
                "id"
            )

            cast = get_cast(
                movie_id
            )

            poster_path = movie.get(
                "poster_path"
            )

            backdrop_path = movie.get(
                "backdrop_path"
            )

            poster_url = None

            if poster_path:

                poster_url = (
                    "https://image.tmdb.org/t/p/w500"
                    + poster_path
                )

            backdrop_url = None

            if backdrop_path:

                backdrop_url = (
                    "https://image.tmdb.org/t/p/original"
                    + backdrop_path
                )

            genre_map = {
                28: "Action",
                12: "Adventure",
                16: "Animation",
                35: "Comedy",
                80: "Crime",
                18: "Drama",
                10751: "Family",
                14: "Fantasy",
                27: "Horror",
                9648: "Mystery",
                878: "Sci-Fi",
                53: "Thriller"
            }

            genres = [
                genre_map[g]
                for g in movie.get(
                    "genre_ids",
                    []
                )
                if g in genre_map
            ][:3]

            result = {

                "title":
                movie.get(
                    "title",
                    movie_name
                ),

                "rating":
                movie.get(
                    "vote_average",
                    0
                ),

                "release_date":
                movie.get(
                    "release_date",
                    ""
                ),

                "poster":
                poster_url,

                "backdrop":
                backdrop_url,

                "genres":
                genres,

                "cast":
                cast,

                "overview":
                movie.get(
                    "overview",
                    "No description available."
                ),

                "runtime":
                "N/A",

                "vote_count":
                movie.get(
                    "vote_count",
                    0
                )
            }

            movie_cache[
                movie_name
            ] = result

            save_cache()

            return result

        except Exception as e:

            print(
                f"ATTEMPT {attempt + 1} FAILED:"
            )

            print(e)

            time.sleep(1)

    return None
def get_trending_movies():

    try:

        response = requests.get(
            "https://api.themoviedb.org/3/trending/movie/week",
            params={
                "api_key": API_KEY
            },
            timeout=15
        )

        data = response.json()

        trending_movies = []

        for movie in data.get(
            "results",
            []
        )[:10]:

            movie_title = movie.get(
                "title"
            )

            details = get_movie_poster(
                movie_title
            )

            if details:

                trending_movies.append(
                    details
                )

        return trending_movies

    except Exception as e:

        print(
            "TRENDING ERROR:"
        )

        print(e)

        return []