import httpMocks from 'node-mocks-http';
import * as service from './contact.service';
import * as controller from './contact.controller';
import mockContacts from '../../__mocks__/contacts';

jest.mock('./contact.service');

const newContact = {
  _id: '111111',
  name: 'new-mock',
  company: 'new-mock-company',
  email: 'new-mock@email.com',
  birth_date: '2019-01-20T00:00:00.000Z',
  personal_phone_number: '3100000000',
  work_phone_number: '45456456',
  address: 'Carrera 50 # 10 - 12, Bogota',
};

let req;
let res;
let next;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = null;
});

describe('contact.controller', () => {
  describe('get', () => {
    it('Given a contact when it is requested by id, it should be retrieved', async () => {
      service.get.mockResolvedValue(mockContacts[0]);

      await controller.get(req, res);

      expect(res.statusCode).toBe(200);
      expect(res._isJSON()).toBeTruthy();
      expect(res._getJSONData()).toStrictEqual(mockContacts[0]);
    });
  });

  describe('save', () => {
    it('Given a data of a contact, when save is called, it should save it properly', async () => {
      req.body = newContact;
      req.file = [{ originalname: 'sample.name', mimetype: 'sample.type', path: 'sample.url' }];
      service.save.mockResolvedValue(newContact);

      await controller.save(req, res);

      expect(res.statusCode).toBe(200);
      expect(res._isJSON()).toBeTruthy();
      expect(res._getJSONData()).toStrictEqual(newContact);
    });

    it('Given a data of a contact without image, when save is called, it should throw an error', async () => {
      const error = 'You must upload a profile_image';
      req.body = newContact;
      service.save.mockResolvedValue(newContact);

      await expect(controller.save(req, res)).rejects.toThrowError(error);
    });
  });
});
