import pickle
import pandas as pd

# Load saved files
movies_dict = pickle.load(
    open(
        "model/movie_dict.pkl",
        "rb"
    )
)

similarity = pickle.load(
    open(
        "model/similarity.pkl",
        "rb"
    )
)

movies = pd.DataFrame(
    movies_dict
)


def recommend(movie_name):

    movie_name = (
        movie_name
        .strip()
        .lower()
    )

    matched_movies = movies[
        movies["title"]
        .str.lower()
        .str.contains(
            movie_name,
            na=False
        )
    ]

    if matched_movies.empty:

        return []

    movie_index = (
        matched_movies
        .index[0]
    )

    distances = similarity[
        movie_index
    ]

    movie_list = sorted(
        list(
            enumerate(
                distances
            )
        ),
        reverse=True,
        key=lambda x: x[1]
    )[1:11]

    recommendations = []

    for movie in movie_list:

        similarity_score = round(
            movie[1] * 100
        )

        recommendations.append(
            {
                "title":
                movies.iloc[
                    movie[0]
                ].title,

                "score":
                similarity_score
            }
        )

    return recommendations


def get_suggestions(query):

    query = (
        query
        .strip()
        .lower()
    )

    if not query:

        return []

    matched = movies[
        movies["title"]
        .str.lower()
        .str.startswith(
            query
        )
    ]

    return (
        matched["title"]
        .head(8)
        .tolist()
    )