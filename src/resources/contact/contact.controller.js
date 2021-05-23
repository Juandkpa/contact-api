import * as Service from "./contact.service";
import { validationResult } from 'express-validator';
import { BadRequestError, ValidationError } from '../../utils/errorHandler';

const get = async (req, res) => {
  const { id } = req.params;
  const contact = await Service.get(id);

  res.send(contact);
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
  const url = req.protocol + "://" + req.get("host");
  const contact = await Service.save(body, file, url);  

  res.status(200).send(contact);
};

const update = async (req, res) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    throw new ValidationError(errors.array());    
  }
  
  const { body, file } = req;
  const { id } = req.params;
  const url = req.protocol + "://" + req.get("host");
  const contact = await Service.update(id, body, file, url);
  res.status(201).send(contact);
};

const remove = async (req, res) => {
  const { id } = req.params;
  await Service.remove(id);
  res.status(200).send();
};

export { get, save, update, remove };
