import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

function MemoryCard(character) {
  return (
    <div>
      <img src={"Character.url or something"} alt="character-picture" />
      <h3>{"Character.name or something"}</h3>
    </div>
  );
};

function MemoryCardContainer() {
  // const someArrayThatHoldsCharacters = [];

  return (
    <div>
      {
        // someArray.map(character => {<MemoryCard character={character}/>})
      }
    </div>
  )
};

function ScoreBoard(scores) {
  return (
    <div>
      <h3>
        Score: {scores.currentScore}
      </h3>
      <h3>
        Best Score: {scores.bestScore}
      </h3>
    </div>
  );
};

function NameOfTheGame() {
  return (
    <div>
      <h1>Memory Game</h1>
      <h3>Get points by clicking on an image. Do not click on an image twice!</h3>
        
    </div>
  )
};

export function App() {
  const [pokemons, setPokemons] = useState([]);
  useEffect(() => {
    async function getPokemons() {
      try {
        const data = await fetch("https://pokeapi.co/api/v2/pokemon?limit=12");
        const parsed = await data.json();
        console.log(parsed);
      } catch (err) {
        console.error(err);
      };

    }
    getPokemons();
  }, [])
}
