import serverless from 'serverless-http';
import express from 'express';
import { businessDateRouter } from './presentation/routes/businessDateRoutes';

const app = express();
app.use(express.json());
app.use('/api', businessDateRouter);

// For local development
if (require.main === module) {
  const PORT = process.env.PORT || 3002;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export for Lambda
export const handler = serverless(app);
