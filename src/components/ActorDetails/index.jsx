import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api_key } from "../../API";
import axios from "axios";
import ActorsFilms from "../ActorsFilms";
import { DarkContext } from "../Context";

const ActorDetails = () => {
  const [actorDetails, setActorDetails] = useState({});
  const { actorId } = useParams();
  const [bio, setBio] = useState(200);
  const { language } = useContext(DarkContext);

  async function getActorsDetails(key) {
    let res = await axios(
      `https://api.themoviedb.org/3/person/${actorId}?api_key=${key}&language=${language}`
    );
    let { data } = res;
    setActorDetails(data);
  }

  useEffect(() => {
    getActorsDetails(api_key);
  }, [actorId, language]);

  const {
    also_known_as,
    profile_path,
    name,
    biography,
    birthday,
    known_for_department,
    place_of_birth,
  } = actorDetails;

  const initialLength = 200;
  const isExpanded = bio > initialLength;
  const fullBio = biography && biography.length > initialLength;
  const sliceText = () => {
    if (!isExpanded) {
      setBio(biography.length);
    } else {
      setBio(initialLength);
    }
  };
  console.log(actorDetails);

  return (
    <div id="actorDet">
      <div className="container">
        <div className="actorDet">
          <div className="actorDet__img">
            <img src={`https://image.tmdb.org/t/p/w200${profile_path}`} />
          </div>
          <div className="actorDet__tittle">
            <h1>{name} </h1>

            <div className="actorDet__tittle--beography">
              <h3>Биография</h3>
              <h4>
                {biography && biography.length > 0 ? (
                  <>
                    {biography.slice(0, bio)}
                    {!isExpanded && fullBio && "..."}
                    {fullBio && (
                      <span
                        onClick={sliceText}
                        style={{
                          color: "#01b4e4",
                          cursor: "pointer",
                          marginLeft: "8px",
                        }}
                      >
                        {isExpanded ? "Свернуть" : "Читать еще..."}
                      </span>
                    )}
                  </>
                ) : (
                  <span
                    style={{
                      color: "gray",
                      fontStyle: "italic",
                      fontSize: "16px",
                    }}
                  >
                    К сожалению, биография на данном языке пока не добавлена.
                    Попробуйте переключить язык на английский.
                  </span>
                )}
              </h4>
            </div>
            <div className="actorDet__tittle--knows">
              <h4>Известность за</h4>
              <ActorsFilms filmsId={actorId} />
            </div>
          </div>
        </div>
        <div className="personInfo">
          <h1>Персональная информация</h1>
          <div className="personInfo--item">
            <h4>Известность за</h4>
            <p>{known_for_department}</p>
          </div>
          <div className="personInfo--item">
            <h4>Дата рождения</h4>
            <p>{birthday}</p>
          </div>
          <div className="personInfo--item">
            <h4>Место рождения</h4>
            <p>{place_of_birth}</p>
          </div>
          <div className="personInfo--item">
            <h4>Также известность как</h4>
            <div className="personInfo--item__know">
              {also_known_as?.map((el) => (
                <p>{el}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActorDetails;
