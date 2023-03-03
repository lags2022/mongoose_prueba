const mongoose = require("mongoose");
require("dotenv").config();

// const { DB_USER, DB_PASSWORD } = process.env;

const connectionString = process.env.MONGODB_URI;

//conexion a mongodb
//mongoose devuelve una promesa, por eso usamos then y catch

// mongoose.connect(connectionString).then(()=>{
//     console.log("conectado a la base de datos")
// }).catch((err)=>{
//     console.log(err)
// })

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("conectado a la base de datos");
  })
  .catch((err) => {
    console.log(err);
  });





//definir el esquema de la base de datos

// //el id nos lo va crear mongo
// const noteSchema = new Schema({
//   content: String,
//   date: Date,
//   important: Boolean,
// });

// //convertir el esquema en un modelo
// //el modelo es una clase que nos va a permitir interactuar con la base de datos
// //el 'Note' tiene que estar en singular, ya mongo lo va a convertir en plural
// //el esquema es a nivel de codigo, el modelo es a nivel de base de datos
// const Note = model("Note", noteSchema);

// // //find({}) es para buscar todos los documentos
// // Note.find({}).then((result) => {
// //   console.log(result);
// //   mongoose.connection.close();
// // });

// //ahora creamos una instancia de la clase Note
// const note = new Note({
//   content: "mongo es genial",
//   date: new Date(),
//   important: true,
// });

// //guardamos la instancia en la base de datos
// note
//   .save()
//   .then((result) => {
//     console.log(result);
//     //una buena practica es cerrar la conexion a la base de datos mongoose
//     mongoose.connection.close();
//   })
//   .catch((err) => {
//     console.log(err);
//   });
