const jwt = require("jsonwebtoken");

const generateJWT = (id) => {
    const payload = {
        id
    };

    const secretKey = process.env.SECRET_KEY;

    return new Promise((resolve,reject) => {
        jwt.sign(payload,secretKey,(err,token) => {

            if(err){
                return reject(err);
            }
            
            resolve(token);
        })
    })
}


module.exports = {
    generateJWT
}