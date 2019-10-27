import swaggerUi from 'swagger-ui-express';
import { specs } from 'config/swagger';
import atmRoutes from './atm';
import transactionRoutes from './transaction';
import userRoutes from './user';

export default (app) => {
  app.get('/', (req, res) => {
    res.send('Hello world');
  });
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

  app.use('/api/atms', atmRoutes);

  app.use('/api/transactions', transactionRoutes);

  app.use('/api/users', userRoutes);
};
