import axios from "axios";
import React, { useContext, useEffect, useEffectEvent, useState } from "react";
import { api_key } from "../../API";
import MovieCards from "../MovieCards";
import { useParams } from "react-router-dom";
import { DarkContext } from "../Context";

const Search = () => {
  const [search, setSearch] = useState([]);
  const { language } = useContext(DarkContext);

  const { kinoName } = useParams();

  async function SearchMovie(key) {
    let res = await axios(
      `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${kinoName}&language=${language}`
    );
    let { results } = res.data;
    setSearch(results);
  }

  useEffect(() => {
    if (kinoName) {
      SearchMovie(api_key);
    }
  }, [kinoName, language]);
  return (
    <div id="popular">
      <div className="container">
        <div className="popular">
          {search.length > 0 ? (
            search.map((el, i) => <MovieCards el={el} key={el.id} index={i} />)
          ) : (
            <div className="empty-state">
              <h2>
                {language === "ru-RU"
                  ? "По вашему запросу ничего не найдено"
                  : "No results found for your search"}
              </h2>
              <center><p>🧐</p></center>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
