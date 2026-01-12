import { useState, useEffect, useReducer } from "react";

function scoreDispatcher(state, action) {
    switch (action.type) {
        case "add-score": 
            //finish this
    }
}

const getRandomPokemon = async (id) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const { name, sprites } = await res.json();
  const image = sprites.front_default;
  return { id, name, image, isPressed: false }
};

function useGameRules() {
    const POSSIBLE_POKEMONS = 721;
    const [pokemons, setPokemons] = useState([]);
    const [scores, dispatch] = useReducer(scoreDispatcher, { currentScore: 0, bestScore: 0 })

    useEffect(() => {
        async function getPokemons() {
          const cached = localStorage.getItem("pokemonsData");
          
          if (cached) {
            setPokemons(JSON.parse(cached));
            return;
          } else {
            try {
              const promisesArray = Array.from({ length: 12 }, () => {
                const randomNum = Math.floor(Math.random() * POSSIBLE_POKEMONS + 1);
                return getRandomPokemon(randomNum);
              });
              const pokemonsList = await Promise.all(promisesArray);
              setPokemons(pokemonsList);
              localStorage.setItem("pokemonsData", JSON.stringify(pokemonsList));
      
            } catch (err) {
              console.error(err);
            };
    
          };
        };
        getPokemons();
      
      }, []);


    return {
        pokemons,
        score,
        onCardClick
    }
};

export default useGameRules;