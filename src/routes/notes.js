const { Router } = require("express");
const {
  getNotes,
  postNote,
  getNoteById,
  deleNoteById,
  modifyNoteById,
} = require("../controllers/notes");
const handleError = require("./error/handleError");
const Sentry = require("@sentry/node");
const jwt = require("jsonwebtoken");

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
  } catch (next) {
    next(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      content,
      important = false,
      // userId //este userId ya no es necesario con esta autenticaction y authorization. porque ya se sabe que el usuario que esta creando la nota es el que esta autorizado. aparte que se obtiene el id del usuario desde el token
    } = req.body;
    // const {content, important=false, userId} = req.body; este important es el valor por defecto si no se envia nada

    const autorization = req.get("authorization");
    let token = null;
    console.log("autorization", autorization);

    if (autorization && autorization.toLowerCase().startsWith("bearer ")) {
      token = autorization.substring(7);
    }

    console.log("token", token);

    const decodedToken = jwt.verify(token, process.env.SECRET);

    console.log("decodedToken", decodedToken);

    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: "token missing or invalid" });
    }

    const { id: userId } = decodedToken;

    const note = await postNote(content, important, userId);
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
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

// The error handler must be before any other error middleware and after all controllers
router.use(Sentry.Handlers.errorHandler());
router.use(handleError);

module.exports = router;
