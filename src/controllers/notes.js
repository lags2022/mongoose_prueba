// const notes = require("../data/notes");
const Note = require("../db/models/Note");

const getNotes = async () => {
  const notes = await Note.find({});
  return notes;
};

const postNote = async (note) => {
  const newNote = new Note({
    content: note.content,
    date: new Date(),
    important: note.important || false,
  });
  const savedNote = await newNote.save();
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

module.exports = { getNotes, postNote, getNoteById, deleNoteById,modifyNoteById };
