import DeliveryProblem from '../models/DeliveryProblem';
import Deliveryman from '../models/Deliveryman';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import CancellationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue';

class DeliveryProblemController {
  async index(req, res) {
    const { id } = req.params;
    let problems = [];
    if (id) {
      problems = await DeliveryProblem.findAll({
        where: { delivery_id: id },
      });
    } else {
      problems = await DeliveryProblem.findAll();
    }
    return res.json(problems);
  }

  async store(req, res) {
    const { id } = req.params;
    const { description } = req.body;
    const problem = await DeliveryProblem.create({
      delivery_id: id,
      description,
    });
    return res.json(problem);
  }

  async delete(req, res) {
    const { id } = req.params;

    const deliveryProblem = await DeliveryProblem.findOne({
      where: { id },
    });

    if (!deliveryProblem) {
      return res.status(400).json({ error: 'This problem does not exists' });
    }
    const delivery = await Delivery.findByPk(deliveryProblem.delivery_id, {
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name', 'email'],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['name'],
        },
      ],
    });

    if (delivery.end_date !== null && delivery.signature_id !== null) {
      return res.status(400).json('This delivery has been completed');
    }

    Delivery.update(
      {
        canceled_at: new Date(),
      },
      {
        where: {
          id: deliveryProblem.delivery_id,
        },
      }
    );

    console.log(delivery.deliveryman);
    await Queue.add(CancellationMail.key, {
      delivery,
      deliveryman: delivery.deliveryman,
      problem: deliveryProblem,
      recipient: delivery.recipient,
    });

    await DeliveryProblem.destroy({ where: { id } });

    return res.status(200).json();
  }
}

export default new DeliveryProblemController();
