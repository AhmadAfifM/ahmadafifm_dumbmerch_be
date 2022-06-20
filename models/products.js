"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      products.belongsTo(models.user, {
        as: "user",
        foreignKey: {
          name: "idUser",
        },
      });

      products.hasMany(models.transaction, {
        as: "transactions",
        foreignKey: {
          name: "idProduct",
        },
      });

      products.belongsToMany(models.category, {
        as: "categories",
        through: {
          model: "category_product",
          as: "bridge",
        },
        foreignKey: "idProduct",
      });
    }
  }
  products.init(
    {
      product_name: DataTypes.STRING,
      desc_product: DataTypes.TEXT,
      sku_product: DataTypes.STRING,
      price_product: DataTypes.INTEGER,
      qty_product: DataTypes.INTEGER,
      image_product: DataTypes.STRING,
      idUser: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "products",
    }
  );
  return products;
};
