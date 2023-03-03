const { Schema, model } = require("mongoose");

const noteSchema = new Schema({
    content: String,
    date: Date,
    important: Boolean,
  });
  
noteSchema.set("toJSON", {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id
      delete returnedObject._id
      delete returnedObject.__v
      //el delete es para que no se muestre en el json. pero es una mala practica
    },
  });


const Note = model("Note", noteSchema);
  
module.exports = Note;