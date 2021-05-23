import Contact from './contact.model';
import { BadRequestError } from '../../utils/errorHandler';
const log = (action)  => {
    console.log('performing ', action);
}
const get = () => {
    log('get');
}; 

const save = async (body, { filename }, url) => {
    const contact = await Contact.findOne({email: body.email});
    
    if (contact) {
        throw new BadRequestError('Contact already exists');
    }

    const imageUrl = `${url}/images/${filename}`;
    
    return Contact.create({ ...body, profile_image: imageUrl });    
};

const update = () => {
    log('update');
};

const remove = () => {
    log('remove');
};

export { get, save, update, remove };