// const notes = require("../data/notes");
const Note = require("../db/models/Note");

const getNotes = async () => {
  const notes = await Note.find({});
  return notes;
};

module.exports = { getNotes };
