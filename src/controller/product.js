const { Op } = require("sequelize");
const { user, products, category, category_product } = require("../../models");
// Get All products
exports.getProducts = async (req, res) => {
  try {
    const search = req.query.search;

    const where = {};
    console.log(search);
    if (search) {
      where[Op.or] = [
        { product_name: { [Op.like]: `%${search}%` } },
        { sku_product: { [Op.like]: `%${search}%` } },
      ];
    }
    let data = await products.findAll({
      where,
      include: [
        {
          model: user,
          as: "user",
        },
        {
          model: category,
          as: "categories",
          through: {
            model: category_product,
            as: "bridge",
          },
        },
      ],
    });

    data = data.map((item) => {
      item.image_product =
        "http://localhost:5006/uploads/" + item.image_product;

      return item;
    });

    res.send({
      status: "Success!",
      message: "Get products Success!",
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "Failed!",
      message: "Server Error",
    });
  }
};

// Get Product Detail
exports.getProduct = async (req, res) => {
  try {
    const { id, product_name } = req.params;
    const data = await products.findOne({
      where: {
        id: id,
        product_name: product_name,
      },
      include: [
        {
          model: user,
          as: "user",
        },
        {
          model: category,
          as: "categories",
          through: {
            model: category_product,
            as: "bridge",
          },
        },
      ],
    });

    if (!data) {
      res.send({
        status: "Failed!",
        message: `Data Product with id: ${id} Not Found!`,
      });
    } else {
      res.send({
        status: "Success!",
        message: `Get product ${data.product_name} Success!`,
        data,
      });
    }
  } catch (error) {
    console.log(error);
    res.send({
      status: "Failed!",
      message: "Server Error",
    });
  }
};

// Add Product
exports.addProduct = async (req, res) => {
  try {
    const data = await products.create({
      ...req.body,
      image_product: req.file.filename,
      idUser: req.user.id,
    });

    res.send({
      status: "Success!",
      message: "Add Product Success!",
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "Failed!",
      message: "Server Error",
    });
  }
};

// Update Product
exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const newData = req.body;

    let data = await products.findOne({
      where: { id },
    });

    if (!data) {
      return res.send({
        status: "Failed!",
        message: `Product with id: ${id} not found!`,
      });
    }

    await products.update(newData, { where: { id: id } });

    data = await products.findOne({
      where: { id },
    });

    res.send({
      status: "Success!",
      message: `Update Product Id: ${id} Success!`,
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "Failed!",
      message: "Server Error",
    });
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await products.findOne({ where: { id } });
    if (!data) {
      return res.send({
        status: "Failed!",
        message: `Product with id: ${id} not found!`,
      });
    }
    await products.destroy({ where: { id: id } });

    res.send({
      status: "Success!",
      message: `Delete Product with Id: ${id} Success!`,
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "Failed!",
      message: "Server Error",
    });
  }
};

exports.getUserProduct = async (req, res) => {
  try {
    const data = await user.findAll({
      include: {
        model: products,
        as: "userProduct",
      },
    });

    res.send({
      status: "Success!",
      message: "Get products Success!",
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "Failed!",
      message: "Server Error",
    });
  }
};
