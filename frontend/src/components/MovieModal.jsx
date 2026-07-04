import "../styles/MovieModal.css";

function MovieModal({
  movie,
  onClose,
}) {
  if (!movie) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="modal-content"
        onClick={(e) =>
          e.stopPropagation()
        }
      >
        {movie.backdrop && (
          <div
            className="modal-backdrop"
            style={{
              backgroundImage:
                `url(${movie.backdrop})`,
            }}
          />
        )}

        <button
          className="close-btn"
          onClick={onClose}
        >
          ✖
        </button>

        {movie.poster ? (
          <img
            src={movie.poster}
            alt={movie.title}
            className="modal-poster"
          />
        ) : (
          <div
            style={{
              height: "400px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "6rem",
            }}
          >
            🎬
          </div>
        )}

        <div className="modal-info">

          <h2>{movie.title}</h2>

          <p>
            ⭐ Rating:{" "}
            {movie.rating?.toFixed(1)}
          </p>

          <p>
            📅 Release Date:{" "}
            {movie.release_date}
          </p>

          <p>
            👥 Votes:{" "}
            {movie.vote_count}
          </p>

          {movie.genres &&
            movie.genres.length > 0 && (
              <div
                style={{
                  marginTop: "15px",
                  marginBottom: "20px",
                }}
              >
                {movie.genres.map(
                  (
                    genre,
                    index
                  ) => (
                    <span
                      key={index}
                      style={{
                        background:
                          "#e50914",
                        padding:
                          "6px 12px",
                        borderRadius:
                          "20px",
                        marginRight:
                          "8px",
                      }}
                    >
                      {genre}
                    </span>
                  )
                )}
              </div>
            )}

          <div
            style={{
              marginTop: "20px",
              marginBottom:
                "20px",
              textAlign: "left",
              lineHeight: "1.7",
            }}
          >
            <h3>
              📝 Overview
            </h3>

            <p>
              {movie.overview}
            </p>
          </div>

          {movie.cast &&
            movie.cast.length > 0 && (
              <div
                style={{
                  marginTop: "30px",
                  marginBottom:
                    "30px",
                }}
              >
                <h3>
                  🎭 Top Cast
                </h3>

                <div
                  className="cast-container"
                >
                  {movie.cast.map(
                    (
                      actor,
                      index
                    ) => (
                      <div
                        key={index}
                        className="cast-card"
                      >
                        {actor.image ? (
                          <img
                            src={
                              actor.image
                            }
                            alt={
                              actor.name
                            }
                            className="cast-image"
                          />
                        ) : (
                          <div
                            className="cast-placeholder"
                          >
                            👤
                          </div>
                        )}

                        <p>
                          {
                            actor.name
                          }
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

          <a
            href={`https://www.youtube.com/results?search_query=${movie.title}+official+trailer`}
            target="_blank"
            rel="noreferrer"
            className="trailer-btn"
          >
            ▶ Watch Trailer
          </a>

        </div>
      </div>
    </div>
  );
}

export default MovieModal;