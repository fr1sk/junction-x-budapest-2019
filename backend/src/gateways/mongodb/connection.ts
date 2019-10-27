import mongoose from 'mongoose';
import constants from 'config/constants';
// import AtmModel from 'gateways/mongodb/models/AtmModel';
// import UserModel from 'gateways/mongodb/models/UserModel';
// import { seedUsers } from 'lib/seedData';

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);

try {
  console.log(`Mongoose URL - ${constants.MONGODB_URL}`);
  mongoose.connect(constants.MONGODB_URL);
} catch (err) {
  mongoose.createConnection(constants.MONGODB_URL);
}

mongoose.connection.once('open', async (): Promise<void> => {
  console.log('Connection with database is established');
  // mongoose.connection.db.dropDatabase();
  // await seedData();
  // await AtmModel.updateMany({}, { $set: { weight: 0.3 } }).exec();
  // await seedUsers();
}).on('error', (e: Error): Error => {
  throw e;
});
