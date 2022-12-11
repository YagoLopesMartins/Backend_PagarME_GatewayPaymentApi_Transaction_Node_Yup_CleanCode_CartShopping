//import "dotenv/config";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

import app from "./app.js";
// require('dotenv').config()
// const dotenv = require('dotenv')

app.listen(process.env.PORT)
