import express, { NextFunction, Request, Response } from 'express';
import { RegisterRoutes } from './routes';
import swaggerDocument from './swagger.json';

const app = express();
app.use(express.json());

const renderSwaggerHtml = (title: string) => `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${title}</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui.min.css" />
      <style>
        html, body { margin: 0; background: #f5f7fb; }
        body { font-family: Arial, sans-serif; }
        #swagger-ui { max-width: 1400px; margin: 20px auto; }
      </style>
    </head>
    <body>
      <div id="swagger-ui"></div>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui-bundle.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui-standalone-preset.min.js"></script>
      <script>
        window.onload = () => {
          SwaggerUIBundle({
            url: '/api-docs.json',
            dom_id: '#swagger-ui',
            deepLinking: true,
            presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
            plugins: [SwaggerUIBundle.plugins.DownloadUrl],
            layout: 'StandaloneLayout',
            persistAuthorization: true
          });
        };
      </script>
    </body>
  </html>
`;

app.get('/api-docs', (_request: Request, response: Response) => {
  response.type('html').send(renderSwaggerHtml('NESCO API Docs'));
});
app.get('/docs', (_request: Request, response: Response) => {
  response.type('html').send(renderSwaggerHtml('NESCO API Docs'));
});
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

const defaultPort = Number(process.env.PORT ?? 2000);

const startServer = (port: number, attempt = 0) => {
  const server = app.listen(port, () => {
    console.log(`NESCO API listening on port ${port}`);
  });

  server.on('error', (error: NodeJS.ErrnoException) => {
    if (error.code === 'EADDRINUSE' && attempt < 10) {
      const nextPort = port + 1;
      console.warn(`Port ${port} is busy, retrying on ${nextPort}`);
      startServer(nextPort, attempt + 1);
      return;
    }

    console.error('Failed to start server:', error);
    process.exit(1);
  });
};

if (require.main === module) {
  startServer(defaultPort);
}

export default app;
export { app };
