import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { api_key } from "../../API";
import { useLocation, useParams } from "react-router-dom";
import { FaRegCirclePlay } from "react-icons/fa6";
import { TfiMenuAlt } from "react-icons/tfi";
import { GoHeartFill } from "react-icons/go";
import { FaBookmark } from "react-icons/fa";
import Actors from "../Actors";
import Videos from "../Videos";
import { DarkContext } from "../Context";
import { MdBookmarkAdded } from "react-icons/md";

const MovieDetails = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const passedRating = location.state?.rating;
  const { dark, language, favorite, setFavorite } = useContext(DarkContext);
  const videoRef = useRef(null);

  const [details, setDetails] = useState(null);
  async function getMovieDetails(key) {
    let res = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${key}&language=${language}&append_to_response=releases`
    );
    let { data } = res;
    setDetails(data);
  }

  useEffect(() => {
    getMovieDetails(api_key);
  }, [language]);

  if (!details) {
    return <div className="loading-state">Загрузка деталей фильма...</div>;
  }

  const formatRuntime = (minute) => {
    if (!minute) {
      return "нет данных";
    }
    const hours = Math.floor(minute / 60);
    const mins = minute % 60;
    return `${hours}h ${mins}m`;
  };
  const formattedRuntime = formatRuntime(details.runtime);
  const genres = details.genres
    ? details.genres.map((g) => g.name).join(", ")
    : "нет данных";

  // const getCertification = (releases) => {
  //   const countries = releases?.countries;
  //   if (!countries) return "N/A";

  //   const releaseData = countries.find((el) => el.iso_3166_1 === "RU");
  //   return releaseData
  //     ? `${releaseData.certification} (${releaseData.iso_3166_1})`
  //     : "N/A";
  // };

  const releaseData = details.release_date || "нет даты";

  const textStyle = {
    color: dark ? "black" : "white",
  };

  // const saveToLocal = (item) => {
  //   e.preventDefult();
  //   const isDuplicate = favorite.find((el) => el.id === item.id);

  //   if (!isDuplicate) {
  //     setFavorite([...favorite, item]);
  //   } else {
  //     const filtered = favorite.filter((el) => el.id !== item.id);
  //     setFavorite(filtered);
  //   }
  // };

  const isFavorite = favorite.find((el) => el.id === details?.id);
  const ratingValue = details.vote_average * 10;
  const degreeValue = `${(details.vote_average * 36).toFixed(0)}deg`;
  const dynamicStyle = {
    [ratingValue > 70 ? "--rating-degree" : "--rating-degrees"]: degreeValue,
  };

  const togglefavorite = (e) => {
    e.preventDefault();
    if (isFavorite) {
      const updated = favorite.filter((el) => el.id !== details.id);
      setFavorite(updated);
      localStorage.setItem("card", JSON.stringify(updated));
    } else {
      const updated = [...favorite, details];
      setFavorite(updated);
      localStorage.setItem("card", JSON.stringify(updated));
    }
  };

  // const retingStyle = {
  //   "--raging-degree": `${details}deg`,
  //   color: retingValue > 70 ? "green" : "red",
  // };

  const toggleTrailer = (e) => {
    e.preventDefault();

    videoRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <div
        id="details"
        style={{
          background: details.backdrop_path
            ? `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${details.backdrop_path})`
            : `https://celes.club/uploads/posts/2023-03/56435/1679504440_celes-club-p-fon-kinostudiya-oboi-1.png`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <div className="datails">
            <div className="detailsCard">
              <div className="detailsCard--img">
                <img
                  src={`https://image.tmdb.org/t/p/w440_and_h660_face${details.poster_path}`}
                  alt={details.title}
                />
                <div className="img-overlay"></div>
              </div>
              <div className="detailsCard--detail">
                <h1>
                  {details.title}{" "}
                  <span>({details.release_date.slice(0, 4)})</span>
                </h1>
                <div className="movieInfo">
                  <p style={textStyle} className="rating">
                    <span>
                      {releaseData.replaceAll("-", "/")}
                      {"  "} {genres} {formattedRuntime}
                    </span>
                  </p>
                </div>

                <div className="detailsCard--detail__miniRating">
                  <div className="detailsCard--detail__miniRating--card">
                    <div className="movieRating" style={dynamicStyle}>
                      <h4>
                        {Math.round(ratingValue)}
                        <span>%</span>
                      </h4>
                    </div>
                    <h5>Рейтинг</h5>
                  </div>
                  <div className="detailsCard--detail__miniRating--trailer">
                    <a href="#" onClick={toggleTrailer}>
                      <FaRegCirclePlay />
                      Воспроизвести трейлер
                    </a>
                  </div>
                </div>
                <div className="detailsCard--detail__icons">
                  <div className="detailsCard--detail__icons--Icon">
                    <a href="#">
                      <TfiMenuAlt />
                    </a>
                  </div>
                  <div className="detailsCard--detail__icons--Icon">
                    <a href="#">
                      <GoHeartFill />
                    </a>
                  </div>
                  <div className="detailsCard--detail__icons--Icon">
                    <a
                      href="#"
                      onClick={togglefavorite}
                      // style={{ color: isFavorite ? "red" : "white" }}
                    >
                      <span key={isFavorite} className="icon-animate">
                        {isFavorite ? <MdBookmarkAdded /> : <FaBookmark />}
                      </span>
                    </a>
                  </div>
                </div>
                <div className="detailsCard--detail__overview">
                  <h3>
                    <i>{details.tagline}</i>
                  </h3>
                  <h4>Обзор</h4>
                  <p>{details.overview}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Actors kinoId={movieId} />
      <div ref={videoRef}>
        <Videos videosId={movieId} />
      </div>
    </>
  );
};

export default MovieDetails;
