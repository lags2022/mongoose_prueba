const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const autorization = req.get("authorization");
  let token = null;
  if (autorization && autorization.toLowerCase().startsWith("bearer "))
    token = autorization.substring(7);

  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: "token missing or invalid" });
  }

  const { id: userId } = decodedToken;
  req.userId = userId; //USANDO EL MIDDLEWARE, SE AGREGA EL USERID AL REQUEST

  next(); //para que continue con la siguiente funcion
};
