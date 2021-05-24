import Contact from './contact.model';
import { BadRequestError, NotFoundError } from '../../utils/errorHandler';
import { unlink } from 'fs';

const get = async (id) => {
  const contact = await Contact.findById(id);

  if (!contact) {
    throw new NotFoundError(`Contact with id ${id} not found`);
  }
  return contact;
};

const save = async (body, { filename }, url) => {
  const contact = await Contact.findOne({ email: body.email });

  if (contact) {
    throw new BadRequestError('Contact already exists');
  }

  const imageUrl = `${url}/images/${filename}`;

  return Contact.create({ ...body, profile_image: imageUrl });
};

const removeImage = (img) => {
  unlink(`public/${img}`, (err) => {
    if (err) {
      return console.log(err);
    }
    console.log('image removed');
  });
};

const update = async (id, body, file, url) => {
  const contact = await get(id);

  if (file) {
    const imageUrl = `${url}/images/${file.filename}`;
    const prevImage = contact.profile_image.replace(url, '');

    body.profile_image = imageUrl;
    removeImage(prevImage);
  }

  contact.set(body);
  return contact.save();
};

const remove = async (id, url) => {
  const contact = await Contact.findOneAndDelete({ _id: id });

  if (!contact) {
    throw new NotFoundError(`Contact with id ${id} not found`);
  }

  const contactImage = contact.profile_image.replace(url, '');
  removeImage(contactImage);

  return contact;
};

const search = async (q) => {
  const findRegex = { $regex: q, $options: 'i' };
  return Contact.find({
    $or: [{ email: findRegex }, { personal_phone_number: findRegex }, { work_phone_number: findRegex }],
  });
};

const getByLocation = async (location) => {
  return Contact.find({ address: { $regex: location, $options: 'i' } });
};

export { get, save, update, remove, search, getByLocation };
