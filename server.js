const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const open = require("open");
const verif = require("./js/whatCard");

const app = express();
const PORT = process.env.PORT || 3001;

// parse application/json
app.use(bodyParser.json());

app.use("/", express.static(path.join(__dirname, "public")));

app.post("/card", (request, response) => {
  response.send(verif(request.body?.number)); // echo the result back
});

app.listen(PORT, () => {
  console.log(`Your page is on http://localhost:${PORT}`);
});
