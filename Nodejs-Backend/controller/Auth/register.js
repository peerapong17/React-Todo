const User = require("../../models/user");
const bcrypt = require("bcrypt");
const authSchema = require("../../validations/auth");

const create_user = async (req, res) => {
  try {
    const { username, email, password } = await authSchema.validateAsync(
      req.body
    );

    const existEmail = await User.findOne({ email });
    if (existEmail) {
      throw new Error("This email is already in-use");
    }

    const existUsername = await User.findOne({ username });
    if (existUsername) {
      throw new Error("This username is already in-use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });
    await newUser.save();
    
    return res.status(200).json({ message: "User successfully created" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

module.exports = create_user;
