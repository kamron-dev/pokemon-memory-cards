import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

function MemoryCard({character, onClick}) {
  return (
    <div className="pokemon-card" onClick={onClick}>
      <img src={character.image} alt={`${character.name}-picture`} />
      <h3>{character.name}</h3>
    </div>
  );
};

function MemoryCardContainer({pokemons, onClick}) {
  // const someArrayThatHoldsCharacters = [];

  return (
    <div id="card-container">
      {
        pokemons.map((pokemon) => {
          return (
            <MemoryCard key={pokemon.id} character={pokemon} onClick={()=> onClick(pokemon.id)}/>
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
  return { id, name, image, isPressed: false }
};


export function App() {
  const [pokemonsData, setPokemonsData] = useState([]);
  const [scores, setScores] = useState({currentScore: 0, bestScore: 0})
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
          const promisesArray = Array.from({ length: 12 }, () => {
            const randomNum = Math.floor(Math.random() * POSSIBLE_POKEMONS + 1);
            return getRandomPokemon(randomNum);
          });
          const pokemonsList = await Promise.all(promisesArray);
          setPokemonsData(pokemonsList);
          localStorage.setItem("pokemonsData", JSON.stringify(pokemonsList));
  
        } catch (err) {
          console.error(err);
        };

      };
    };
    getPokemons();
  
  }, []);

  
  const addPoint = () => {

    setScores(oldScores => {
      let newCurrentScore = oldScores.currentScore + 1;
      // let newBestScore = oldScores.bestScore + 1;
      
      
      if (newCurrentScore === 12) {
        alert("You won!");
        endGame();
      };
      return {...oldScores, currentScore: newCurrentScore };
      
    });
  };

  const endGame = () => {
    setScores(oldScore => {
      return scores.currentScore > oldScore.bestScore ? { currentScore: 0, bestScore: scores.currentScore } : { ...oldScore, currentScore: 0 };
    });
    // refreshCards(); mark them as never pressed
    // shuffleCards(); shuffle the order of the cards appearing in the container
  }

  const handleClick = (id) => {
    const pressedPokemon = pokemonsData.find(pokemon => {
      return pokemon.id === id;
    });
    if (pressedPokemon.isPressed) {
      //handle endgame
      alert("You lost!");
      endGame();
      
    } else {
      setPokemonsData(oldArray => {
        return oldArray.map(pokemon => {
          return pokemon.id === pressedPokemon.id ? { ...pressedPokemon, isPressed: !pressedPokemon.isPressed } : pokemon;
        });
      });
      // addPoint();
      addPoint();
      // shuffleCards();
      // check if win();
    }
  };
  
  // const handleAddScore = () => {
  //   setScores(oldScores => {
  //     let newCurrentScore = oldScores.currentScore + 1;
  //     let newBestScore = oldScores.bestScore + 1;
      
      
  //     if (newCurrentScore === 12) alert("You won!");
  //     return { currentScore: newCurrentScore, bestScore: newBestScore };
  //     // return newBestScore > oldScores.bestScore ? { currentScore: newCurrentScore, bestScore: newBestScore } : { ...oldScores, currentScore: newCurrentScore };
  //   });
    
  // };


  return (
    <div id="game">
      <NameOfTheGame />
      <ScoreBoard scores={scores} />
      <MemoryCardContainer onClick={handleClick} pokemons={pokemonsData}/>
    </div>
  )
  
};
