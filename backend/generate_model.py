import pandas as pd
import ast
import pickle

from nltk.stem.porter import PorterStemmer
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

print("Loading datasets...")

movies = pd.read_csv("datasets/tmdb_5000_movies.csv")
credits = pd.read_csv("datasets/tmdb_5000_credits.csv")

# Merge datasets
movies = movies.merge(credits, on="title")

# Keep useful columns
df = movies[
    [
        "movie_id",
        "title",
        "overview",
        "genres",
        "keywords",
        "cast",
        "crew",
        "vote_average",
        "release_date"
    ]
]

# Fill missing overviews
df["overview"] = df["overview"].fillna("")


def fetch_genres(obj):
    names = []
    for item in ast.literal_eval(obj):
        names.append(item["name"])
    return names


def fetch_keywords(obj):
    names = []
    for item in ast.literal_eval(obj):
        names.append(item["name"])
    return names


def fetch_cast(obj):
    names = []

    counter = 0

    for item in ast.literal_eval(obj):

        if counter < 3:
            names.append(item["name"])
            counter += 1
        else:
            break

    return names


def fetch_director(obj):

    names = []

    for item in ast.literal_eval(obj):

        if item["job"] == "Director":
            names.append(item["name"])

    return names


print("Cleaning data...")

df["genres"] = df["genres"].apply(fetch_genres)
df["keywords"] = df["keywords"].apply(fetch_keywords)
df["cast"] = df["cast"].apply(fetch_cast)
df["crew"] = df["crew"].apply(fetch_director)

df["overview"] = df["overview"].apply(lambda x: x.split())

df["tags"] = (
    df["overview"]
    + df["genres"]
    + df["keywords"]
    + df["cast"]
    + df["crew"]
)

df["tags"] = df["tags"].apply(lambda x: " ".join(x))

ps = PorterStemmer()


def stem_text(text):

    words = []

    for word in text.split():
        words.append(ps.stem(word.lower()))

    return " ".join(words)


df["tags"] = df["tags"].apply(stem_text)

print("Creating vectors...")

cv = CountVectorizer(
    max_features=5000,
    stop_words="english"
)

vectors = cv.fit_transform(df["tags"]).toarray()

print("Calculating similarity matrix...")

similarity = cosine_similarity(vectors)

print("Saving files...")

movie_dict = df.to_dict()

pickle.dump(
    movie_dict,
    open("backend/model/movie_dict.pkl", "wb")
)

pickle.dump(
    similarity,
    open("backend/model/similarity.pkl", "wb")
)

print("SUCCESS!")
print("movie_dict.pkl created")
print("similarity.pkl created")