const { Router } = require("express");
const { validUser } = require("../controllers/login");
// const handleError = require("./error/handleError");
// const Sentry = require("@sentry/node");

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await validUser(username, password);
    res.status(200).json({ name: user.name, username: user.username });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

// router.use(Sentry.Handlers.errorHandler());
// router.use(handleError);

module.exports = router;
