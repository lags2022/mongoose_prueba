const { Router } = require("express");
const {
  getNotes,
  postNote,
  getNoteById,
  deleNoteById,
  modifyNoteById,
} = require("../controllers/notes");
const handleError = require("./error/handleError");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const notes = await getNotes();
    res.status(200).json(notes);
  } catch (error) {
    res.status(400).json({ message: "Something went wrong, try again" });
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const note = await getNoteById(req.params.id);
    if (!note) return next(error);
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const note = await postNote(req.body);
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ message: "Something went wrong, try again" });
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const note = await deleNoteById(req.params.id);
    if (!note) return next(error);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const note = await modifyNoteById(req.params.id, req.body);
    if (!note) return next(error);
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
});

router.use(handleError);

module.exports = router;