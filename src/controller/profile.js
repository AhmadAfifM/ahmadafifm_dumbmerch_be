const { user, profile } = require("../../models");

exports.addProfile = async (req, res) => {
  try {
    const data = await profile.create({
      ...req.body,
      image_profile: req.file.filename,
    });

    res.send({
      status: "Success!",
      message: "Add Profile Success!",
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
