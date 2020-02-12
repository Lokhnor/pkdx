const express = require("express");
const router = express.Router();
const {
  getPokemon,
  getPokemonById,
  getPokemonByName,
  getPokemonBySearch,
  savePokemon
} = require("./pokemon.js");

router.get("/pokemon", async (req, res) => {
  const { name, id, search } = req.query;
  if (name) {
    const namedPokemon = await getPokemonByName(name);
    res.json(namedPokemon);
    return;
  } else if (id) {
    const idPokemon = await getPokemonById(id);
    res.json(idPokemon);
    return;
  } else if (search) {
    const searchPokemon = await getPokemonBySearch(search);
    res.json(searchPokemon);
  }

  const pokemon = await getPokemon();
  //res.json is express inbuilt function to send an object in json form (ie stringify it)
  res.json(pokemon);
});

router.get("/pokemon/:id", async (req, res) => {
  const { id } = req.params;
  const pokemonId = await getPokemonById(id);
  res.json(pokemonId);
});

router.post("/pokemon", async (req, res) => {
  const { body } = req;
  await savePokemon(body);
  res.json(body);
});

module.exports = router;
