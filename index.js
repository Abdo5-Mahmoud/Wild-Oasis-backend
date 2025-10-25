import express from "express";
import dotenv from "dotenv";
import path from "node:path";
import { bootStrap } from "./src/app.controller.js";

dotenv.config({ path: path.resolve("./src/config/.env.dev") }, { quite: true });

const app = express();
const PORT = process.env.PORT || 3000;

bootStrap({ app, express });

const httpServer = app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
