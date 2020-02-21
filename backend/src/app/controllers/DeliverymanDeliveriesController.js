import { Op } from 'sequelize';
import Delivery from '../models/Delivery';

/*
 * Show completed deliveries from one deliveryman
 */

class DeliverymanDeliveriesController {
  async index(req, res) {
    const { id } = req.params;
    const deliveries = await Delivery.findAll({
      where: { deliveryman_id: id, end_date: { [Op.ne]: null } },
    });
    return res.json(deliveries);
  }
}

export default new DeliverymanDeliveriesController();
