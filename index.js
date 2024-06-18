const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const authRouter = require("./routes/auth.routes");
const fileRouter = require("./routes/file.routes");
const app = express();

const filePathMiddleware = require("./middleware/filePath.middleware");
const path = require('path');
const corsMiddleware = require("./middleware/cors.middleware");
const dotenv = require("dotenv");

dotenv.config();
const PORT  = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL;
const FILE_PATH = process.env.FILE_PATH;
const STATIC_PATH = process.env.STATIC_PATH;

app.use(fileUpload({}))
app.use(filePathMiddleware(path.resolve(__dirname, FILE_PATH)));

app.use(corsMiddleware)

app.use(express.json());
app.use(express.static(path.resolve(__dirname, STATIC_PATH)));
app.use('/api/auth', authRouter);
app.use('/api/files', fileRouter);

mongoose.set("strictQuery", false);

const start = async () => {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser:true,
      useUnifiedTopology:true
    });
    app.listen(PORT, () => {
      console.log('server started on: ', PORT );
    });
  } catch(e) {
    console.log(e);
  }
};

start()

module.exports = app