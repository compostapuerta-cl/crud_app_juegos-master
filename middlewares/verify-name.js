const Game = require("../models/games");
const User = require("../models/user");

const verifyUserName = async(req,res,next) => {
    const {userName} = req.body;

    const regex = new RegExp(userName,'i')
    
    const user = await User.findOne({userName:regex});

    if(user){
        return res.status(400).json({
            msg:"El nombre de usuario ya existe"
        })
    }

    next();
}

const verifyGameName = async(req,res,next) => {
    const {name} = req.body;

    const regex = new RegExp(name,'i')
    
    const game = await Game.findOne({name:regex});

    if(game){
        return res.status(400).json({
            msg:"El nombre del juego ya existe"
        })
    }

    next();
}

module.exports = {
    verifyUserName,
    verifyGameName
}