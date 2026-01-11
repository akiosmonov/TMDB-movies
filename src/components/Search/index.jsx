import axios from "axios";
import React, { useEffect, useEffectEvent, useState } from "react";
import { api_key } from "../../API";
import MovieCards from "../MovieCards";
import { useParams } from "react-router-dom";

const Search = () => {
  const [search, setSearch] = useState([]);

  const { kinoName } = useParams();

  async function SearchMovie(key) {
    let res = await axios(
      `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${kinoName}`
    );
    let { results } = res.data;
    setSearch(results);
  }

  useEffect(() => {
    if (kinoName) {
      SearchMovie(api_key);
    }
  }, [kinoName]);
  return (
    <div id="popular">
      <div className="container">
        <div className="popular">
          {search.map((el) => (
            <MovieCards el={el} key={el.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
