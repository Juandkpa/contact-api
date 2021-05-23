import mongoose  from 'mongoose';
const { Schema } = mongoose;

const contactSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    profile_image: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    birth_date: {
        type: Date,
        required: true
    },
    personal_phone_number: {
        type: String,
        required: true
    },
    work_phone_number: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: true
    }
})

const Contact = mongoose.model('Contact', contactSchema);

export { Contact as default };