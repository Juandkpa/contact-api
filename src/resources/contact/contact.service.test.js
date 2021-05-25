import * as service from './contact.service';
import Contact from './contact.model';
import { Types } from 'mongoose';

const newContact = {
  name: 'new-mock',
  company: 'new-mock-company',
  email: 'new-mock@email.com',

  personal_phone_number: '3100000000',
  work_phone_number: '45456456',
  address: 'Carrera 50 # 10 - 12, Bogota',
};

describe('contact.service', () => {
  describe('get', () => {
    it('Given a contact id, when the contact exists, it should be retrieved', async () => {
      const createdContact = await Contact.create({
        ...newContact,
        birth_date: '2019-01-20',
        profile_image: 'http://localhost/images/img.jpg',
      });
      const contact = await service.get(createdContact._id);

      expect(contact).toMatchObject(newContact);
    });

    it("Given a contact id when the contact doesn't exists, it should throw an error", async () => {
      const id = Types.ObjectId();
      const error = `Contact with id ${id} not found`;

      await expect(service.get(id)).rejects.toThrowError(error);
    });
  });

  describe('save', () => {
    it('Given a contact information, when all information is correct it should create a contact', async () => {      
      const image = 'avatar.png';
      const url = 'http://localhost:3000';
      const contact = await service.save({ ...newContact, birth_date: '2019-01-20' }, image, url);

      expect(contact).toMatchObject(newContact);
    });

    it('Given a contact information, when a contact with the same email already exists, it shoul throw and error', async () => {
      await Contact.create({
        ...newContact,
        birth_date: '2019-01-20',
        profile_image: 'http://localhost/images/img.jpg',
      });
      const error = 'Contact already exists';
      const image = 'avatar.png';
      const url = 'http://localhost:300';

      await expect(service.save(newContact, image, url)).rejects.toThrowError(error);
    });
  });
});
