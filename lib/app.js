import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import entriesController from './controllers/entries.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors({
  origin: true,
  credentials: true
}));

app.use('/api/v1/alchemy-cry-lab', entriesController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
