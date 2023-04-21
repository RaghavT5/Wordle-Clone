import wordBank from "./word-bank.txt";

export const gameboardDefault = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

export const generateWordSet = async () => {
  let wordSet;
  let todaysWord;

  await fetch(wordBank)
    .then((response) => response.text())
    .then((result) => {
      const wordsArray = result
        .toUpperCase()
        .split("\n")
        .map((word) => word.trim());
      todaysWord = wordsArray[Math.floor(Math.random() * wordsArray.length)];
      wordSet = new Set(wordsArray);
    });
  return { todaysWord, wordSet };
};
