import React, { useContext, useEffect, useState } from "react";
import { api_key } from "../../API";
import axios from "axios";
import MovieCards from "../MovieCards";
import { DarkContext } from "../Context";
const topRated = () => {
  const [topRated, setTopRated] = useState([]);
  const [page, setPage] = useState(1);
  const { language } = useContext(DarkContext);

  async function getTopRated(key, currentPages) {
    let res = await axios(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=${language}&page=${currentPages}`
    );
    let { data } = res;
    setTopRated(data.results);
  }
  const swichPages = () => {
    setPage((prevPage) => prevPage + 1);
  };
  useEffect(() => {
    getTopRated(api_key, page, language);
  }, [page, language]);



  return (
    <div id="popular">
      <div className="container">
        <div className="popular">
          {topRated.slice(0, 16).map((el) => (
            <MovieCards el={el} key={el.id} />
          ))}
        </div>
        <center>
          <button onClick={swichPages}>More films</button>
        </center>
      </div>
    </div>
  );
};

export default topRated;
