import * as Yup from 'yup';
import Deliveryman from '../models/Deliveryman';

import File from '../models/File';

class DeliverymanController {
  async index(req, res) {
    const deliveryman = await Deliveryman.findAll({
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          attributes: ['name', 'path'],
        },
      ],
    });
    return res.json(deliveryman);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      avatar_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation not accepted' });
    }

    const deliverymanExists = await Deliveryman.findOne({
      where: { email: req.body.email },
    });
    if (deliverymanExists) {
      return res.status(400).json({ error: 'User already exists!' });
    }

    // const { originalname: name, filename: path } = req.file;
    // const file = await File.create({
    //   name,
    //   path,
    // });

    // let body = {};
    // body['name'] = req.body.name;
    // body['email'] = req.body.email;
    // body['avatar_id'] = file.id;

    // const deliveryman = await Deliveryman.create(body);

    const deliveryman = await Deliveryman.create(req.body);
    return res.json(deliveryman);
  }

  async update(req, res) {
    const schema = Yup.object(req.body).shape({
      name: Yup.string(),
      email: Yup.string().email(),
      avatar_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fail' });
    }

    const { email } = req.body;

    const deliveryman = await Deliveryman.findByPk(req.params.id);

    if (email && email !== deliveryman.email) {
      const deliverymanExists = await Deliveryman.findOne({ where: { email } });

      if (deliverymanExists) {
        return res.status(400).json({ error: 'Deliveryman already exists!' });
      }
    }

    // building a JSON to update deliveryman's information
    console.log('aqui', req.file);
    const { originalname: name, filename: path } = req.file;
    const file = await File.create({
      name,
      path,
    });

    let body = {};
    body['name'] = req.body.name;
    body['email'] = req.body.email;
    body['avatar_id'] = file.id;

    const user_id = req.params.id;

    const newInformation = await Deliveryman.update(body, {
      where: { id: user_id },
    });

    return res.json({
      success: true,
      message: 'Deliveryman uptade!',
    });

    // const { id, name, avatar_id } = await deliveryman.update(req.body);

    // return res.json({
    //   id,
    //   name,
    //   email,
    //   avatar_id,
    // });
  }

  async delete(req, res) {
    const { id } = req.params;

    const deliverymanExists = await Deliveryman.findByPk(id);

    if (!deliverymanExists) {
      return res.status(400).json({ error: 'Deliveryman does not exists!' });
    }

    await Deliveryman.destroy({ where: { id } });

    return res.status(200).json();
  }
}
export default new DeliverymanController();
