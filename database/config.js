const mongoose = require("mongoose");

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_LOCAL)
    .then(console.log("Conectado exitosamente a la base de datos"))
    .catch(err => console.log("Ha ocurrido el siguiente error: ", err))

