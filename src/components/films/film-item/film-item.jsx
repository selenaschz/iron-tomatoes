import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getFilmDetails } from "../../../service/moviesService";

function FilmItem({ addToWatchlist }) {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const getFilm = async () => {
    try {
      const filmDetails = await getFilmDetails(id);
      setFilm(filmDetails);
    } catch (e) {
      setError(e.message);
    }
  };

  const handleAddToWatchlist = (film) => {
    addToWatchlist(film);
    setSuccessMessage("The movie was added successfully to your watchlist");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  useEffect(() => {
    getFilm();
  }, [id]);

  if (!film) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-md-4">
          <img
            src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
            alt={film.title}
            className="img-fluid rounded"
          />
        </div>
        <div
          className="col-md-8"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "white",
            padding: "20px",
            borderRadius: "8px",
            fontSize: "20px",
          }}
        >
          <h1 className="mb-4">{film.title}</h1>
          <p>
            <i className="bi bi-calendar-event me-2 m-2"></i>
            <strong>Year:</strong> {new Date(film.release_date).getFullYear()}
          </p>
          <p>
            <i className="bi bi-translate me-2 m-2"></i>
            <strong>Language:</strong> {film.original_language.toUpperCase()}
          </p>
          <p>
            <i className="bi bi-film me-2 m-2"></i>
            <strong>Overview:</strong>
            <p className="m-3">{film.overview}</p>
          </p>
          <p>
            <i className="bi bi-tags me-2 m-2"></i>
            <strong>Genres:</strong>{" "}
            {film.genres.map((genre) => genre.name).join(", ")}
          </p>
          <p>
            <i className="bi bi-clock me-2 m-2"></i>
            <strong>Runtime:</strong> {film.runtime} minutes
          </p>
          <button
            onClick={() => handleAddToWatchlist(film)}
            className="btn btn-primary m-4"
          >
            Add to Watchlist
          </button>
          {successMessage && (
            <p className="mt-3 text-success">{successMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default FilmItem;
