import React from "react";
import { useState, useEffect, useCallback } from "react";
import styles from "./Themes.module.scss";

export const Themes = ({ showText, setShowText }) => {
  const [theme, setTheme] = useState("black");

  const [progressColor, setProgressColor] = useState(
    getComputedStyle(document.documentElement).getPropertyValue(
      "--primary_button_active"
    )
  );
  const [trackColor, setTrackColor] = useState(
    getComputedStyle(document.documentElement).getPropertyValue(
      "--primary_background"
    )
  );
  const [thumbColor, setThumbColor] = useState(
    getComputedStyle(document.documentElement).getPropertyValue(
      "--primary_background"
    )
  );

  const envelopeColorChange = useCallback(() => {
    setProgressColor(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--primary_button_active"
      )
    );
    setTrackColor(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--primary_background"
      )
    );
    setThumbColor(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--primary_background"
      )
    );
  }, [setProgressColor, setTrackColor, setThumbColor]);

  useEffect(() => {
    document.documentElement.setAttribute(
      "color-scheme",
      localStorage.getItem("theme") ?? "default"
    );
    envelopeColorChange();
  }, [envelopeColorChange, theme]);

  // const themeChange = (e) => {
  //   const button = e.target;
  //   switch (true) {
  //     default:
  //       return null;
  //     case button.classList.contains("theme1"): {
  //       setTheme("default");
  //       localStorage.setItem("theme", "default");
  //       break;
  //     }

  //     case button.classList.contains("theme2"): {
  //       setTheme("purple");
  //       localStorage.setItem("theme", "purple");
  //       break;
  //     }

  //     case button.classList.contains("theme3"): {
  //       setTheme("red");
  //       localStorage.setItem("theme", "red");
  //       break;
  //     }

  //     case button.classList.contains("theme4"): {
  //       setTheme("blue");
  //       localStorage.setItem("theme", "blue");
  //       break;
  //     }
  //   }
  // };

  const setBlackTheme = () => {
    setTheme("default");
    localStorage.setItem("theme", "default");
  };

  const setPurpleTheme = () => {
    setTheme("purple");
    localStorage.setItem("theme", "purple");
  };

  const setRedTheme = () => {
    setTheme("red");
    localStorage.setItem("theme", "red");
  };

  const setBlueTheme = () => {
    setTheme("blue");
    localStorage.setItem("theme", "blue");
  };

  const handleShowText = () => {
    localStorage.setItem("text", !showText);
    return setShowText(!showText);
  };

  return (
    <div className={styles.themes}>
      <button
        onClick={setBlackTheme}
        className={`${styles.themeSelector} ${styles.theme1}`}
      ></button>
      <button
        onClick={setPurpleTheme}
        className={`${styles.themeSelector} ${styles.theme2}`}
      ></button>
      <button
        onClick={setRedTheme}
        className={`${styles.themeSelector} ${styles.theme3}`}
      ></button>
      <button
        onClick={setBlueTheme}
        className={`${styles.themeSelector} ${styles.theme4}`}
      ></button>
      <button
        onClick={handleShowText}
        className={`${styles.themeSelector} ${styles.toggleText} ${
          showText || styles.textActive
        }`}
      >
        T
      </button>
    </div>
  );
};
