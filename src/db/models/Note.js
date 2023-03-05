const { Schema, model } = require("mongoose");

const noteSchema = new Schema({
  content: String,
  date: Date,
  important: Boolean,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});
//esto haria conflicto con las notas creadas anteriormente. por lo que hay que borrar la base de datos y volver a crearlas. sino normal.


noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    //el delete es para que no se muestre en el json. pero es una mala practica
  },
});

const Note = model("Note", noteSchema);

module.exports = Note;
