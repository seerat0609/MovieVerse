import {
  useState,
  useEffect,
} from "react";

function SearchBar({
  movieName,
  setMovieName,
  onSearch,
}) {

  const [suggestions, setSuggestions] =
    useState([]);

  useEffect(() => {

    async function fetchSuggestions() {

      if (
        movieName.trim().length < 2
      ) {

        setSuggestions([]);

        return;
      }

      try {

        const response =
          await fetch(
            `http://127.0.0.1:5000/suggestions/${movieName}`
          );

        const data =
          await response.json();

        setSuggestions(
          data
        );

      } catch (error) {

        console.log(error);

      }
    }

    fetchSuggestions();

  }, [movieName]);

  return (
    <div
      style={{
        position: "relative",
        marginBottom: "30px",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "15px",
        }}
      >
        <input
          type="text"
          placeholder="Search a movie..."
          value={movieName}
          onChange={(e) =>
            setMovieName(
              e.target.value
            )
          }
          onKeyDown={(e) => {

            if (
              e.key === "Enter"
            ) {

              onSearch();

            }

            if (
              e.key === "Tab" &&
              suggestions.length > 0
            ) {

              e.preventDefault();

              setMovieName(
                suggestions[0]
              );
            }
          }}
          style={{
            flex: 1,
            padding: "15px",
            borderRadius: "10px",
            border: "none",
            fontSize: "1rem",
          }}
        />

        <button
          onClick={onSearch}
          style={{
            backgroundColor:
              "#E50914",

            color: "white",

            border: "none",

            padding:
              "15px 25px",

            borderRadius:
              "10px",

            cursor:
              "pointer",
          }}
        >
          Search
        </button>
      </div>

      {suggestions.length >
        0 && (
        <div
          style={{
            position:
              "absolute",

            width:
              "100%",

            background:
              "#0b1120",

            borderRadius:
              "10px",

            marginTop:
              "8px",

            overflow:
              "hidden",

            zIndex:
              999,
          }}
        >
          {suggestions.map(
            (
              suggestion,
              index
            ) => (
              <div
                key={index}
                onClick={() => {

                  setMovieName(
                    suggestion
                  );

                  setSuggestions(
                    []
                  );

                  setTimeout(
                    () =>
                      onSearch(
                        suggestion
                      ),
                    100
                  );
                }}
                style={{
                  padding:
                    "12px 15px",

                  color:
                    "white",

                  cursor:
                    "pointer",

                  borderBottom:
                    "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {suggestion}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;