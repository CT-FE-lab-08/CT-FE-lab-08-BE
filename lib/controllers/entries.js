import { Router } from 'express';
import Entry from '../models/Entry.js';

export default Router()

  .post('/', async (req, res, next) => {
    try {
      const entry = await Entry.create(req.body);
      res.send(entry);
    } catch (error) {
      next(error);
    }
  })
  
  .get('/', async (req, res, next) => {
    try {
      const entry = await Entry.getAll();
      res.send(entry);
    } catch (error) {
      next(error);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const entry = await Entry.getById(id);
      res.send(entry);
    } catch (error) {
      next(error);
    }
  })

  .put('update/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const entry = await Entry.update(id, req.body);
      res.send(entry);
    } catch (error) {
      next(error);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const entry = await Entry.delete(id);
      res.send({
        message: `Entry ${entry.id} was successfully deleted.`
      });
    } catch (error) {
      next(error);
    }
  })
;
