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


;
