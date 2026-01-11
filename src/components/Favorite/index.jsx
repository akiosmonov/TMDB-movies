import React, { useContext, useEffect, useEffectEvent, useState } from "react";
import { DarkContext } from "../Context";
import MovieCards from "../MovieCards";

const Favorite = () => {
  const { favorite, setFavorite } = useContext(DarkContext);

  const removeFromFavorites = (id) => {
    const updated = favorite.filter((el) => el.id !== id);
    localStorage.setItem("card", JSON.stringify(updated));
    setFavorite(updated);
  };

  return (
    <>
      <div id="popular" style={{ padding: "50px 0" }}>
        <div className="container">
          <div
            className="popular"
            style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}
          >
            {favorite.length > 0 ? (
              favorite.map((movie) => <MovieCards el={movie} key={movie.id} />)
            ) : (
              <h2 style={{ color: "grey" }}>Ваш список избранного пуст</h2>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Favorite;
