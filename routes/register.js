const {Router} = require("express");
const {check} = require("express-validator");
const {register,login} = require("../controllers/register");
const { verifyAll } = require("../middlewares/verify-all");
const { verifyUserName } = require("../middlewares/verify-name");

const router = Router();

router.post('/create',[
    verifyUserName,
    check('password','El password debe tener mas de 3 digitos').isLength({min:3}),
    verifyAll,
],register);
router.post('/login',login);


module.exports = router;