import React, { useContext } from "react";
import logo from "../../assets/images/blue_square_2.svg";
import { DarkContext } from "../Context";

const Footer = () => {
  const { language } = useContext(DarkContext);

  return (
    <footer id="footer">
      <div className="container">
        <div className="footer">
          <img src={logo} alt="image" width={200} />
          <div className="footer--text">
            <h1>{language.includes("en") ? "The Basics" : "Главное"}</h1>
            <a href="#">{language.includes("en") ? "About TMDB" : "О TMDB"}</a>
            <a href="#">
              {language.includes("en")
                ? "API Documentation"
                : "Документация API"}
            </a>
            <a href="#">
              {language.includes("en") ? "API for Business" : "API для Бизнеса"}
            </a>
            <a href="#">
              {language.includes("en") ? "System status" : "Статус системы"}
            </a>
          </div>{" "}
          <div className="footer--text">
            <h1>{language.includes("en") ? "Participate" : "Участвуйте"}</h1>
            <a href="#">
              {language.includes("en")
                ? "The Editors' Bible"
                : "Библия редакторов"}
            </a>
            <a href="#">
              {language.includes("en")
                ? "Add new movie"
                : "Добавить новый фильм"}
            </a>
            <a href="#">
              {language.includes("en")
                ? "Add a new series"
                : "Добавить новый сериал"}
            </a>
          </div>{" "}
          <div className="footer--text">
            <h1>{language.includes("en") ? "Community" : "Сообщество"}</h1>
            <a href="#">{language.includes("en") ? "Guides" : "Руководства"}</a>
            <a href="#">
              {language.includes("en") ? "Honor Board" : "Доска почёта"}
            </a>
            <a href="#">
              {language.includes("en") ? "Support forums" : "Форумы поддержки"}
            </a>
          </div>
          <div className="footer--text">
            <h1>{language.includes("en") ? "Legal" : "О праве"}</h1>
            <a href="#">
              {language.includes("en")
                ? "Terms of Use"
                : "Условия использования"}
            </a>
            <a href="#">
              {language.includes("en")
                ? "API Terms of Use"
                : "API Правила использования"}
            </a>
            <a href="#">
              {language.includes("en")
                ? "Privacy Policy"
                : "Политика конфиденциальности"}
            </a>
            <a href="#">
              {language.includes("en") ? "СDMCA Policy" : "Политика CDMCA"}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
