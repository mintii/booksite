const express = require("express");
// const path = require("path");

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "/app/view")));

require("./app/controller/apiroutes")(app);
require("./app/controller/htmlroutes")(app);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
