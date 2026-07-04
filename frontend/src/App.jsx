import {
  useState,
  useEffect,
  useRef,
} from "react";

import TrendingRow from "./components/TrendingRow";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SearchBar from "./components/SearchBar";
import MovieCard from "./components/MovieCard";
import MovieModal from "./components/MovieModal";
import WatchlistModal from "./components/WatchlistModal";
import ChatBot from "./components/ChatBot";

import { getRecommendations } from "./services/api";

import "./styles/navbar.css";
import "./styles/loader.css";

function App() {
  const [movieName, setMovieName] =
    useState("");

  const [recommendations, setRecommendations] =
    useState([]);

  const [watchlist, setWatchlist] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [selectedMovie, setSelectedMovie] =
    useState(null);

  const [showWatchlist, setShowWatchlist] =
    useState(false);

  const searchSectionRef =
    useRef(null);

  useEffect(() => {
    const saved =
      JSON.parse(
        localStorage.getItem(
          "watchlist"
        )
      ) || [];

    setWatchlist(saved);
  }, []);

  function addToWatchlist(movie) {
    const exists =
      watchlist.find(
        (m) =>
          m.title === movie.title
      );

    if (exists) {
      alert("Already added!");
      return;
    }

    const updated = [
      ...watchlist,
      movie,
    ];

    setWatchlist(updated);

    localStorage.setItem(
      "watchlist",
      JSON.stringify(updated)
    );

    alert(
      "Added to Watchlist ✨"
    );
  }

  function removeFromWatchlist(
    title
  ) {
    const updated =
      watchlist.filter(
        (movie) =>
          movie.title !== title
      );

    setWatchlist(updated);

    localStorage.setItem(
      "watchlist",
      JSON.stringify(updated)
    );
  }

  async function handleSearch(
    customMovie = null
  ) {
    let searchMovie;

    if (
      typeof customMovie ===
      "string"
    ) {
      searchMovie =
        customMovie;
    } else {
      searchMovie =
        movieName;
    }

    if (
      !searchMovie.trim()
    )
      return;

    try {
      setLoading(true);

      const data =
        await getRecommendations(
          searchMovie
        );

      setRecommendations(
        data.recommendations
      );

      searchSectionRef.current?.scrollIntoView(
        {
          behavior:
            "smooth",
        }
      );
    } catch (error) {
      console.log(error);

      alert(
        "Failed to fetch recommendations"
      );
    } finally {
      setLoading(false);
    }
  }

  function scrollToSearch() {
    searchSectionRef.current?.scrollIntoView(
      {
        behavior: "smooth",
      }
    );
  }

  function handleTrendingClick(
    movie
  ) {

    setSelectedMovie(
      movie
    );

  }

  return (
    <div
      style={{
        backgroundColor:
          "#050816",
        minHeight: "100vh",
      }}
    >
      <Navbar
        watchlistCount={
          watchlist.length
        }
        onWatchlistClick={() =>
          setShowWatchlist(true)
        }
      />

      <Hero
        onExploreClick={
          scrollToSearch
        }
      />

      <TrendingRow
        onMovieSelect={
          handleTrendingClick
        }
      />

      <div
        ref={searchSectionRef}
        style={{
          padding: "50px",
          color: "white",
          maxWidth: "1200px",
          margin: "auto",
        }}
      >
        <SearchBar
          movieName={movieName}
          setMovieName={
            setMovieName
          }
          onSearch={
            handleSearch
          }
        />

        <h2
          style={{
            marginTop: "50px",
            marginBottom:
              "30px",
            fontSize: "2rem",
          }}
        >
          Recommendations
        </h2>

        {loading && (
          <div className="loader"></div>
        )}

        <div
          style={{
            display: "flex",
            gap: "25px",
            flexWrap: "wrap",
            justifyContent:
              "center",
          }}
        >
          {!loading &&
            recommendations.map(
              (
                movie,
                index
              ) => (
                <MovieCard
                  key={index}
                  title={
                    movie.title
                  }
                  poster={
                    movie.poster
                  }
                  rating={
                    movie.rating
                  }
                  release_date={
                    movie.release_date
                  }
                  genres={
                    movie.genres
                  }
                  trailer={
                    movie.trailer
                  }
                  overview={
                    movie.overview
                  }
                  runtime={
                    movie.runtime
                  }
                  vote_count={
                    movie.vote_count
                  }
                  similarity_score={
                    movie.similarity_score
                  }
                  backdrop={
                    movie.backdrop
                  }
                  cast={
                    movie.cast
                  }
                  onAddWatchlist={
                    addToWatchlist
                  }
                  onMovieClick={
                    setSelectedMovie
                  }
                />
              )
            )}
        </div>

      </div>

      <ChatBot />

      <MovieModal
        movie={selectedMovie}
        onClose={() =>
          setSelectedMovie(null)
        }
      />

      {showWatchlist && (
        <WatchlistModal
          watchlist={
            watchlist
          }
          onClose={() =>
            setShowWatchlist(
              false
            )
          }
          onRemove={
            removeFromWatchlist
          }
        />
      )}
    </div>
  );
}

export default App;