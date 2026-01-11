import React, { useContext, useEffect, useState } from "react";
import { api_key } from "../../API";
import axios from "axios";
import MovieCards from "../MovieCards";
import { DarkContext } from "../Context";

const Popular = () => {
  const [popular, setpPopular] = useState([]);
  const { language } = useContext(DarkContext);

  async function getPopular(key) {
    let res = await axios(
      ` https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=${language}&page=1 `
    );
    let { data } = res;
    setpPopular(data.results);
  }
  useEffect(() => {
    getPopular(api_key);
  }, [language]);


  return (
    <div id="popular">
      <div className="container">
        <div className="popular">
          {popular.slice(0, 16).map((el) => (
            <React.Fragment key={el.id}>
              <MovieCards el={el} key={el.id} />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Popular;
