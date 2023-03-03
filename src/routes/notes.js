const { Router } = require("express");
const { getNotes } = require("../controllers/notes");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const notes = await getNotes();
    res.status(200).json(notes);
  } catch (error) {
    res.status(400).json({ message: "Something went wrong, try again" });
  }
});

module.exports = router;
