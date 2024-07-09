import express from 'express';
import movieRoutes from './routes/movieRoutes';
import { AppDataSource } from './database';
import * as dotenv from 'dotenv';
import 'reflect-metadata';


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', movieRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
