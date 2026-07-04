from recommender import recommend

results = recommend("Avatar")

print("Recommendations:")

for movie in results:
    print(movie)