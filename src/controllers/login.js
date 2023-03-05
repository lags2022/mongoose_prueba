const bcrypt = require("bcrypt");
const User = require("../db/models/User");
const jwt = require("jsonwebtoken");

const validUser = async (username, password) => {
  const user = await User.findOne({ username });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);
  if (!(user && passwordCorrect))
    //por siacaso si el usuario no existe
    throw new Error("Invalid username or password");

  //esto es lo que vamos a guardar en el payload
  const userForToken = {
    id: user._id,
    username: user.username,
  };

  //creamos el token lo firmamos y lo devolvemos. no olvidar la palabra secreta que es la que se usa para firmar el token.
  const token = jwt.sign(userForToken, process.env.SECRET);

  return { name: user.name, username: user.username, token };
};

module.exports = {
  validUser,
};
