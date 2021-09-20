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
;
