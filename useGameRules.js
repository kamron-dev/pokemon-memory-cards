import { useEffect, useReducer } from "react";

function gameDispatcher(state, action) {
    switch (action.type) {
        case "save-pokemons":
            return { ...state, pokemons: action.data };
        
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
    const [gameState, dispatch] = useReducer(gameDispatcher, {
        pokemons: [],
        currentScore: 0,
        bestScore: 0,
        // status IMPLEMENT LATER
    });

    useEffect(() => {
        async function getPokemons() {
          const cached = localStorage.getItem("pokemonsData");
          
          if (cached) {
              // setPokemons(JSON.parse(cached));
              dispatch({
                  type: "save-pokemons",
                  data: JSON.parse(cached)
              })
            return;
          } else {
            try {
              const promisesArray = Array.from({ length: 12 }, () => {
                const randomNum = Math.floor(Math.random() * POSSIBLE_POKEMONS + 1);
                return getRandomPokemon(randomNum);
              });
              const pokemonsList = await Promise.all(promisesArray);
                //   setPokemons(pokemonsList);
                dispatch({
                    type: "save-pokemons",
                    data: pokemonsList
                })
              localStorage.setItem("pokemonsData", JSON.stringify(pokemonsList));
      
            } catch (err) {
              console.error(err);
            };
    
          };
        };
        getPokemons();
      
      }, []);


    return {
        gameState,
        onCardClick
    }
};

export default useGameRules;