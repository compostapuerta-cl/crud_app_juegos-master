const jwt = require("jsonwebtoken");
const { request, response } = require("express");

const verifyJWT = (req = request,res = response, next) => {
    const secretKey = process.env.SECRET_KEY;
    const token = req.header("x-token");

    if(!token){
        return res.status(401).json({
            msg:"No hay token en la peticion"
        })
    }
   
    try{
        const {id} = jwt.verify(token,secretKey);

        req.userAuth = id;

        next();


    }catch(err){
        return res.status(401).json({
            msg:"Token no valido"
        })
    }
}


module.exports = {
    verifyJWT
}