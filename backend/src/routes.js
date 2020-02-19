import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import DelivererController from './app/controllers/DelivererController';
import FileController from './app/controllers/FileController';
import DeliveryController from './app/controllers/DeliveryController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);

/*all routes below can only be
accessed if the user is logged in*/
routes.use(authMiddleware);

//user
routes.post('/users', UserController.store);
routes.put('/users', UserController.update);

//recipient
routes.post('/recipients', RecipientController.store);
routes.put('/recipients', RecipientController.update);

//deliverer
routes.get('/deliverer', DelivererController.index);
routes.post('/deliverer', DelivererController.store);
routes.put('/deliverer', DelivererController.update);
routes.delete('/deliverer', DelivererController.delete);

//delivery
routes.get('/deliveries', DeliveryController.index);
routes.post('/deliveries', DeliveryController.store);
routes.put('/deliveries/:id', DeliveryController.update);
routes.delete('/deliveries/:id', DeliveryController.delete);

//file
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
