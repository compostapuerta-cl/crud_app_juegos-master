const express = require("express");
const cors = require("cors");
require("dotenv").config();

//Locales
require("../database/config");
const gameRouter = require("../routes/games");
const registerRouter = require("../routes/register");
const { swaggerDocs } = require("../swagger");

class Server {
  app = null;
  port = null;
  path = null;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8089;
    this.paths = {
      games: "/api/v1/games",
      register: "/api/v1/register",
    };

    //middlewares
    this.middlewares();

    //routing
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    
    this.app.use(this.paths.games, gameRouter);
    this.app.use(this.paths.register, registerRouter);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server corriendo en el puerto", this.port);
      //Documentacion de la api
      swaggerDocs(this.app);
    });
  }
}

module.exports = Server;
