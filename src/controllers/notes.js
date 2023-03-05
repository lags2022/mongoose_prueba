// const notes = require("../data/notes");
const Note = require("../db/models/Note");
const User = require("../db/models/User");

const getNotes = async () => {
  const notes = await Note.find({}).populate("user", {
    username: 1,
    name: 1,
  });
  return notes;
};

const postNote = async (content, important, userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");
  const newNote = new Note({
    content,
    date: new Date(),
    important,
    user: user._id, //user.toJSON().id,esto se colocar porque se crea antes de setear el id en el modelo
  });
  const savedNote = await newNote.save();
  user.notes = user.notes.concat(savedNote._id);
  await user.save();
  return savedNote;
};

const getNoteById = async (id) => {
  const noteid = await Note.findById(id);
  return noteid;
};

const deleNoteById = async (id) => {
  const noteid = await Note.findByIdAndRemove(id); //findByIdAndDelete
  return noteid;
};

const modifyNoteById = async (id, note) => {
  const newNoteInfo = {
    content: note.content,
    important: note.important,
  };
  const newNoteMod = await Note.findByIdAndUpdate(id, newNoteInfo, {
    new: true,
  });
  return newNoteMod;
};

module.exports = {
  getNotes,
  postNote,
  getNoteById,
  deleNoteById,
  modifyNoteById,
};
