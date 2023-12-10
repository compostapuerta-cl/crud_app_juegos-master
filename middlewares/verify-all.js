const {validationResult} = require("express-validator");

const verifyAll = (req,res,next) => {
    const err = validationResult(req);

    if(!err.isEmpty()){
        return res.status(400).json(err)
    }

    next();
}


module.exports = {
    verifyAll
}