import React from "react";
import logo from "../../assets/images/blue_square_2.svg";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="container">
        <div className="footer">
          <img src={logo} alt="image" width={200} />
          <div className="footer--text">
            <h1>Главное</h1>
            <a href="#">О TMDB</a>
            <a href="#">API Documentation</a>
            <a href="#">API for Business</a>
            <a href="#">Статус системы</a>
          </div>{" "}
          <div className="footer--text">
            <h1>Участвуйте</h1>
            <a href="#">Библия редакторов</a>
            <a href="#">Добавить новый фильм</a>
            <a href="#">Добавить новый сериал</a>
          </div>{" "}
          <div className="footer--text">
            <h1>Сообщество</h1>
            <a href="#">Руководства</a>
            <a href="#">Доска почёта</a>
            <a href="#">Форумы поддержки</a>
          </div>
          <div className="footer--text">
            <h1>О праве</h1>
            <a href="#">Условия использования</a>
            <a href="#">API Правила использования</a>
            <a href="#">Политика конфиденциальности</a>
            <a href="#">СDMCA Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
