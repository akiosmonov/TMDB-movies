import React, { useContext, useEffect, useState } from "react";
import { api_key } from "../../API";
import axios from "axios";
import { Link } from "react-router-dom";
import { DarkContext } from "../Context";

const ActorsFilms = ({ filmsId }) => {
  const [films, setFilms] = useState([]);
  const {language} = useContext(DarkContext)

  async function getActorsFilms(key) {
    let res = await axios.get(
      `https://api.themoviedb.org/3/person/${filmsId}/movie_credits?api_key=${key}&language=${language}`
    );
    setFilms(res.data.cast);
    console.log(res.data.cast);
  }

  useEffect(() => {
    getActorsFilms(api_key);
  }, [language]);

  return (
    <div id="actorsFilm">
      <div className="container">
        <div className="actorsFilm">
          {films?.map((el) => (
            <div key={el.id} className="actorsFilm--card">
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
