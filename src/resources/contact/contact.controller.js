import * as Service from "./contact.service";
import { validationResult } from 'express-validator';
import { ValidationError } from '../../utils/errorHandler';

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

  const { body, file } = req;  
  const url = req.protocol + "://" + req.get("host");
  const contact = await Service.save(body, file, url);  

  res.status(200).send(contact);
};

const update = async (req, res) => {
  const { body } = req;
  const { id } = req.params;

  await Service.update(id, body);
  res.status(201).send();
};

const remove = async (req, res) => {
  const { id } = req.params;
  await Service.remove(id);
  res.status(200).send();
};

export { get, save, update, remove };
