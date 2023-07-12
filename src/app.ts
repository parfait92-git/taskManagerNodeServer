import addTask from "./routes/addTask";
import getTask from "./routes/getTaskBasId";
import provideToken from "./routes/getToken";
import getUserByPk from "./routes/getUserById";
import getToken from "./routes/getuserToken";
import listTask from "./routes/listTask";
import authenticateUser from "./routes/login";
import logout from "./routes/logout";
import register from "./routes/register";
import removeTask from "./routes/removeTask";
import destroyToken from "./routes/triggers/verify.token";
import updateTask from "./routes/updateTask";
import updateUser from "./routes/updateUser";

const express = require("express");
const favIcon = require("serve-favicon");
const bodyParser = require("body-parser");
const { initDb } = require("./bd/sequilize");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;
require('dotenv').config();

app
  .use(favIcon(__dirname + "/resources/favicon.ico"))
  .use(bodyParser.json())
  .use(cors());

app.get("/", (req: any, res: any) => {
  res.json("hello, Heroku app");
});

initDb();
authenticateUser(app);
register(app);
logout(app);
addTask(app);
updateTask(app);
removeTask(app);
listTask(app);
getTask(app);
updateUser(app);
getToken(app);
getUserByPk(app);
provideToken(app);
const server = app.listen(port, () =>
  console.log(
    `Notre application Node est demarrée sur : http://localhost:${port}`
  )
);

module.exports = server;
