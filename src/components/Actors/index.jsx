import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { api_key } from "../../API";
import { Link } from "react-router-dom";
import { DarkContext } from "../Context";
import image from "../../assets/images/images.jpg";

const Actors = ({ kinoId }) => {
  const [actors, setActors] = useState([]);
  const { dark, language } = useContext(DarkContext);
  const getActors = async (key) => {
    let res = await axios(
      `https://api.themoviedb.org/3/movie/${kinoId}/credits?api_key=${key}&language=${language}`,
    );
    let { data } = res;
    setActors(data.cast);
  };

  useEffect(() => {
    getActors(api_key);
  }, [kinoId, language]);

  return (
    <div id="actors">
      <div className="container">
        <div className="actors">
          <h1>В главных ролях</h1>

          <div className="actors--list">
            {actors.slice(0, 15).map((el, index) => (
              <div
                key={el.id}
                style={{
                  animation: `fadeInUp 1s ease forwards ${index * 0.1}s`,
                }}
                className="actors--list__block"
              >
                  <Link to={`/movieDetails/actorDetails/${el.id}`}>
                    <img
                      src={
                        el.profile_path
                          ? `https://image.tmdb.org/t/p/w200${el.profile_path}`
                          : image
                      }
                    />
                  </Link>
                <div className="actors--list__block--title">
                  <a>{el.name}</a>

                  <p>{el.character}</p>
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
