 
import mongoose from 'mongoose';

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
};

const connectDB = async () => {
    try {
        console.log('connecting DB ...');
        await mongoose.connect(process.env.MONGO_DB, options);
        console.log('connected successfully');
    } catch(err) {
        console.log(err.message);
        process.exit(1);
    }
};

export {connectDB as default};