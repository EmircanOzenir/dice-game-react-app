import { useState, useEffect } from "react";

import "./App.css";
import Die from "./components/Die";

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [score, setScore] = useState(0);
  const [highestScore, setHighestScore] = useState(0);

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
      if (score < highestScore || highestScore === 0) {
        setHighestScore(score);
        localStorage.setItem("highestScore", score);
      }
    }
  }, [dice, score, highestScore]);

  useEffect(() => {
    const storedHighestScore = localStorage.getItem("highestScore");
    if (storedHighestScore) {
      setHighestScore(parseInt(storedHighestScore, 10));
    };
  }, []); 

  function generateNewDie() {
    const randomId = Math.floor(Math.random() * 10000000) + 1;
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: randomId,
    };
  };

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    };
    return newDice;
  };

  function rollDice() {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
      setScore(prev => prev + 1);
    } else {
      setTenzies(false);
      setDice(allNewDice());
      setScore(0);
    }
  };

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  };

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice__container">{diceElements}</div>
      <p className="instructions">Your score is: {score}</p>
      <p className="instructions">Your highest score is: {highestScore}</p>
      <button className="roll__dice" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;