// const fs = require("fs");
// const { promisify } = require("util");
const { query } = require("../db/index");

// const readFile = promisify(fs.readFile);
// const writeFile = promisify(fs.writeFile);

async function getPokemon() {
  const pokemon = await query("SELECT * FROM pokemon");
  console.log(pokemon);
  return pokemon.rows;
}

async function getPokemonById(id) {
  const pokemon = await query(`SELECT * FROM pokemon WHERE pkdx_id = $1`, [id]);
  return pokemon.rows[0];
}

async function getPokemonByName(input) {
  const pokemon = await query(
    `SELECT * FROM pokemon WHERE name ILIKE '%' || $1 || '%'`,
    [input]
  );
  return pokemon.rows[0];
}

async function getPokemonBySearch(input) {
  const pokemon = await query(
    `SELECT * FROM pokemon WHERE name ILIKE '%' || $1 || '%'`,
    [input]
  );
  const returnedPokemon = pokemon.rows;

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

async function savePokemon(pokemon) {
  const { pkdx_id, name, description, img_url, types, evolutions } = pokemon;
  const pokemonArray = await query(
    `INSERT INTO pokemon (pkdx_id, name, description, img_url, types, evolutions) VALUES ($1,$2,$3,$4,$5,$6)`,
    [pkdx_id, name, description, img_url, types, evolutions]
  );
  console.log(pokemonArray);
  return pokemonArray;
}

async function deletePokemonById(id) {
  const res = await query(
    `DELETE FROM pokemon WHERE pkdx_id = $1 RETURNING name`,
    [id]
  );
  const { name } = res.rows[0];
  console.log(res);
  return name;
}

async function editPokemonByName(name, updateName) {
  const res = await query(`UPDATE pokemon SET name = $1 WHERE name = $2 `, [
    name,
    updateName
  ]);
  return res;
}

module.exports = {
  getPokemon,
  getPokemonById,
  getPokemonByName,
  getPokemonBySearch,
  savePokemon,
  deletePokemonById,
  editPokemonByName
};
