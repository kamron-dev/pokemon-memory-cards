import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

function MemoryCard({character}) {
  return (
    <div className="pokemon-card">
      <img src={character.image} alt={`${character.name}-picture`} />
      <h3>{character.name}</h3>
    </div>
  );
};

function MemoryCardContainer({pokemons}) {
  // const someArrayThatHoldsCharacters = [];

  return (
    <div id="card-container">
      {
        pokemons.map((pokemon) => {
          return (
            <MemoryCard key={pokemon.name} character={pokemon}/>
          )
        })
      }
    </div>
  )
};

function ScoreBoard({scores}) {
  return (
    <div id="scoreboard">
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
    <div id="header">
      <h1>Memory Game</h1>
      <h3>Get points by clicking on an image. Do not click on an image twice!</h3>
        
    </div>
  )
};

const getRandomPokemon = async (id) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const { name, sprites } = await res.json();
  const image = sprites.front_default;
  return { id, name, image }
};


export function App() {
  const [pokemonsData, setPokemonsData] = useState([]);
  const scores = { currentScore: 0, bestScore: 0 };
  const POSSIBLE_POKEMONS = 721;
  
  useEffect(() => {
    async function getPokemons() {
      const cached = localStorage.getItem("pokemonsData");
      
      if (cached) {
        setPokemonsData(JSON.parse(cached));
        // console.log("cached fired");
        return;
      } else {
        try {
          // const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=12");
          // const data = await response.json();
          // const pokemonList = await Promise.all(
          //   data.results.map(async (pokemon) => {
          //     const res = await fetch(pokemon.url);
          //     const details = await res.json();
          //     return {
          //       name: pokemon.name,
          //       image: details.sprites.front_default,
          //     };
          //   })
          // )
          // setPokemonsData(pokemonList);
          // localStorage.setItem("pokemonsData", JSON.stringify(pokemonList));
          // // console.log("parsed should have fired");
          // return;
          const pokemonsList = [];
          for (let i = 0; i < 12; i++) {
            const randomNum = Math.floor(Math.random() * POSSIBLE_POKEMONS + 1);
            pokemonsList.push( await getRandomPokemon(randomNum));
          }
          setPokemonsData(pokemonsList);
          localStorage.setItem("pokemonsData", JSON.stringify(pokemonsList));
        } catch (err) {
          console.error(err);
        };

      };
    };
    getPokemons();
  }, []);

  

  return (
    <div id="game">
      <NameOfTheGame />
      <ScoreBoard scores={scores} />
      <MemoryCardContainer pokemons={pokemonsData}/>
    </div>
  )
  
};
