import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { api_key } from "../../API";
import { Link } from "react-router-dom";
import { DarkContext } from "../Context";

const Actors = ({ kinoId }) => {
  const [actors, setActors] = useState([]);
  const { dark, language } = useContext(DarkContext);
  const getActors = async (key) => {
    let res = await axios(
      `https://api.themoviedb.org/3/movie/${kinoId}/credits?api_key=${key}&language=${language}`
    );
    let { data } = res;
    setActors(data.cast);
  };

  useEffect(() => {
    getActors(api_key);
  }, [kinoId, language]);

  const textStyle = {
    color: dark ? "black" : "white",
  };

  return (
    <div id="actors">
      <div className="container">
        <div className="actors">
          <h1>В главных ролях</h1>

          <div className="actors--list">
            {actors.slice(0, 15).map((el) => (
              <div key={el.id} className="actors--list__block">
                {el.profile_path && (
                  <Link to={`/movieDetails/actorDetails/${el.id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w200${el.profile_path}`}
                      alt={el.name}
                    />
                  </Link>
                )}
                <div className="actors--list__block--title">
                  <a style={textStyle}>{el.name}</a>

                  <p style={textStyle}>{el.character}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Actors;
