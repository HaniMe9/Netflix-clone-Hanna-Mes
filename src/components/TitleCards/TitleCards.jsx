import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./TitleCards.css";
import { Link } from "react-router-dom";

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef(null);

  const handleWheel = (event) => {
    event.preventDefault();
    if (cardsRef.current) {
      cardsRef.current.scrollLeft += event.deltaY;
    }
  };

  useEffect(() => {
    // Fetch data from TMDB API
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYzllNTNhM2M3NzI0NDQzMDJiNDFiMWE0OTE5YzgxMyIsIm5iZiI6MTc0Njg3MTU3MS40MTQsInN1YiI6IjY4MWYyNTEzNTljMzg2NzVkZGFkODhhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oBlVco-R-1oVhLxdhqdnm7guO4NNOzy5LnaKJoTnGik",
      },
    };

    fetch(
      `https://api.themoviedb.org/3/movie/${
        category ? category : "now_playing"
      }?language=en-US&page=1`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setApiData(response.results || []);
      })
      .catch((err) => console.error("Error fetching movies:", err));
  }, [category]);

  useEffect(() => {
    const currentRef = cardsRef.current;

    if (!currentRef) return;

    currentRef.addEventListener("wheel", handleWheel, { passive: false });

    // Cleanup to avoid memory leaks
    return () => {
      currentRef.removeEventListener("wheel", handleWheel);
    };
  }, [cardsRef]);

  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular On Netflix"}</h2>

      <div className="card-list" ref={cardsRef}>
        {apiData && apiData.length > 0 ? (
          apiData.map((card) => (
            <Link to={`/player/${card.id}`} className="card" key={card.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`}
                alt={card.original_title || "Movie"}
              />
              <p>{card.original_title || card.title}</p>
            </Link>
          ))
        ) : (
          <p>Loading movies...</p>
        )}
      </div>
    </div>
  );
};

TitleCards.propTypes = {
  title: PropTypes.string,
  category: PropTypes.string,
};

export default TitleCards;
