import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { delivery, deliveryman, recipient, problem } = data;

    Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: `Cancelamento de entrega`,
      template: 'cancelation_delivery',
      context: {
        product: delivery.product,
        deliveryman: deliveryman.name,
        description: problem.description,
        recipient: recipient.name,
      },
    });
  }
}

export default new CancellationMail();
