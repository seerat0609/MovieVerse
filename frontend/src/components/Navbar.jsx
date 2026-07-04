function Navbar({
  watchlistCount,
  onWatchlistClick,
}) {
  return (
    <nav className="navbar">
      <h2 className="logo">
        MovieVerse
      </h2>

      <button
        className="watchlist-btn"
        onClick={
          onWatchlistClick
        }
      >
        ✨ Watchlist (
        {watchlistCount})
      </button>
    </nav>
  );
}

export default Navbar;