var axios = require('axios');

const BASE_URL = "https://pokeapi.co/api/v2/pokemon"

function getPokemonByName(name) {
    return axios.get(`${BASE_URL}/${name}`).then((response) => parsePokemonToResponse(response.data))
}

function parsePokemonToResponse(pokemon) {
    return {
        id: pokemon.id,
        name: pokemon.name,
        sprites: {
            back_default: pokemon.sprites.back_default,
            front_default: pokemon.sprites.front_default,
        },
        types: pokemon.types,
        past_types: pokemon.past_types
    }
}

module.exports = getPokemonByName