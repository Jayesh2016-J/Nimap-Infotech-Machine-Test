'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.createTable('Product',{
    id:{
      type:Sequelize.INTEGER,
      autoIncrement:true,
      primaryKey:true
    },
    categoryId:{
      type:Sequelize.INTEGER,
      allowNull:false,
      references:{
        model:'Category',
        key:'id'
      },
    },
    name:{
      type:Sequelize.STRING,
      allowNull:false
     },
     price:{
      type:Sequelize.FLOAT,
      allowNull:false
     },
     createdAt:{
      type:Sequelize.DATE,
      allowNull:false
      },
     updatedAt:{
        type:Sequelize.DATE,
        allowNull:false
       }
   })
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.dropTable('Product')
  }
};
