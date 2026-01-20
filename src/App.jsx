import './App.css'
import PropTypes from 'prop-types';
import useGameRules from './useGameRules';
import { useState } from 'react';


function MemoryCard({character, onClick}) {
  return (
    <div className="pokemon-card" onClick={onClick}>
      <img src={character.image} alt={`${character.name}-picture`} />
      <h3>{character.name}</h3>
    </div>
  );
};

function MemoryCardContainer({pokemons, onClick}) {

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

function EndScreen({ children }) {
  return (
    <div className="endGame">
      {children}
    </div>
  )
};


function App({OnButtonClick}) {
  const { gameState, handleCardClick } = useGameRules();
  console.log(gameState)
  
  return (
    <div id="game">
      <NameOfTheGame />
      <ScoreBoard current={gameState.currentScore} top={gameState.highScore} />
      {gameState.status === "lost" && <EndScreen><h1>You lost...</h1> <button onClick={OnButtonClick}>Restart game</button></EndScreen>}
      {gameState.status === "won" && <EndScreen><h1>You won!</h1></EndScreen>}
      {gameState.status === "playing" && <MemoryCardContainer onClick={handleCardClick} pokemons={gameState.pokemons}/>}
    </div>
  )
  
};

export function GameRoot() {
  const [gameKey, setGameKey] = useState(0);
  const handleKeyChange = () => setGameKey(oldKey => oldKey + 1);

  return (
    <App key={gameKey} OnButtonClick = {handleKeyChange}></App>
  )
};

MemoryCard.propTypes = {
  character: PropTypes.string,
  onClick: PropTypes.func,
};

MemoryCardContainer.propTypes = {
  pokemons: PropTypes.array,
  onClick: PropTypes.func
};

ScoreBoard.propTypes = {
  scores: PropTypes.string
}