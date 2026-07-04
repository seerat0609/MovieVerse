from flask import (
    Flask,
    jsonify,
    request
)

from flask_cors import CORS

from recommender import (
    recommend,
    get_suggestions
)

from tmdb_service import (
    get_movie_poster,
    get_trending_movies
)

from gemini_service import (
    chat_with_movie_ai
)

app = Flask(__name__)

CORS(app)


@app.route("/")
def home():

    return jsonify(
        {
            "message":
            "MovieVerse API Running"
        }
    )


@app.route(
    "/recommend/<movie_name>"
)
def get_recommendations(
    movie_name
):

    results = recommend(
        movie_name
    )

    movie_data = []

    for movie in results:

        movie_title = (
            movie["title"]
        )

        similarity_score = (
            movie["score"]
        )

        details = (
            get_movie_poster(
                movie_title
            )
        )

        if details:

            details[
                "similarity_score"
            ] = (
                similarity_score
            )

            movie_data.append(
                details
            )

        else:

            movie_data.append(
                {
                    "title":
                    movie_title,

                    "similarity_score":
                    similarity_score,

                    "rating":
                    0,

                    "release_date":
                    "",

                    "poster":
                    None,

                    "genres":
                    [],

                    "overview":
                    "No description available.",

                    "runtime":
                    "N/A",

                    "vote_count":
                    0
                }
            )

    return jsonify(
        {
            "movie":
            movie_name,

            "recommendations":
            movie_data
        }
    )


@app.route(
    "/trending-movies"
)
def trending_movies():

    return jsonify(
        get_trending_movies()
    )


# ==================================
# MOVIEVERSE AI CHATBOT
# ==================================

@app.route(
    "/chat",
    methods=["POST"]
)
def chat():

    data = request.json

    message = data.get(
        "message",
        ""
    )

    reply = (
        chat_with_movie_ai(
            message
        )
    )

    return jsonify(
        {
            "reply":
            reply
        }
    )


if __name__ == "__main__":

    app.run(
        debug=True
    )