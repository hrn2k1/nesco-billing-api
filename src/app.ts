import express, { NextFunction, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import { RegisterRoutes } from './routes';
import swaggerDocument from './swagger.json';

const app = express();
app.use(express.json());

const swaggerOptions = {
  explorer: true,
  customSiteTitle: 'NESCO API Docs',
  swaggerOptions: {
    url: '/api-docs.json'
  }
};

app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument, swaggerOptions));
app.get('/docs', swaggerUi.setup(swaggerDocument, swaggerOptions));
app.get('/api-docs.json', (_request: Request, response: Response) => {
  response.json(swaggerDocument);
});

const apiRouter = express.Router();
RegisterRoutes(apiRouter);
app.use('/api', apiRouter);

app.use((error: Error, _request: Request, response: Response, _next: NextFunction) => {
  response.status(response.statusCode >= 400 ? response.statusCode : 500).json({
    message: error.message || 'Internal server error'
  });
});

const port = Number(process.env.PORT ?? 2000);
if (require.main === module) {
  app.listen(port, () => {
    console.log(`NESCO API listening on port ${port}`);
  });
}

export default app;
export { app };
