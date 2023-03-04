module.exports = (error, req, res, next) => {
  console.error(error);
  if (error.name === "CastError") {
    res.status(400).json({ error: "Malformatted id please" });
  } else {
    //el 500 es para saber que el error es nuestro
    res.status(500).json({ error: "Something went wrong, try again ok" });
  }
};
