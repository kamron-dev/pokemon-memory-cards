import './App.css'
import PropTypes from 'prop-types';
import useGameRules from '../useGameRules';
// import { useEffect } from 'react';

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

function ScoreBoard({current, top}) {
  return (
    <div id="scoreboard">
      <h3>
        Score: {current}
      </h3>
      <h3>
        Best Score: {top}
      </h3>
    </div>
  );
};

function NameOfTheGame() {
  return (
    <div id="header">
      <h1>Memory Game</h1>
      <h3>Get points by clicking on images. Do not click on an image twice!</h3>
        
    </div>
  )
};

// const getRandomPokemon = async (id) => {
//   const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
//   const { name, sprites } = await res.json();
//   const image = sprites.front_default;
//   return { id, name, image, isPressed: false }
// };


export function App() {
  const { gameState, handleCardClick } = useGameRules();
  console.log(gameState)
  
  // useEffect(() => {
  //   console.log("Updated gameState: ", gameState);
  // }, [gameState])
  
  // const addPoint = () => {

  //   setScores(oldScores => {
  //     let newCurrentScore = oldScores.currentScore + 1;
  //     // let newBestScore = oldScores.bestScore + 1;
      
      
  //     if (newCurrentScore === 12) {
  //       alert("You won!");
  //       endGame(); 
  //     };
  //     return {...oldScores, currentScore: newCurrentScore };
      
  //   });
  // };
  // function shuffleCards(cards) {
  //     const copy = [...cards];
  //     for (let i = copy.length - 1; i > 0; i--) {
  //       const j = Math.floor(Math.random() * (i + 1));
  //       [copy[i], copy[j]] = [copy[j], copy[i]];
  //     }
  //     return copy;
  //   };

  // const endGame = () => {
  //   setScores(oldScore => {
  //     return scores.currentScore > oldScore.bestScore ? { currentScore: 0, bestScore: scores.currentScore } : { ...oldScore, currentScore: 0 };
  //   });
  //   // refreshCards(); mark them as never pressed
  //   (function refreshCards() {
  //     setPokemonsData(oldData => {
  //       return oldData.map(oldPokemon => {
  //         return ({ ...oldPokemon, isPressed: false });
  //       });
  //     });
  //   })();
  //   // shuffleCards(); shuffle the order of the cards appearing in the container
  //   setPokemonsData(oldArray => shuffleCards(oldArray));
  // };

  // const handleClick = (id) => {
  //   const pressedPokemon = pokemonsData.find(pokemon => {
  //     return pokemon.id === id;
  //   });
  //   if (pressedPokemon.isPressed) {
  //     //handle endgame
  //     alert("You lost!");
  //     endGame();
      
  //   } else {
  //     setPokemonsData(oldArray => {
  //       return oldArray.map(pokemon => {
  //         return pokemon.id === pressedPokemon.id ? { ...pressedPokemon, isPressed: !pressedPokemon.isPressed } : pokemon;
  //       });
  //     });
      
  //     addPoint();
  //     // check if win();
  //     // shuffleCards();
  //     setPokemonsData(oldArray => shuffleCards(oldArray));
  //   };
  // };
  


  return (
    <div id="game">
      <NameOfTheGame />
      <ScoreBoard current={gameState.currentScore} top={gameState.highScore} />
      {gameState.status === "playing" && <MemoryCardContainer onClick={handleCardClick} pokemons={gameState.pokemons}/>}
      
    </div>
  )
  
};

// MemoryCard.propTypes = {
//   character: PropTypes.string,
//   onClick: PropTypes.func,
// };

// MemoryCardContainer.propTypes = {
//   pokemons: PropTypes.array,
//   onClick: PropTypes.func
// };

// ScoreBoard.propTypes = {
//   scores: PropTypes.string
// }