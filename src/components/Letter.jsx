import React, { useContext, useEffect } from "react";
import { AppContext } from "../App";

function Letter({ letterPosition, attemptValue }) {
  const {
    gameboard,
    correctWord,
    currentAttempt,
    setGrayedLetters,
    setYellowLetters,
    setGreenLetters,
  } = useContext(AppContext);

  const letter = gameboard[attemptValue][letterPosition];

  const correct = correctWord[letterPosition] === letter;

  const almost = !correct && letter != "" && correctWord.includes(letter);

  const letterState =
    currentAttempt.attempt > attemptValue &&
    (correct ? "correct" : almost ? "almost" : "wrong");

  useEffect(() => {
    if (letter !== "" && !correct && !almost) {
      setGrayedLetters((prev) => [...prev, letter]);
    }
  }, [currentAttempt.attempt]);

  useEffect(() => {
    if (letter !== "" && almost) {
      setYellowLetters((prev) => [...prev, letter]);
    }
  }, [currentAttempt.attempt]);

  useEffect(() => {
    if (letter !== "" && correct) {
      setGreenLetters((prev) => [...prev, letter]);
    }
  }, [currentAttempt.attempt]);

  return (
    <div className="letter" id={letterState}>
      {letter}
    </div>
  );
}

export default Letter;
