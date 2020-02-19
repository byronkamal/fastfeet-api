import * as Yup from 'yup';
import Deliverer from '../models/Deliverer';

class DelivererController {
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
}
export default new DelivererController();
