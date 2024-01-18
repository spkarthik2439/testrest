require("dotenv").config();
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const morgan = require("morgan");

const hpbooks = require("./routes/hpbooks.js");
const home = require("./routes/home.js");
const middleware = require("./middleware/middleware.js");

app.use(bodyparser.json());
app.use("/api/hpbooks", hpbooks);
app.use("/", home);
app.use(morgan("tiny"));
app.use(middleware.log);
app.use(middleware.authorization);

app.set("view engine", "pug");

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`The application is listening on the port:${port}`);
});


 