import { json, urlencoded } from "body-parser";
import cors from "cors";
import express from "express";
import contactRouter from './resources/contact';

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/api/contact', contactRouter);

export { app as default };