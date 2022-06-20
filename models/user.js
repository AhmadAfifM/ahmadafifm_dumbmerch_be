"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // HASONE dari ORANG TUA ke ANAK (TIDAK BISA SEBALIKNYA)
      user.hasOne(models.profile, {
        as: "profile",
        foreignKey: {
          name: "idUser",
        },
      });
      // HASMANY dari ORANG TUA ke ANAK (TIDAK BISA SEBALIKNYA)
      user.hasMany(models.products, {
        as: "userProduct",
        foreignKey: {
          name: "idUser",
        },
      });
      // HASMANY
      user.hasMany(models.transaction, {
        as: "buyerTransactions",
        foreignKey: {
          name: "idBuyer",
        },
      });
      // HASMANY
      user.hasMany(models.transaction, {
        as: "sellerTransactions",
        foreignKey: {
          name: "idSeller",
        },
      });
    }
  }
  user.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      username: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
