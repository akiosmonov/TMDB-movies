import React, { children, useContext, useEffect, useState } from "react";
import { DarkContext } from ".";

const RootContext = ({ children }) => {
  const [language, setLanguage] = useState("ru-RU");

  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? JSON.parse(saved) : false;
  });

  // const [favorite, setFavorite] = useState(() => {
  //   const saved = localStorage.getItem("card");
  //   return saved ? JSON.parse(saved) : [];

  // });

  const getSafeLocalStorage = (key, defaultValue) => {
    const saved = localStorage.getItem(key);
    if (saved === null || saved === "undefined" || saved === "") {
      return defaultValue;
    }
    try {
      return JSON.parse(saved);
    } catch (error) {
      console.error(`Error parsing localStorage key "${key}":`, error);
      return defaultValue;
    }
  };

  const [favorite, setFavorite] = useState(() =>
    getSafeLocalStorage("card", [])
  );
  useEffect(() => {
    localStorage.setItem("card", JSON.stringify(favorite));
  }, [favorite]);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(dark));
  }, [dark]);

  return (
    <DarkContext.Provider
      value={{ dark, language, setLanguage, setDark, favorite, setFavorite }}
    >
      {children}
    </DarkContext.Provider>
  );
};

export default RootContext;
