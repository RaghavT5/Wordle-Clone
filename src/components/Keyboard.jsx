import React, { useCallback, useEffect, useContext } from "react";
import Key from "./Key";
import { AppContext } from "../App";

const Keyboard = () => {
  const {
    onSelectLetter,
    onEnter,
    onDelete,
    grayedLetters,
    yellowLetters,
    greenLetters,
  } = useContext(AppContext);

  const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];

  const handleKeyboard = useCallback(
    (event) => {
      const key = event.key.toUpperCase();
      if (key === "ENTER") {
        onEnter();
      } else if (key === "BACKSPACE") {
        onDelete();
      } else if (/^[A-Z]$/.test(key)) {
        onSelectLetter(key);
      } else {
        // handle other keys
      }
    },
    [onSelectLetter, onEnter, onDelete]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);

    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);

  return (
    <div className="keyboard" onKeyDown={handleKeyboard}>
      <div className="line1">
        {keys1.map((key) => {
          return (
            <div>
              <Key
                keyVal={key}
                grayed={grayedLetters.includes(key)}
                yellowed={yellowLetters.includes(key)}
                greened={greenLetters.includes(key)}
              />
            </div>
          );
        })}
      </div>
      <div className="line2">
        {keys2.map((key) => {
          return (
            <div>
              <Key
                keyVal={key}
                grayed={grayedLetters.includes(key)}
                yellowed={yellowLetters.includes(key)}
                greened={greenLetters.includes(key)}
              />
            </div>
          );
        })}
      </div>
      <div className="line3">
        <Key keyVal={"ENTER"} bigKey />
        {keys3.map((key) => {
          return (
            <div>
              <Key
                keyVal={key}
                grayed={grayedLetters.includes(key)}
                yellowed={yellowLetters.includes(key)}
                greened={greenLetters.includes(key)}
              />
            </div>
          );
        })}
        <Key keyVal={"DELETE"} bigKey />
      </div>
    </div>
  );
};

export default Keyboard;
