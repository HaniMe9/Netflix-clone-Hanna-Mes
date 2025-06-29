import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./TitleCards.css";
import { createPortal } from "react-dom";

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const [selectedTrailer, setSelectedTrailer] = useState(null);
  const [error, setError] = useState("");
  const cardsRef = useRef();

  const handleWheel = (event) => {
    event.preventDefault();
    if (cardsRef.current) {
      cardsRef.current.scrollLeft += event.deltaY;
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${
            category || "now_playing"
          }?language=en-US&page=1`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`,
            },
          }
        );
        const data = await res.json();
        setApiData(data.results || []);
      } catch (err) {
        console.error("Movie fetch error:", err);
      }
    };

    fetchMovies();

    if (cardsRef.current) {
      cardsRef.current.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (cardsRef.current) {
        cardsRef.current.removeEventListener("wheel", handleWheel);
      }
    };
  }, [category]);

  const playTrailer = async (movieId) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`,
          },
        }
      );
      const data = await res.json();
      const trailer = data.results.find(
        (vid) => vid.site === "YouTube" && vid.type === "Trailer"
      );
      if (trailer) {
        setSelectedTrailer(trailer.key);
        setError("");
      } else {
        setSelectedTrailer("6ZfuNTqbHE8"); // Default trailer
        setError("No trailer found, showing default.");
      }
    } catch (err) {
      setError("Failed to load trailer.");
      setSelectedTrailer("6ZfuNTqbHE8"); // fallback
    }
  };

  const closeTrailer = () => {
    setSelectedTrailer(null);
    setError("");
  };

  return (
    <div className="title-cards">
      <h2>{title || "Popular On Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card) =>
          card.backdrop_path ? (
            <div
              className="card"
              key={card.id}
              onClick={() => playTrailer(card.id)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`}
                alt={card.original_title || "Movie"}
              />
              <p>{card.original_title || card.title}</p>
            </div>
          ) : null
        )}
      </div>

      {/* Trailer Modal */}
      {selectedTrailer &&
        createPortal(
          <div style={styles.modalOverlay} onClick={closeTrailer}>
            <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <iframe
                width="100%"
                height="450"
                src={`https://www.youtube.com/embed/${selectedTrailer}?autoplay=1`}
                title="Trailer"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
              {error && <p style={{ color: "orange" }}>{error}</p>}
              <button onClick={closeTrailer} style={styles.closeBtn}>
                Close
              </button>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

const styles = {
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modalContent: {
    width: "90%",
    maxWidth: "800px",
    background: "#000",
    padding: "1rem",
    borderRadius: "10px",
    position: "relative",
  },
  closeBtn: {
    marginTop: "1rem",
    padding: "0.5rem 1rem",
    background: "#e74c3c",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

TitleCards.propTypes = {
  title: PropTypes.string,
  category: PropTypes.string,
};

export default TitleCards;
