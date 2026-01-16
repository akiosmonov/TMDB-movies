import React, { useState } from "react";
import { Link } from "react-router-dom";

const MovieCards = ({ el, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { poster_path, title, vote_average, release_date } = el;

  const initialLength = 27;
  const ndT = title && title.length > initialLength;

  const displayedTitle =
    ndT && !isExpanded ? title.slice(0, initialLength) + "..." : title;

  const toggleTitle = (e) => {
    e.preventDefault();
    setIsExpanded(!isExpanded);
  };
  const ratingValue = el.vote_average * 10;
  const degreeValue = `${(el.vote_average * 36).toFixed(0)}deg`;
  const dynamicStyle = {
    [ratingValue > 70 ? "--rating-degree" : "--rating-degrees"]: degreeValue,
  };

  if (!poster_path) return null;

  const dynamicStyleCard = {
    [ratingValue > 70 ? "--rating-degree" : "--rating-degrees"]: degreeValue,
    animationDelay:  `${index * 0.1}s`
  } 

  return (
    <div id="popular" style={dynamicStyleCard}>
      <div className="popular--card">
        <div className="popular--card__img">
          <Link to={`/movieDetails/${el.id}`}>
            <img
              src={
                poster_path
                  ? `https://image.tmdb.org/t/p/w440_and_h660_face/${poster_path}`
                  : `https://celes.club/uploads/posts/2023-03/56435/1679504440_celes-club-p-fon-kinostudiya-oboi-1.png`
              }
            />
          </Link>
        </div>
        <div className="popular--card__title">
          <h1>
            {displayedTitle}
            {ndT && (
              <span onClick={toggleTitle}>
                {!isExpanded ? "..." : "свернуть"}
              </span>
            )}
          </h1>
          <Link
            to={{
              pathname: `/movieDetails/${el.id}`,
              state: {
                rating: vote_average,
              },
            }}
          >
            <div className="popular--card__title--rate" style={dynamicStyle}>
              <h4>
                {Math.round(ratingValue)}
                <span>%</span>
              </h4>
            </div>
          </Link>
          <h3>{release_date}</h3>
        </div>
      </div>
    </div>
  );
};

export default MovieCards;
