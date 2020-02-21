import Delivery from '../models/Delivery';

class OpenDeliveryController {
  async index(req, res) {
    const { id } = req.params;
    const deliveries = await Delivery.findAll({
      where: { deliveryman_id: id, end_date: null, canceled_at: null },
    });
    return res.json(deliveries);
  }
}

export default new OpenDeliveryController();
