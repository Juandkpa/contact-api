import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import express from 'express';
import contactRouter from './resources/contact';
import { developmentErrors, productionErrors } from './middleware/error';
import fileCleaner from './middleware/fileCleaner';

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/api/contacts', contactRouter);

app.use(express.static('public'));

app.use(fileCleaner);

if (app.get('env') === 'development') {
  app.use(developmentErrors);
}

if (app.get('env') === 'production') {
  app.use(productionErrors);
}

export { app as default };
