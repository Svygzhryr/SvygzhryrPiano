import { useState, useEffect } from "react";
import styles from "./Themes.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { themeSelector } from "../../store/selectors";
import { switchTheme } from "../../store/themeSlice";

export const Themes = ({ showText, setShowText, envelopeColorChange }) => {
  const dispatch = useDispatch();
  const theme = useSelector(themeSelector);

  useEffect(() => {
    document.documentElement.setAttribute(
      "color-scheme",
      localStorage.getItem("theme") ?? "black"
    );
    envelopeColorChange();
  }, [envelopeColorChange, theme]);

  const changeTheme = (theme) => {
    dispatch(switchTheme(theme));
    localStorage.setItem("theme", theme);
  };

  const changeShowText = () => {
    setShowText(!showText);
  };

  return (
    <div className={styles.themes}>
      <button
        onClick={() => changeTheme("black")}
        className={`${styles.themeSelector} ${styles.theme1}`}
      ></button>
      <button
        onClick={() => changeTheme("purple")}
        className={`${styles.themeSelector} ${styles.theme2}`}
      ></button>
      <button
        onClick={() => changeTheme("red")}
        className={`${styles.themeSelector} ${styles.theme3}`}
      ></button>
      <button
        onClick={() => changeTheme("blue")}
        className={`${styles.themeSelector} ${styles.theme4}`}
      ></button>
      <button
        onClick={changeShowText}
        className={`${styles.themeSelector} ${styles.toggleText} ${
          showText || styles.textActive
        }`}
      >
        T
      </button>
    </div>
  );
};
