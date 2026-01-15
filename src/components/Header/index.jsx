import React, { useContext, useEffect, useState } from "react";
import logo from "../../assets/images/blue-92.svg";
import { IoMdSearch } from "react-icons/io";

import { Link, NavLink, useNavigate } from "react-router-dom";
import { MdOutlineNightlightRound } from "react-icons/md";
import { FaSun } from "react-icons/fa";
import { DarkContext } from "../Context";
const Header = () => {
  const [movieName, setMovieName] = useState("");
  let nav = useNavigate();
  const { dark, setDark, language, setLanguage, favorite } =
    useContext(DarkContext);

  const SearchMovie = () => {
    const trimmedName = movieName.trim();

    if (trimmedName === "") {
      alert("error");
    } else {
      nav(`/search/${trimmedName}`);
      setMovieName("");
    }
  };

  const intChange = (e) => {
    setMovieName(e.target.value);
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      SearchMovie();
    }
  };

  const navLinks = [
    { path: "/popular", en: "Popular", ru: "Популярные" },
    { path: "/topRated", en: "Top Rated", ru: "Топ рейтинг" },
  ];

  return (
    <div id="header">
      <div className="container">
        <div className="header">
          <div className="header--nav">
            <NavLink to={"/"}>
              <img src={logo} alt="image" width={200} />
            </NavLink>
            {navLinks.map((link) => (
              <NavLink key={link.path} to={link.path}>
                {language.includes("en") || language.inclue ? link.en : link.ru}
              </NavLink>
            ))}
            <NavLink to={"/favorite"}>
              {language.includes("en") ? "Favorite" : "Избранное"}
              {favorite.length > 0 && (
                <span className="favorite-badge">{favorite.length}</span>
              )}
            </NavLink>
          </div>
          <div className="header--search">
            <Link className="header--moonSun" onClick={() => setDark(!dark)}>
              {dark ? <MdOutlineNightlightRound /> : <FaSun />}
            </Link>
            <select onChange={(e) => setLanguage(e.target.value)}>
              <option value="ru-RU">RU</option>
              <option value="en-EN">EN</option>
            </select>
            <div className="form">
              <input
                onChange={intChange}
                value={movieName}
                type="text"
                placeholder={
                  language.includes("en")
                    ? "Find a movie, series"
                    : "Найти фильм, сериал.."
                }
                onKeyDown={handleKey}
              />
              <a className="search-icon" onClick={() => SearchMovie()}>
                <IoMdSearch />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
