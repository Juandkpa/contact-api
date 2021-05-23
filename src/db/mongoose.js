import { connection, connect } from 'mongoose';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

const connectDB = async () => {
  connection.on('connected', () => {
    console.log('mongo connected successfully');
  });
  connection.on('error', (err) => {
    console.log('mongo error in connection', err);
  });

  try {
    await connect(process.env.MONGO_DB, options);    
  } catch (err) {
    console.log(err.message);    
  }
};

export { connectDB as default };
