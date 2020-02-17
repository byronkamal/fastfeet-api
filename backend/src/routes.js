import express, { Router } from 'express';

const routes = new Router();

routes.get('/', (req, res) => {
  return res.json({ message: 'Iniciando app' });
});

export default routes;
