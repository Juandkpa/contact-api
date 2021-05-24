import app from '../../app';
import request from 'supertest';
import Contact from './contact.model';
import mockContacts from '../../__mocks__/contacts';
import path from 'path';

jest.mock('./contact.model');

const newContact = {
  name: 'new-mock',
  company: 'new-mock-company',
  email: 'new-mock@email.com',
  birth_date: '2019-01-20',
  personal_phone_number: '3100000000',
  work_phone_number: '45456456',
  address: 'Carrera 50 # 10 - 12, Bogota',
};

beforeEach(() => {
  Contact.findById.mockImplementation((id) => Promise.resolve(mockContacts.find(({ _id }) => _id === id)));
});

describe('contact.router', () => {
  describe('get', () => {
    it('Given a contacts get endpoint when it is called with an contact id, it should response with that contact', async () => {
      const res = await request(app).get('/api/contacts/123457').send();

      expect(res.statusCode).toBe(200);
      expect(res.body).toStrictEqual(mockContacts[1]);
    });
    
    it("Given a contacts get endpoint when it is called with an contact id that doesn't exists, it should response with error", async () => {
      const res = await request(app).get('/api/contacts/9999').send();

      expect(res.statusCode).toBe(404);
    });
  });

  describe('save', () => {
    it('Given a contacts post endpoint when it is called with all required contact info, it should response with 200 status code and the contact', async () => {
      Contact.create.mockResolvedValue({ _id: '22222', ...newContact });
      Contact.findOne.mockResolvedValue(null);

      const res = await request(app)
        .post('/api/contacts')
        .field('name', 'new-mock')
        .field('company', 'new-mock-company')
        .field('email', 'new-mock@email.com')
        .field('birth_date', '2019-01-20')
        .field('personal_phone_number', '3100000000')
        .field('work_phone_number', '45456456')
        .field('address', 'Carrera 50 # 10 - 12, Bogota')
        .attach('profile_image', path.resolve(__dirname, '../../fixtures/avatar.png'));

      expect(res.statusCode).toBe(200);
      expect(res.body).toMatchObject(newContact);
    });

    it('Given a contacts post endpoint when it is called without all required contact info, it should response with 400 status code', async () => {
      Contact.create.mockResolvedValue({ _id: '33333', ...newContact });
      Contact.findOne.mockResolvedValue(null);

      const res = await request(app)
        .post('/api/contacts')
        .field('name', 'new-mock')
        .field('company', 'new-mock-company')
        .field('address', 'Carrera 50 # 10 - 12, Bogota')
        .attach('profile_image', path.resolve(__dirname, '../../fixtures/avatar.png'));

      expect(res.statusCode).toBe(400);
    });

    it('Given a contacts post endpoint when it is called with an incorrect file format as a profile_image, it should response with 400 status code', async () => {
        Contact.create.mockResolvedValue({ _id: '33333', ...newContact });
        Contact.findOne.mockResolvedValue(null);
  
        const res = await request(app)
          .post('/api/contacts')
          .field('name', 'new-mock')
          .field('company', 'new-mock-company')
          .field('address', 'Carrera 50 # 10 - 12, Bogota')
          .attach('profile_image', path.resolve(__dirname, '../../fixtures/bad.txt'));
  
        expect(res.statusCode).toBe(400);
      });
  });
});
