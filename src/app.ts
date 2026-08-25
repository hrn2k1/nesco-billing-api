import express, { NextFunction, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import { RegisterRoutes } from './routes';
import swaggerDocument from './swagger.json';

const app = express();
app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const apiRouter = express.Router();
RegisterRoutes(apiRouter);
app.use('/api', apiRouter);

app.use((error: Error, _request: Request, response: Response, _next: NextFunction) => {
  response.status(response.statusCode >= 400 ? response.statusCode : 500).json({
    message: error.message || 'Internal server error'
  });
});

const port = Number(process.env.PORT ?? 3000);
if (require.main === module) {
  app.listen(port, () => {
    console.log(`NESCO API listening on port ${port}`);
  });
}

export { app };
