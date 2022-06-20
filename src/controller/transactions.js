const { user, transaction, product } = require("../../models");

exports.getTransactions = async (req, res) => {
  try {
    const data = await transaction.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "idBuyer", "idSeller", "idProduct"],
      },
      include: [
        {
          model: product,
          as: "product",
          attributes: {
            exclude: ["createdAt", "updatedAt", "idUser", "qty", "price"],
          },
        },
        {
          model: buyer,
          as: "buyer",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password", "status"],
          },
        },
        {
          model: seller,
          as: "seller",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password", "status"],
          },
        },
      ],
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "Failed!",
      message: "Server Error!",
    });
  }
};

exports.addTransaction = async (req, res) => {
  try {
    const data = await transaction.create(req.body);

    res.send({
      status: "Success!",
      message: "Add Transaction Success!",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "Failed!",
      message: "Server Error!",
    });
  }
};
