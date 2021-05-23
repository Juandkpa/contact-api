import Contact from "./contact.model";
import { BadRequestError, NotFoundError } from "../../utils/errorHandler";
import { unlink } from 'fs';

const log = (action) => {
  console.log("performing ", action);
};
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
    throw new BadRequestError("Contact already exists");
  }

  const imageUrl = `${url}/images/${filename}`;

  return Contact.create({ ...body, profile_image: imageUrl });
};

const update = async (id, body, file, url) => {
    const contact = await get(id);
  
  
  //TODO: file managemnet
  if (file) {
      //update image in db
      const imageUrl = `${url}/images/${file.filename}`;
      body.profile_image = imageUrl;
      console.log('file path:::', file.path);
      //delete previous image;
      const prevImage = contact.profile_image.replace(url, '');      
      unlink(`public/${prevImage}`, (err) => {
          if (err) {
              return console.log('something went wrong removing previous image');
          }
          console.log('previous image removed');
      })
  }
    
    contact.set(body);
  return contact.save();
};

const remove = async (id, url) => {
  const contact = await Contact.findOneAndDelete({_id: id})

  if(!contact) {
      throw new NotFoundError(`Contact with id ${id} not found`);
  }

  const prevImage = contact.profile_image.replace(url, '');      
    unlink(`public/${prevImage}`, (err) => {
        if (err) {
            return console.log('something went wrong removing previous image');
        }
        console.log('previous image removed');
    });
    return contact;
};

export { get, save, update, remove };
