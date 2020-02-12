// const fs = require("fs");
// const { promisify } = require("util");
const { query } = require("./db/index");

// const readFile = promisify(fs.readFile);
// const writeFile = promisify(fs.writeFile);

async function getPokemon() {
  const pokemon = await query("SELECT * FROM pokemon");
  console.log(pokemon);
  return pokemon.rows;
}

async function getPokemonById(id) {
  const pokemon = await getPokemon();
  return pokemon.find(item => item.pkdx_id == id);
}

async function getPokemonByName(input) {
  const pokemon = await getPokemon();
  return pokemon.find(item => item.name.toLowerCase() == input.toLowerCase());
}

async function getPokemonBySearch(input) {
  const pokemon = await getPokemon();
  const returnedPokemon = pokemon.filter(item =>
    item.name.toLowerCase().includes(input.toLowerCase())
  );
  function compare(a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }
  return returnedPokemon.sort(compare);
}

async function savePokemon(input) {
  const pokemonArray = await getPokemon();
  const newArray = pokemonArray.push(input);
  await writeFile("./pokedex.json", JSON.stringify(newArray));
}

module.exports = {
  getPokemon,
  getPokemonById,
  getPokemonByName,
  getPokemonBySearch,
  savePokemon
};
