import * as Service from './contact.service';
import { validationResult } from 'express-validator';
import { BadRequestError, ValidationError } from '../../utils/errorHandler';

const get = async (req, res) => {
  const { id } = req.params;
  const contact = await Service.get(id);

  res.status(200).send(contact);
};

const save = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new ValidationError(errors.array());
  }

  if (!req.file) {
    throw new BadRequestError('You must upload a profile_image');
  }

  const { body, file } = req;
  const url = req.protocol + '://' + req.get('host');
  const contact = await Service.save(body, file, url);

  res.json(contact);
};

const update = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new ValidationError(errors.array());
  }

  const { body, file } = req;
  const { id } = req.params;
  const url = req.protocol + '://' + req.get('host');
  const contact = await Service.update(id, body, file, url);
  res.json(contact);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const url = req.protocol + '://' + req.get('host');
  await Service.remove(id, url);
  res.status(200).send();
};

const getByQuery = async (req, res) => {
  let contacts = [];

  if (req.query.q) {
    contacts = await Service.search(req.query.q);
  } else if (req.query.location) {
    contacts = await Service.getByLocation(req.query.location);
  } else {
    throw new BadRequestError('Please provide a q or place parameter');
  }

  res.json(contacts);
};

export { get, save, update, remove, getByQuery };
