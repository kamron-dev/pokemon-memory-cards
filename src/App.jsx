import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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


