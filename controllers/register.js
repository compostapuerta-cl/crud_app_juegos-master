const { request, response } = require("express");
const bcryptjs = require("bcryptjs");
const { generateJWT } = require("../helpers/generate-JWT");
const User = require("../models/user");


const register = async (req = request, res = response) => {
    const { userName, password } = req.body;

    const salt = bcryptjs.genSaltSync();
    const hashPassword = bcryptjs.hashSync(password, salt);

    const user = new User({ userName, password });
    user.password = hashPassword;
    await user.save();

    const token = await generateJWT(user._id);

    res.json({
        ok: true,
        token,
        user
    })
}


const login = async (req = request, res = response) => {
    const { userName, password } = req.body;

    //Verificar si existe el usuario en la base de datos
    const user = await User.findOne({ userName });

    if (!user) {
        return res.status(401).json("Usuario incorrecto")
    }

    //Verificar password
    const isPassword = bcryptjs.compareSync(password, user.password);

    if (!isPassword) {
        return res.status(401).json("Password incorrecto")
    }
    const token = await generateJWT(user._id);

    res.json({
        ok: true,
        token

    })
}


module.exports = {
    register,
    login
}