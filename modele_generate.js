const SequelizeAuto = require('sequelize-auto');
const config = require("./config/config")
const auto = new SequelizeAuto(config.development.database, config.development.username, config.development.password, {
    host: config.development.host,
    dialect: config.development.dialect,
    directory: './models', 
    port: config.development.port,
    caseModel: 'c', 
    caseFile: 'c', 
    singularize: true, 
    additional: {
        timestamps: true,
    },
})  

auto.run().then(data => {
    console.log("Models generated successfully!");
}).catch(err => {
    console.error("Error generating models:", err);
});