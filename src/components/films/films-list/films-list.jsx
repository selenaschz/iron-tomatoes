import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPopularMovies, loadFilmPages } from "../../../service/moviesService";
import { maxPages } from "../../../utils/constants"

function FilmsList({ search, year, genre }) {
  const [films, setFilms] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); //Current page. Each page has 20 films.
  const [loading, setLoading] = useState(false);

  //--Popular films (20 films) -> execute only once--
  const getPopulars = async() => {
    try {
      const popularFilms = await getPopularMovies({ year, genre });
      setFilms(popularFilms);
      setPage(page + 1);
    } catch(e){
       setError(e.message);
    }
  }

  //--Handle more page (20 films per page)--
  const getMoreFilms = async (page) => {
    if (loading) return;
    try {
      setLoading(true);
      const moreFilms = await loadFilmPages(page);
      setFilms([...films, ...moreFilms]);
      setPage(page + 1);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (page <= maxPages && !loading) {
      getMoreFilms(page);
    }
  }

  //--Searched Films--
  const searchedFilms = films.filter( 
      film => !search || film.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) 
  )

  useEffect(() => {
    getPopulars();
  }, [year, genre]);

  
  if ( films.length === 0 ) {
    return <p>{error}</p>
  }

  return (
    <div className="container mt-5">
      <div className="row">
        {searchedFilms.length > 0 ? ( 
          searchedFilms.map((film) => (
          <div className="col-md-3 mb-4" key={film.id}>
            <div className="card h-100">
              <img
                src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                className="card-img-top"
                alt={film.title}
              />
              <div className="card-body">
                <h5 className="card-title">{film.title}</h5>
                <p className="card-text">
                  {film.overview.length > 100
                    ? film.overview.substring(0, 100) + "..."
                    : film.overview}
                </p>
                <Link to={`/film/${film.id}`} className="btn btn-primary">
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))
        ) : (<p> No films find </p>)
        }
      </div>
      <div className="d-flex justify-content-center ">
        <button type="button" className="btn btn-secondary" onClick={handleLoadMore}>Load More</button>
      </div>
    </div>
  );
}

export default FilmsList;
