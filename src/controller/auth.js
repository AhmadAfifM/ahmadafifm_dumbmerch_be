const { user } = require("../../models");

const Joi = require("joi");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const env = require("../../config/env");

exports.register = async (req, res) => {
  // Take username, email and password
  const schema = Joi.object({
    username: Joi.string().min(5).required(),
    email: Joi.string().email().min(6).required(),
    password: Joi.string().min(6).required(),
    re_password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).send({
      error: {
        message: error.details[0].message,
      },
    });
  }

  try {
    // FITUR RE-CHECK PASSWORD
    if (req.body.password != req.body.re_password) {
      return res.send({
        status: "Failed!",
        message: "Recheck Password Doesn't Match!",
      });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = await user.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      status: "customer",
    });

    const token = jwt.sign({ id: user.id }, env.TOKEN_KEY);

    res.status(200).send({
      status: "Success",
      message: `Resgister user ${req.body.username} success!`,
      data: {
        username: newUser.username,
        email: newUser.email,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "Failed!",
      message: "Server Error!",
    });
  }
};

exports.login = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().email().min(6).required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).send({
      error: {
        message: error.details[0].message,
      },
    });
  }

  try {
    const userExist = await user.findOne({
      where: {
        email: req.body.email,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    const isValid = await bcrypt.compare(req.body.password, userExist.password);

    if (!isValid) {
      return res.status(400).send({
        status: "Failed",
        message: "Credential is INVALID!",
      });
    }

    const token = jwt.sign({ id: userExist.id }, env.TOKEN_KEY);

    res.status(200).send({
      status: "Success!",
      message: `Register User ${userExist.username} SUCCESS!`,
      data: {
        username: userExist.username,
        email: userExist.email,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "Failed!",
      message: "Server Error!",
    });
  }
};
