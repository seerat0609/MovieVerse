import { useEffect, useState } from "react";

function Hero({
  onExploreClick,
}) {

  const backdrops = [

    "https://image.tmdb.org/t/p/original/nMKdUUepR0i5zn0y1T4CsSB5chy.jpg", // Interstellar

    "https://image.tmdb.org/t/p/original/hZkgoQYus5vegHoetLkCJzb17zJ.jpg", // Dark Knight

    "https://image.tmdb.org/t/p/original/1XAC6RPT01UX9EQGy2JVn5c8pgy.jpg", // Harry Potter

    "https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg", // Endgame

    "https://image.tmdb.org/t/p/original/iQFcwSGbZXMkeyKrxbPnwnRo5fl.jpg", // Spider-Man

    "https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg", // Inception

  ];

  const [currentBackdrop, setCurrentBackdrop] =
    useState(0);

  useEffect(() => {

    const interval =
      setInterval(() => {

        setCurrentBackdrop(
          (prev) =>
            (prev + 1) %
            backdrops.length
        );

      }, 8000);

    return () =>
      clearInterval(interval);

  }, []);

  return (
    <div
      style={{
        height: "90vh",

        position: "relative",

        display: "flex",

        alignItems: "center",

        overflow: "hidden",
      }}
    >

      {/* BACKDROP */}

      <div
        style={{
          position: "absolute",

          inset: 0,

          backgroundImage:
            `url(${backdrops[currentBackdrop]})`,

          backgroundSize: "cover",

          backgroundPosition: "center",

          transition:
            "background-image 1s ease-in-out",

          transform:
            "scale(1.05)",

          zIndex: 0,
        }}
      />

      {/* DARK OVERLAY */}

      <div
        style={{
          position: "absolute",

          inset: 0,

          background:
            `
            linear-gradient(
              to right,
              rgba(0,0,0,0.92),
              rgba(0,0,0,0.55)
            )
          `,

          zIndex: 1,
        }}
      />

      {/* CONTENT */}

      <div
        style={{
          position: "relative",

          zIndex: 2,

          paddingLeft: "80px",

          maxWidth: "700px",

          color: "white",
        }}
      >

        <h1
          style={{
            fontSize: "5rem",

            marginBottom: "20px",
          }}
        >
          Discover Movies
          <br />
          You'll Love
        </h1>

        <p
          style={{
            fontSize: "1.3rem",

            color: "#D1D5DB",

            lineHeight: "1.8",
          }}
        >
          Personalized AI-powered movie
          recommendations based on your
          favorite films.
        </p>

        <button
          onClick={
            onExploreClick
          }
          style={{
            marginTop: "30px",

            backgroundColor:
              "#E50914",

            border: "none",

            color: "white",

            padding:
              "15px 30px",

            borderRadius:
              "10px",

            cursor: "pointer",

            fontSize:
              "1rem",

            fontWeight:
              "bold",

            transition:
              "0.3s",
          }}
        >
          Explore Movies
        </button>

      </div>
    </div>
  );
}

export default Hero;