import React, { useContext, useEffect, useState } from "react";
import "./App.scss";
import Header from "./components/Header";
import Hero from "./components/Hero";
import TopRated from "./components/TopRated";
import Footer from "./components/Footer";
import Popular from "./components/Popular";
import { Route, Routes } from "react-router-dom";
import MovieDetails from "./components/MovieDetails";
import ActorDetails from "./components/ActorDetails";
import Search from "./components/Search";
import { DarkContext } from "./components/Context";
import Favorite from "./components/Favorite";

const App = () => {
  const { dark } = useContext(DarkContext);
  let routes = [
    {
      id: 1,
      link: "/",
      element: <Hero />,
    },
    {
      id: 2,
      link: "/Popular",
      element: <Popular />,
    },
    {
      id: 3,
      link: "/TopRated",
      element: <TopRated />,
    },
    {
      id: 4,
      link: "/movieDetails/:movieId",
      element: <MovieDetails />,
    },
    {
      id: 5,
      link: "/movieDetails/actorDetails/:actorId",
      element: <ActorDetails />,
    },
    {
      id: 6,
      link: "/search/:kinoName",
      element: <Search />,
    },
    {
      id: 7,
      link: "/favorite",
      element: <Favorite />,
    },
  ];
  return (
    <div
      className="app"
      style={{
        background: dark ? "white" : "black",
        color: dark ? "black" : "white",
      }}
    >
      <Header />
      <Routes>
        {routes.map((el) => (
          <Route path={el.link} element={el.element} key={el.id}></Route>
        ))}
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
