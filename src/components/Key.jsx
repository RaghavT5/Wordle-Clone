import React, { useContext } from "react";
import { AppContext } from "../App";

const Key = ({ keyVal, bigKey, grayed, yellowed, greened }) => {
  const { onSelectLetter, onEnter, onDelete } = useContext(AppContext);

  const selectLetter = () => {
    if (keyVal === "ENTER") {
      onEnter();
    } else if (keyVal === "DELETE") {
      onDelete();
    } else {
      onSelectLetter(keyVal);
    }
  };

  return (
    <div
      className="key"
      id={
        bigKey
          ? "big"
          : grayed
          ? "grayed-letter"
          : yellowed && !greened
          ? "yellow-letter"
          : greened
          ? "green-letter"
          : ""
      }
      onClick={selectLetter}
    >
      {keyVal}
    </div>
  );
};

export default Key;
