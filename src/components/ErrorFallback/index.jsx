import React from "react";

import styles from "./ErrorFallback.module.scss";

export const ErrorFallback = ({ error }) => {
  const handleOnClick = () => {
    window.location.reload();
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.error}>
          <h2>{error.message}</h2>
          <button onClick={handleOnClick}>Reload</button>
        </div>
      </div>
    </>
  );
};
