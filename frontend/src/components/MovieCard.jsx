import "../styles/MovieCard.css";

function MovieCard({
  title,
  poster,
  rating,
  release_date,
  genres,
  trailer,
  overview,
  runtime,
  vote_count,
  similarity_score,
  backdrop,
  cast,
  onAddWatchlist,
  onMovieClick,
}) {
  return (
    <div
      className="movie-card"
      title={title}
      onClick={() =>
        onMovieClick({
          title,
          poster,
          rating,
          release_date,
          genres,
          trailer,
          overview,
          runtime,
          vote_count,
          similarity_score,
          backdrop,
          cast,
        })
      }
    >
      <div className="movie-poster">
        {poster ? (
          <img
            src={poster}
            alt={title}
          />
        ) : (
          <div className="poster-placeholder">
            🎬
          </div>
        )}
      </div>

      <div className="movie-content">
        <h3>{title}</h3>

        {similarity_score && (
          <div
            style={{
              color: "#22c55e",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            🔥 {similarity_score}% Match
          </div>
        )}

        <div className="rating">
          ⭐ {rating?.toFixed(1)}
        </div>

        <p className="release-date">
          {release_date}
        </p>

        {genres &&
          genres.length > 0 && (
            <div className="genre-container">
              {genres.map(
                (genre, index) => (
                  <span
                    key={index}
                    className="genre-tag"
                  >
                    {genre}
                  </span>
                )
              )}
            </div>
          )}

        <button
          className="watch-btn"
          onClick={(e) => {
            e.stopPropagation();

            onAddWatchlist({
              title,
              poster,
              rating,
              release_date,
              genres,
              trailer,
              overview,
              runtime,
              vote_count,
              similarity_score,
              backdrop,
              cast,
            });
          }}
        >
          ✨ Add
        </button>
      </div>
    </div>
  );
}

export default MovieCard;