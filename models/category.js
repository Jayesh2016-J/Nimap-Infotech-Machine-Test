const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const category = sequelize.define('category', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'category',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });

  category.associate = (models) => {
    category.hasMany(models.product, { as: "products", foreignKey: "categoryId"});
  };

  return category;
};
