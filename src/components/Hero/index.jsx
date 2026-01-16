import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api_key } from "../../API";
import { DarkContext } from "../Context";

const Hero = () => {
  const [hero, setHero] = useState([]);
  const [popInHero, setPopInHero] = useState([]);
  const { dark, language } = useContext(DarkContext);
  const [isLoaded, setIsLoaded] = useState(false);

  async function HeroBackground(key) {
    let res = await axios(
      `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=${language}&page=1 `
    );
    let { results } = res.data;
    setPopInHero(results);
    let randomBg = Math.floor(Math.random() * results.length);
    setHero(results[randomBg]);
  }

  useEffect(() => {
    HeroBackground(api_key);
  }, [language]);

  const handleKey = (e) => {
    if (e.key === "Enter") {
      searchMovie();
    }
  };

  let nav = useNavigate();
  const [movieName, setMovieName] = useState("");

  const searchMovie = () => {
    const trimmed = movieName.trim();

    if (trimmed === "") {
      alert("error");
    } else {
      nav(`/search/${trimmed}`);
      setMovieName("");
    }
  };

  const intChange = (e) => {
    setMovieName(e.target.value);
  };

  const textStyle = {
    color: dark ? "black" : "white",
  };

  useEffect(() => {
    if (hero?.backdrop_path) {
      const img = new Image();
      img.src = `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${hero.backdrop_path}`;
      img.onload = () => setIsLoaded(true);
    }
  }, [hero]);
  return (
    <>
      <div
        id="hero"
        className={isLoaded ? "loaded" : ""}
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${hero.backdrop_path})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <div className="hero">
            <div className="hero--start">
              <div className="hero--start__tittle">
                <h1>
                  {language.includes("en") ? "Welcome." : "Добро пожаловать."}
                </h1>
                <h2>
                  {language.includes("en")
                    ? "Millions of movies, TV shows, and people. Explore now."
                    : "Миллионы фильмов, сериалов и людей. Исследуйте сейчас."}
                </h2>
              </div>
              <div className="hero--start--int">
                <input
                  type="text"
                  placeholder={
                    language.includes("en")
                      ? "Find a movie, TV series, person..."
                      : "Найти фильм, сериал, персону..."
                  }
                  onKeyDown={handleKey}
                  value={movieName}
                  onChange={intChange}
                />
                <button onClick={() => searchMovie()}>
                  {language.includes("en") ? "Search" : "Поиск"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="popInHero">
        <div className="container">
          <h3>{language.includes("en") ? "Trending Now" : "В тренде"}</h3>

          <div className="popInHero">
            {popInHero?.map((el) => (
              <div className="popInHero--block" key={el.id}>
                <div className="popInHero--block__image">
                  <Link to={`/movieDetails/${el.id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w185${el.poster_path}`}
                    />
                  </Link>
                  <div className="popInHero--block__title">
                    <Link to={`/movieDetails/${el.id}`}>
                      <h1>{el.title}</h1>
                    </Link>
                    <p>{el.release_date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
