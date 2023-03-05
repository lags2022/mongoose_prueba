const User = require("../db/models/User");
const bcrypt = require("bcrypt");
//recomiendo usar async await con bcrypt

const getUsers = async () => {
  const users = await User.find({}).populate("notes", {
    content: 1,
    date: 1,
    // _id: 0, si no se quiere mostrar el id xq se muestra por defecto
  });
  return users;
};

const createUser = async (username, name, password) => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });
  const savedUser = await user.save();
  return savedUser;
};

module.exports = {
  createUser,
  getUsers,
};
