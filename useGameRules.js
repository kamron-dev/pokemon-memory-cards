import { useEffect, useReducer } from "react";

function gameDispatcher(state, action) {
    switch (action.type) {
        // save pokemons either from localStorage or fetch
        case "save-pokemons":
            return { ...state, pokemons: action.data };
        
        case "lost-game":
            return {
                ...state,
                status: "lost"
            };
        
        case "won-game":
            return {
                ...state,
                currentScore: 12,
                highScore: 12,
                status: "won"
            };
        
        case "game-goes-on":
            return {
                ...state,
                pokemons: action.pokemonsArray.map(pokemon => {
                    return pokemon.id === action.pressedPokemonId ? { ...pokemon, isPressed: !pokemon.isPressed } : pokemon;
                }),
                currentScore: action.score,
                highScore: Math.max(state.highScore, action.score)
            };
            
        default:
            return state;
        
    }
};

function handleCardShuffle(cards) {
    const copy = [...cards];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
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
                });
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
        const pressedPokemon = gameState.pokemons.find(pokemon => pokemon.id === id);

        if (pressedPokemon.isPressed) {
            // You lost! Display lost message, set status to "lost", create a restart button
            dispatch({
                type: "lost-game"
            });
        } else {
            // init nextScore, check if it equals to 12 ? Display won message, set status to "won", create restart button
            const nextScore = gameState.currentScore + 1;
            if (nextScore === 12) {
                dispatch({
                    type: "won-game"
                });
            } else {
                // toggle pressed pockemon status in gameState, set currentScore and highScore, shuffle cards
                const shuffledPokemons = handleCardShuffle(gameState.pokemons);
                dispatch({
                    type: "game-goes-on",
                    pressedPokemonId: id,
                    score: nextScore,
                    pokemonsArray: shuffledPokemons
                });
            };
        };
        
    };

   
    
    return {
        gameState,
        handleCardClick
    }
};

export default useGameRules;