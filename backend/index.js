import express from "express";
import apiRoute from "./routes/index.js";
import config from "./.config.js";
import appwriteSetup from "./appwriteSetup.js";

import cors from "cors";

const app = express();
app.use(cors());

const { PORT } = config;

const appwriteVariables = appwriteSetup(config);
app.locals = { ...app.locals, ...appwriteVariables, config };

app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use("/api", apiRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
