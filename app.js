const express = require("express");
const app = express();
const PORT = 5000;
const pokemonRouter = require("./routes/pokemonRouter.js");

app.use((req, res, next) => {
  console.log(`received ${req.method} request to ${req.url}`);
  next();
});
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Original", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json());
app.use(pokemonRouter);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
