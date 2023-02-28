const User = require("../model/UserModel");
const bcrypt = require("bcryptjs");
const { SendMail } = require("./MailController");

// Register
exports.PostRegister = async (req, res) => {
  // Getting the req body
  const { name, email, password, password_confirmation } = req.body;
  const errors = {};

  // Email Validation
  if (!email) {
    errors.email = "Email is required";
  } else {
    const user = await User.findOne({ email });
    if (user) {
      errors.email = "Email already exists";
    }
  }
  // Password Validation
  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters long";
  } else if (password !== password_confirmation) {
    errors.password_confirmation = "Password and confirmation do not match";
  }

  // Name Validation
  if (!name) {
    errors.name = "Name is required";
  }
  if (Object.keys(errors).length > 0) {
    return res.status(400).send(errors);
  }
  // Hashing The Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();
    const userId = user._id;
    await SendMail(req, res, user)
    return res.status(201).send({
      message: "User successfully created",
      data: { id: userId, name, email },
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
