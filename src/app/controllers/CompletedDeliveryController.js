import File from '../models/File';
import Delivery from '../models/Delivery';

class CompletedDeliveryController {
  async update(req, res) {
    const { id } = req.params;
    const { originalname: name, filename: path } = req.file;
    const file = await File.create({ name, path });

    // reqRes = res.json(file)

    await Delivery.update(
      { signature_id: file.id, end_date: new Date() },
      { where: { id } }
    );

    return res.status(200).json();
  }
}

export default new CompletedDeliveryController();
