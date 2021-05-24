import * as service from './contact.service';
import Contact from './contact.model';
import mockContacts from '../../__mocks__/contacts';

jest.mock('./contact.model');

const newContact = {
  name: 'new-mock',
  company: 'new-mock-company',
  email: 'new-mock@email.com',
  birth_date: '2019-01-20T00:00:00.000Z',
  personal_phone_number: '3100000000',
  work_phone_number: '45456456',
  address: 'Carrera 50 # 10 - 12, Bogota',
};

beforeEach(() => {
  Contact.findById.mockImplementation((id) => Promise.resolve(mockContacts.find(({ _id }) => _id === id)));
});

describe('service.controller', () => {
  describe('get', () => {
    it('Given a contact id, when the contact exists, it should be retrieved', async () => {
      const contact = await service.get('123456');

      expect(contact).toStrictEqual(mockContacts[0]);
    });

    it("Given a contact id when the contact doesn't exists, it should throw an error", async () => {
      const id = '393993';
      const error = `Contact with id ${id} not found`;

      await expect(service.get(id)).rejects.toThrowError(error);
    });
  });

  describe('save', () => {
    it('Given a contact information, when all information is correct it should calls create on contact model', async () => {
      Contact.create.mockResolvedValue({ _id: '1111101', ...newContact });
      const image = 'avatar.png';
      const url = 'http://localhost:300';
      const contact = await service.save(newContact, image, url);

      expect(contact).toMatchObject(newContact);
    });

    it('Given a contact information, when a contact with the same email already exists, it shoul throw and error', async () => {
      Contact.findOne.mockResolvedValue({});
      const error = 'Contact already exists';
      const image = 'avatar.png';
      const url = 'http://localhost:300';
      
      await expect(service.save(newContact, image, url)).rejects.toThrowError(error);
    });
  });
});
