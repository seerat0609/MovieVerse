import { useEffect, useState } from "react";

import "../styles/TrendingRow.css";

function TrendingRow({
  onMovieSelect,
}) {

  const [movies, setMovies] =
    useState([]);

  useEffect(() => {

    async function loadTrending() {

      try {

        const response =
          await fetch(
            "http://127.0.0.1:5000/trending-movies"
          );

        const data =
          await response.json();

        setMovies(data);

      } catch (error) {

        console.log(error);

      }

    }

    loadTrending();

  }, []);

  return (
    <div className="trending-section">

      <h2>
        🔥 Trending Now
      </h2>

      <div className="trending-row">

        {movies.map(
          (movie, index) => (
            <div
              key={index}
              className="trending-card"
              onClick={() =>
                onMovieSelect(
                  movie
                )
              }
            >

              {movie.poster ? (

                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="trending-poster"
                />

              ) : (

                <div
                  className="trending-poster-placeholder"
                >
                  🎬
                </div>

              )}

              <div
                className="trending-info"
              >

                <p
                  className="trending-title"
                >
                  {movie.title}
                </p>

                <p
                  className="trending-rating"
                >
                  ⭐{" "}
                  {movie.rating?.toFixed(
                    1
                  )}
                </p>

              </div>

            </div>
          )
        )}

      </div>

    </div>
  );
}

export default TrendingRow;