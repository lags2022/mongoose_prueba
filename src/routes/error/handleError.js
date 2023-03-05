const ERROR_HANDLER = {
  CastError: (res) => res.status(400).json({ error: "Malformatted id please" }),
  ValidationError: (res, { message }) =>
    res.status(409).json({ error: message }),
  JsonWebTokenError: (res) =>
    res.status(401).json({ error: "token missing or invalid" }),
  TokenExpiredError: (res) => res.status(401).json({ error: "Token expired" }),
  defaultError: (res) => res.status(500).end(),
};

module.exports = (error, req, res, next) => {
  console.error(error);
  const handler = ERROR_HANDLER[error.name] || ERROR_HANDLER.defaultError;
  handler(res, error);
};
