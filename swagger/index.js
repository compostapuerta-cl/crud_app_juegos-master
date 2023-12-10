const swaggerUi = require("swagger-ui-express");
const options = require("./openapi.json")


const swaggerDocs = (app) => {
  app.use('/api/v1/docs',swaggerUi.serve,swaggerUi.setup(options));
} 


module.exports = {
  swaggerDocs
}