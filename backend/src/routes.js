import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import DeliverymanController from './app/controllers/DeliverymanController';
import FileController from './app/controllers/FileController';
import DeliveryController from './app/controllers/DeliveryController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';
import DeliverymanDeliveriesController from './app/controllers/DeliverymanDeliveriesController';
import DeliveryPickupController from './app/controllers/DeliveryPickupController';
import CompletedDeliveryController from './app/controllers/CompletedDeliveryController';
import OpenDeliveryController from './app/controllers/OpenDelivery';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);

// pegar entregas por id do entregador
routes.get(
  '/deliveryman/:id/deliveries',
  DeliverymanDeliveriesController.index
);

// atualiza a data de pickup da entrega a partir do id da entrega
routes.put('/delivery/:id/pickup', DeliveryPickupController.update);

// pega todas as entregas abertas para o deliveryman_id
routes.get('/deliveryman/:id', OpenDeliveryController.index);

// finaliza entrega e permite envio de foto de assinatura
routes.put(
  '/delivery/:id/finish',
  upload.single('file'),
  CompletedDeliveryController.update
);

//delivery problem
routes.get('/delivery/problems', DeliveryProblemController.index);

routes.get('/delivery/:id/problems', DeliveryProblemController.index);

routes.post('/delivery/:id/problems', DeliveryProblemController.store);

routes.delete('/problem/:id/cancel-delivery', DeliveryProblemController.delete);

/*all routes below can only be
accessed if the user is logged in*/
routes.use(authMiddleware);

//user
routes.post('/users', UserController.store); //
routes.put('/users', UserController.update); //

//recipient
routes.post('/recipients', RecipientController.store); //
routes.put('/recipients/:id', RecipientController.update); //

//deliveryman
routes.get('/deliveryman', DeliverymanController.index);
routes.post('/deliveryman', DeliverymanController.store);
routes.put('/deliveryman', DeliverymanController.update);
routes.delete('/deliveryman', DeliverymanController.delete);

//delivery
routes.get('/delivery', DeliveryController.index);
routes.post('/delivery', DeliveryController.store);
routes.put('/delivery/:id', DeliveryController.update);
routes.delete('/delivery/:id', DeliveryController.delete);

export default routes;
