const bcrypt = require("bcrypt");
const User = require("../db/models/User");

const validUser = async (username, password) => {
  const user = await User.findOne({ username });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);
  if (!passwordCorrect) throw new Error("Invalid username or password");
  return user;
};

module.exports = {
  validUser,
};
