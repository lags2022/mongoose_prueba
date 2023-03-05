module.exports = (error, req, res, next) => {
  console.error(error);
  if (error.name === "CastError")
    res.status(400).json({ error: "Malformatted id please" });
  // else if (error.name === "ValidationError")
  //   res.status(400).json({ error: error.message });
  // else if (error.name === "JsonWebTokenError")
  //   res.status(401).json({ error: "Invalid token" });
  // else if (error.name === "TokenExpiredError")
  //   res.status(401).json({ error: "Token expired" });
  
  //el 500 es para saber que el error es nuestro
  else res.status(500).json({ error: "Something went wrong, try again ok" });
};
