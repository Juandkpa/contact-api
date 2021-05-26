import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import contactRouter from './resources/contact';
import errorMiddleware from './middleware/error';
import fileCleaner from './middleware/fileCleaner';

const app = express();
const swaggerDocument = YAML.load('./swagger.yaml');

app.use(
  cors({
    credentials: true,
  })
);

app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/api/contacts', contactRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.static('public'));

app.use(fileCleaner);
app.use(errorMiddleware);

export { app as default };
