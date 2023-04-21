import React, { createContext, useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import Gameboard from "./components/Gameboard";
import Keyboard from "./components/Keyboard";
import { gameboardDefault, generateWordSet as generateWordSet } from "./Words";
import GameOver from "./components/GameOver";

export const AppContext = createContext();

const App = () => {
  const [gameboard, setGameboard] = useState(gameboardDefault);
  const [currentAttempt, setCurrentAttempt] = useState({
    attempt: 0,
    letterPosition: 0,
  });

  const [correctWord, setCorrectWord] = useState("");

  const [wordSet, setWordSet] = useState(new Set());

  useEffect(() => {
    generateWordSet().then((words) => {
      console.log(words);
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);
    });
  }, []);

  const onSelectLetter = (keyVal) => {
    if (currentAttempt.letterPosition > 4) return;
    const newGameboard = [...gameboard];
    newGameboard[currentAttempt.attempt][currentAttempt.letterPosition] =
      keyVal;
    setGameboard(newGameboard);
    setCurrentAttempt({
      ...currentAttempt,
      letterPosition: currentAttempt.letterPosition + 1,
    });
  };

  const onEnter = () => {
    if (currentAttempt.letterPosition !== 5) return;

    let currentWord = "";
    for (let i = 0; i < 5; i++) {
      currentWord += gameboard[currentAttempt.attempt][i];
    }

    if (wordSet.has(currentWord)) {
      setCurrentAttempt({
        attempt: currentAttempt.attempt + 1,
        letterPosition: 0,
      });
    } else {
      console.log(currentWord);
      alert("Word not in the list");
    }

    if (currentWord === correctWord) {
      setGameOver({ gameOver: true, guessedWord: true });
    }

    if (currentAttempt.attempt === 5) {
      setGameOver({ gameOver: true, guessedWord: false });
    }
  };

  const onDelete = () => {
    if (currentAttempt.letterPosition === 0) return;
    const newGameboard = [...gameboard];
    newGameboard[currentAttempt.attempt][currentAttempt.letterPosition - 1] =
      "";
    setGameboard(newGameboard);
    setCurrentAttempt({
      ...currentAttempt,
      letterPosition: currentAttempt.letterPosition - 1,
    });
  };

  const [grayedLetters, setGrayedLetters] = useState([]);
  const [yellowLetters, setYellowLetters] = useState([]);
  const [greenLetters, setGreenLetters] = useState([]);

  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: correctWord,
  });

  return (
    <div>
      <NavBar />
      <AppContext.Provider
        value={{
          gameboard,
          setGameboard,
          currentAttempt,
          setCurrentAttempt,
          onSelectLetter,
          onEnter,
          onDelete,
          correctWord,
          grayedLetters,
          setGrayedLetters,
          yellowLetters,
          setYellowLetters,
          greenLetters,
          setGreenLetters,
          gameOver,
          setGameOver,
        }}
      >
        <div className="game">
          <Gameboard />
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
        </div>
      </AppContext.Provider>
    </div>
  );
};

export default App;
