import swaggerUi from 'swagger-ui-express';
import { specs } from 'config/swagger';
import atmRoutes from './atm';
import transactionRoutes from './transaction';

export default (app) => {
  app.get('/', (req, res) => {
    res.send('Hello world');
  });
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

  app.use('/api/atms', atmRoutes);

  app.use('/api/transactions', transactionRoutes);
};
