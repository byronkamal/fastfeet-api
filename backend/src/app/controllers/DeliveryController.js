import * as Yup from 'yup';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import Deliverer from '../models/Deliverer';
import File from '../models/File';

// import DetailMail from '../jobs/DetailMail';
// import Queue from '../../lib/Queue';

class DeliveryController {
  async index(req, res) {
    const deliveries = await Delivery.findAll({
      include: [
        {
          model: Deliverer,
          attributes: ['id', 'name', 'email', 'avatar_id'],
          include: {
            model: File,
            attributes: ['name', 'path'],
          },
        },

        {
          model: Recipient,
          attributes: [
            'id',
            'name',
            'street',
            'zip_code',
            'number',
            'state',
            'city',
            'complement',
          ],
        },
        {
          model: File,
          attributes: ['path', 'name'],
        },
      ],
      attributes: [
        'id',
        'product',
        'deliverer_id',
        'recipient_id',
        'canceled_at',
        'start_date',
        'end_date',
      ],
    });
    return res.json(deliveries);
  }

  async store(req, res) {
    const schema = Yup.object(req.body).shape({
      product: Yup.string(),
      recipient_id: Yup.number(),
      deliverer_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fail' });
    }

    /* Check if Deliverer and Recipient exists */
    const { deliverer_id, recipient_id, product } = req.body;

    const delivererExists = await Deliverer.findOne({
      where: { id: req.body.deliverer_id },
    });

    const recipientExists = await Recipient.findOne({
      where: { id: req.body.recipient_id },
    });

    if (!(delivererExists || recipientExists)) {
      return res
        .status(400)
        .json({ error: 'Deliverer and Recipient does not exists!' });
    }

    if (!recipientExists) {
      return res.status(400).json({ error: 'Recipient does not exists' });
    }

    if (!delivererExists) {
      return res.status(400).json({ error: 'Deliverer does not exists' });
    }

    const delivery = await Delivery.create({
      product,
      deliverer_id,
      recipient_id,
    });

    // const deliverer = await Deliverer.findByPk(deliverer_id);
    // const recipient = await Recipient.findByPk(recipient_id);

    // await Queue.add(DetailMail.key, {
    //   delivery,
    //   deliverer,
    //   recipient,
    // });

    return res.json(delivery);
  }

  async update(req, res) {
    const schema = Yup.object(req.body).shape({
      product: Yup.string(),
      recipient_id: Yup.number(),
      deliverer_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fail' });
    }

    const { deliverer_id, recipient_id } = req.body;

    const checkDelivererExists = await Deliverer.findOne({
      where: { id: deliverer_id },
    });

    const checkRecipientExists = await Recipient.findOne({
      where: { id: recipient_id },
    });

    if (!(checkDelivererExists || checkRecipientExists)) {
      return res
        .status(400)
        .json({ error: 'Deliverer and Recipient does not exists' });
    }

    if (!checkRecipientExists) {
      return res.status(400).json({ error: 'Recipient does not exists' });
    }

    if (!checkDelivererExists) {
      return res.status(400).json({ error: 'Deliverer does not exists' });
    }

    const delivery = await Delivery.findByPk(req.params.id);

    const { id, product } = await delivery.update(req.body);

    return res.json({
      id,
      product,
      recipient_id,
      deliverer_id,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const deliveryExists = await Delivery.findByPk(id);

    if (!deliveryExists) {
      return res.status(400).json({ error: 'Delivery not exists' });
    }

    await Delivery.destroy({ where: { id } });

    return res.status(200).json();
  }
}

export default new DeliveryController();
