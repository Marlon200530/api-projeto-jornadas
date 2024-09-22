const express = require("express");
require('dotenv').config();
require("./db/mongoose.js"); //conetar a base dados
const user = require('./routers/users.js');
const exam = require('./routers/exames.js');
const auth = require('./middleware/auth.js');
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(user);
app.use(exam);

app.listen(port, () => {
  console.log("server is starting in port 3000");
});
