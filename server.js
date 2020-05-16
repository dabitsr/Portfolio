const express = require("express");
const path = require("path");
const cors = require("cors");
const commentsRoute = require("./routes/comments.route");
const app = express();
const db = require("./db");

//Connect to DB
db();

//Middlewares
app.use(express.json());
app.use(cors());

//Routes
app.use("/comments", commentsRoute);

//Files
app.use(express.static(path.join(__dirname, "public")));

//App listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));
