import DeliveryProblem from '../models/DeliveryProblem';
import Deliverer from '../models/Deliverer';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
// import Mail from '../../lib/Mail';

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
    const problem = await DeliveryProblem.findByPk(id);

    if (!problem) {
      return res.json({ error: 'Cannot cancel. Wrong delivery problem.' });
    }

    Delivery.update(
      { canceled_at: new Date() },
      { where: { id: problem.delivery_id } }
    );

    const delivery = await Delivery.findOne({
      where: { id: problem.delivery_id },
      attributes: ['product'],
      include: [
        { model: Deliverer, attributes: ['name', 'email'] },
        { model: Recipient, attributes: ['name'] },
      ],
    });

    // envia email pro entregador informando o cancelamento
    await Mail.sendMail({
      to: `${delivery.Deliverer.name} <${delivery.Deliverer.email}>`,
      subject: 'Entrega cancelada',
      template: 'cancelation_delivery',
      context: {
        deliverer: delivery.Deliverer.name,
        recipient: delivery.Recipient.name,
        product: delivery.product,
        motivo: problem.description,
      },
    });

    return res.send();
  }
}

export default new DeliveryProblemController();
