import { connection, disconnect } from 'mongoose';
import cuid from 'cuid';
import _ from 'lodash';
import Contact from './src/resources/contact/contact.model';
import connectDB from './src/db/mongoose';

const mongoUrl = process.env.TEST_MONGO_DB || 'mongodb://localhost:27017/test';

const remove = (collection) => collection.deleteMany();
const clearDB = () => Promise.all(_.map(connection.collections, (collection) => remove(collection)));

beforeEach(async () => {
  const db = cuid();
  if (!connection.readyState) {    
    await connectDB(mongoUrl + db);
    await clearDB();
    await Contact.init();
  } else {
    await clearDB();
  }
});

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(async () => {  
  await disconnect();
});
