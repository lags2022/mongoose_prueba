//seguda solucin para conectarse
require("./db/index_mongoose");
const express = require("express");
const cors = require("cors");
const Notes = require("./routes/notes");
const notFound = require("./routes/error/notFound");
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");

// //primera solucin para conectarse
// const connectDB = require("./db/index_mongoose");
// connectDB()

const app = express();

app.use(express.json());
app.use(cors());
app.use("/images", express.static("src/images"));

Sentry.init({
  dsn: "https://963108f3649c4003b32c0331aec32e93@o4504781543112704.ingest.sentry.io/4504781544292352",
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app }),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

app.use("/api/notes", Notes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(notFound);
// // The error handler must be before any other error middleware and after all controllers
// app.use(Sentry.Handlers.errorHandler());

module.exports = app;
