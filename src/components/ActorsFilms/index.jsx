import React, { useEffect, useState } from "react";
import { api_key } from "../../API";
import axios from "axios";
import { Link } from "react-router-dom";

const ActorsFilms = ({ filmsId }) => {
  const [films, setFilms] = useState([]);

  async function getActorsFilms(key) {
    let res = await axios.get(
      `https://api.themoviedb.org/3/person/${filmsId}/movie_credits?api_key=${key}`
    );
    setFilms(res.data.cast);
    console.log(res.data.cast);
  }

  useEffect(() => {
    getActorsFilms(api_key);
  }, []);

  return (
    <div id="actorsFilm">
      <div className="container">
        <div className="actorsFilm">
          {films?.map((el) => (
            <div className="actorsFilm--card">
              <Link to={`/movieDetails/${el.id}`}>
                <img
                  src={
                    el.poster_path
                      ? `https://image.tmdb.org/t/p/w185${el.poster_path}`
                      : "false"
                  }
                />
              </Link>
              <h5>{el.title}</h5>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActorsFilms;
