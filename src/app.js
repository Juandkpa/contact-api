import { json, urlencoded } from "body-parser";
import cors from "cors";
import express from "express";
import contactRouter from './resources/contact';
import connectDB from './db/mongoose';
import { developmentErrors, productionErrors } from './middleware/error';

const app = express();

connectDB();

app.use(
  cors({
    credentials: true,
  })
);

app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/api/contact', contactRouter);

app.use(express.static('public'));

if (app.get("env") === "development") {
  app.use(developmentErrors);
}

if (app.get("env") === "production") {
  app.use(productionErrors);
}


export { app as default };