import React, { useContext } from "react";
import { AppContext } from "../App";

const GameOver = () => {
  const { gameOver, correctWord, currentAttempt } = useContext(AppContext);

  return (
    <div className="gameOver">
      <h3>
        {gameOver.guessedWord ? "You Won!!!" : "Sorry! Better luck next time."}
      </h3>
      <h1>Correct Word: {correctWord}</h1>
      {gameOver.guessedWord && (
        <h3>You guessed in {currentAttempt.attempt} attempts.</h3>
      )}
    </div>
  );
};

export default GameOver;
