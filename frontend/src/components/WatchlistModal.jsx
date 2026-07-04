import "../styles/WatchlistModal.css";

function WatchlistModal({
  watchlist,
  onClose,
  onRemove,
}) {
  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="watchlist-modal"
        onClick={(e) =>
          e.stopPropagation()
        }
      >
        <button
          className="close-btn"
          onClick={onClose}
        >
          ✖
        </button>

        <h2>
          ✨ My Watchlist
        </h2>

        {watchlist.length === 0 ? (
          <p>
            No movies added yet.
          </p>
        ) : (
          <div className="watchlist-grid">
            {watchlist.map(
              (movie, index) => (
                <div
                  key={index}
                  className="watchlist-card"
                >
                  {movie.poster ? (
                    <img
                      src={movie.poster}
                      alt={movie.title}
                    />
                  ) : (
                    <div className="poster-placeholder">
                      🎬
                    </div>
                  )}

                  <h4>
                    {movie.title}
                  </h4>

                  <button
                    className="remove-btn"
                    onClick={() =>
                      onRemove(
                        movie.title
                      )
                    }
                  >
                    Remove
                  </button>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default WatchlistModal;