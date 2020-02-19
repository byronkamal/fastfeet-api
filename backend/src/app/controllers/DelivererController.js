import * as Yup from 'yup';
import Deliverer from '../models/Deliverer';
import File from '../models/File';

class DelivererController {
  async index(req, res) {
    const deliverer = await Deliverer.findAll({
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          attributes: ['name', 'path'],
        },
      ],
    });
    return res.json(deliverer);
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

    const delivererExists = await Deliverer.findOne({
      where: { email: req.body.email },
    });
    if (delivererExists) {
      return res.status(400).json({ error: 'User already exists!' });
    }

    const deliverer = await Deliverer.create(req.body);

    return res.json(deliverer);
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

    const deliverer = await Deliverer.findByPk(req.params.id);

    if (email && email !== deliverer.email) {
      const delivererExists = await Deliverer.findOne({ where: { email } });

      if (delivererExists) {
        return res.status(400).json({ error: 'Deliverer already exists!' });
      }
    }

    const { id, name, avatar_id } = await deliverer.update(req.body);

    return res.json({
      id,
      name,
      email,
      avatar_id,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const delivererExists = await Deliverer.findByPk(id);

    if (!delivererExists) {
      return res.status(400).json({ error: 'Deliverer not exists!' });
    }

    await Deliverer.destroy({ where: { id } });

    return res.status(200).json();
  }
}
export default new DelivererController();
