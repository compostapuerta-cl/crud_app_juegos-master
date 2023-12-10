const {request,response} = require("express");
const Game = require("../models/games");

const getAllGames = async (req = request,res = response) => {
    const [games,total] = await Promise.all([
        Game.find({}).populate('user','userName'),
        Game.countDocuments()
    ])

    res.json({
        ok:true,
        total,
        games
    })
}

const getById = async (req = request, res = response) => {
    const {id} = req.params;
    const game = await Game.findById(id).populate('user','userName');

    res.json({
        ok:true,
        game
    })
}

const createGame = async (req = request,res = response) => {
    const {name,gender} = req.body;

    //Generar datos
    const data = {
        name,
        gender,
        user:req.userAuth
    }

    // //Guardar en base de datos
    const game = new Game(data);
    await game.save();

    res.json({
        ok:true,
        name,
        gender
    })
}

const updateGame = async (req = request, res = response) => {
    const {id} = req.params;
    const {...rest} = req.body;

    const game = await Game.findByIdAndUpdate(id,rest,{new:true});

    res.json({
        ok:true,
        game
    })
    
}

const deleteGame = async (req = request, res = response) => {
    const {id} = req.params;

    await Game.findByIdAndDelete(id);

    res.json({
        ok:true,
        msg:"Borrado exitosamente"
    })
}

module.exports = {
    createGame,
    deleteGame,
    getAllGames,
    getById,
    updateGame
}