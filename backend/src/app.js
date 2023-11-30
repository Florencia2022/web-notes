import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import morgan from "morgan";
import errorHandler from "./utils/errorHandler.js";
import setHeaders from "./utils/setHeaders.js";
import router from "./routes/index.js";

const app = express();

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(setHeaders);

app.use("/", router);

app.use(errorHandler);

export default app;
