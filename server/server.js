const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');

const port = 8000;
const app = express();
app.use(express.json(), express.urlencoded({extended:true}), cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:5173'}));


require("./config/mongoose");
require("./routes/user.routes")(app);
require("./routes/connection.routes")(app);
require("./routes/category.routes")(app);
require('dotenv').config();

app.listen(port, () => console.log(`Listening on port: ${port}`));