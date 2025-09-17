// Main entry point for Colombian Business Date Calculator API
import express from 'express';
import { businessDateRouter } from './presentation/routes/businessDateRoutes';

const app = express();

app.use(express.json());
app.use('/api', businessDateRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});