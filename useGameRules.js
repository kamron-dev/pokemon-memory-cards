import { useEffect, useReducer } from "react";

function gameDispatcher(state, action) {
    switch (action.type) {
        // save pokemons either from localStorage or fetch
        case "save-pokemons":
            return { ...state, pokemons: action.data };
        
        case "card-clicked":
            {
                const pressedPokemon = state.pokemons.find(pokemon => pokemon.id === action.pressedId);
    
                if (pressedPokemon.isPressed) {
                    return {
                        ...state,
                        status: "lost"
                    }
                } else {
                    return {
                        ...state,
                        pokemons: state.pokemons.map(pokemon => {
                            return pokemon.id === pressedPokemon.id ? { ...pokemon, isPressed: !pokemon.isPressed } : pokemon;
                        }),
                        currentScore: state.currentScore + 1,
                        highScore: Math.max(state.currentScore, state.highScore)
                    }
                }

            }
           
            
        
        default:
            return state;
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
        highScore: 0,
        status: "playing"
    });

    useEffect(() => {
        async function getPokemons() {
            const cached = localStorage.getItem("pokemonsData");
            if (cached) {
                dispatch({
                    type: "save-pokemons",
                    data: JSON.parse(cached)
                })
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

            }
    
          
        };
        getPokemons();
      
      }, []);

    function handleCardClick(id) {
        dispatch({
            type: "card-clicked",
            pressedId: id
        });
        
    }
    
    return {
        gameState,
        handleCardClick
    }
};

export default useGameRules;