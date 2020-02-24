import { isWithinInterval } from 'date-fns';
import { Op } from 'sequelize';

import Delivery from '../models/Delivery';

class DeliveryPickupController {
  async update(req, res) {
    const { id } = req.params;
    const { deliveryman_id } = req.body;

    const deliveryExists = await Delivery.findByPk(id);

    if (!deliveryExists) {
      return res.status(400).json({ error: 'Delivery does  not exists' });
    }

    if (!deliveryman_id) {
      return res
        .status(400)
        .json({ error: 'Please, inform the delivery man.' });
    }

    const now = new Date();
    const morning = new Date().setHours(8, 0, 0);
    const afternoon = new Date().setHours(20, 0, 0);
    const periodValid = isWithinInterval(now, {
      start: morning,
      end: afternoon,
    });
    if (!periodValid) {
      return res.status(400).json({
        error: 'Products can only be picked up from 8 am to 6pm!',
      });
    }

    const today_start = new Date().setHours(0, 0, 0, 0);
    const retiradas = await Delivery.count({
      where: {
        deliveryman_id,
        start_date: { [Op.gt]: today_start, [Op.lt]: now },
      },
    });
    if (retiradas >= 5) {
      return res
        .status(400)
        .json({ error: 'Daily number of withdrawals has been exceeded.' });
    }

    await Delivery.update({ start_date: now }, { where: { id } });

    return res.json({
      success: true,
      message: `The delivery ${id} has been picked up`,
    });
  }
}

export default new DeliveryPickupController();
