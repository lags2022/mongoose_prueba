const router = require("express").Router();
const { createUser, getUsers } = require("../controllers/users");
const handleError = require("./error/handleError");
const Sentry = require("@sentry/node");

router.get("/", async (req, res) => {
  try {
    const users = await getUsers();
    res.status(201).json(users);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { username, name, password } = req.body;
    const userpost = await createUser(username, name, password);
    res.status(201).json(userpost);
  } catch (error) {
    next(error);
  }
});

router.use(Sentry.Handlers.errorHandler());
router.use(handleError);

module.exports = router;
