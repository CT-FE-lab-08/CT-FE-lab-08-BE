const { Router } = require('express');
const Entry = require('../models/Entry');

module.exports = Router()
  .get('/', async(req, res, next) => {
    try {
      const entry = await Entry.getAll();
      res.send(entry);
    } catch(err) {
      next(err);
    }
  })

  .getById('/:id', async(req, res, next) => {
    try {
      const { id } = req.params;
      const entry = await Entry.getById(id);
      res.send(entry);
    } catch(err) {
      next(err);
    }
  })

  .post('/', async(req, res, next) => {
    try {
      const entry = await Entry.create(req.body);
      res.send(entry);
    } catch(err) {
      next(err);
    }
  })

  .put('update/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const entry = await Entry.update(id, req.body);
      res.send(entry);
    } catch(err) {
      next(err);
    }
  })

  .delete('delete/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const entry = await Entry.delete(id);
      res.send({
        message: `Entry ${entry.id} was successfully deleted.`
      });
    } catch (err) {
      next(err);
    }
  })
;
