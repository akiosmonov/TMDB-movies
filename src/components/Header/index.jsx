import React, { useContext, useEffect, useState } from "react";
import logo from "../../assets/images/blue-92.svg";
import { CiSearch } from "react-icons/ci";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { MdOutlineNightlightRound } from "react-icons/md";
import { FaSun } from "react-icons/fa";
import { DarkContext } from "../Context";
const Header = () => {
  const [movieName, setMovieName] = useState("");
  let nav = useNavigate();
  const { dark, setDark, language, setLanguage } = useContext(DarkContext);

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

  return (
    <div id="header">
      <div className="container">
        <div className="header">
          <div className="header--nav">
            <NavLink to={"/"}>
              <img src={logo} alt="image" width={200} />
            </NavLink>
            <NavLink to={"/popular"}>Popular</NavLink>
            <NavLink to={"/topRated"}>Top Rated</NavLink>
            <NavLink to={"/favorite"}>Favorite</NavLink>
          </div>
          <div className="header--search">
            <Link className="header--moonSun" onClick={() => setDark(!dark)}>
              {dark ? <MdOutlineNightlightRound /> : <FaSun />}
            </Link>
            <select onChange={(e) => setLanguage(e.target.value)}>
              <option value="en-EN">EN</option>
              <option value="ru-RU">RU</option>
            </select>
            <div className="form">
              <input
                onChange={intChange}
                value={movieName}
                className="int"
                type="text"
                placeholder="Найти фильм, сериал.."
                onKeyDown={handleKey}
              />
              <a onClick={() => SearchMovie()}>
                <CiSearch />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
