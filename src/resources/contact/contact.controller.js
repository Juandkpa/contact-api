import * as Service from "./contact.service";

const get = async (req, res) => {
  const { id } = req.params;
  const contact = await Service.get(id);

  res.send(contact);
};

const save = async (req, res) => {
  const { body } = req;

  //thrown exception inside service
  await Service.save(body);
  res.status(200).send();
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
}

export { get, save, update, remove };
