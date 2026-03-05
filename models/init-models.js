var DataTypes = require("sequelize").DataTypes;
var _category = require("./category");
var _product = require("./product");
var _sequelizemetum = require("./sequelizemetum");

function initModels(sequelize) {
  var category = _category(sequelize, DataTypes);
  var product = _product(sequelize, DataTypes);
  var sequelizemetum = _sequelizemetum(sequelize, DataTypes);

  product.belongsTo(category, { as: "category", foreignKey: "categoryId"});
  category.hasMany(product, { as: "products", foreignKey: "categoryId"});

  return {
    category,
    product,
    sequelizemetum,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
