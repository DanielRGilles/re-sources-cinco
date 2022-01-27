const { Router } = require('express');
const Reptile = require('../models/Reptile');


module.exports = Router()
  .post('/', async (req, res) => {
    const reptile = await Reptile.insert(req.body);
    res.json(reptile);
  })

  .get('/:id', async (req, res) => {
    const { id } = req.params;
    const reptile = await Reptile.getById(id);
    res.json(reptile);
  })

  .get('/', async (req, res) => {
    const reptile = await Reptile.getAll();
    res.json(reptile);
  })

  .patch('/:id', async (req, res, next) => {
    const { id } = req.params;
    const { name, species } = req.body;
   
    try {
      const reptile = await Reptile.updateById(id, { name, species });
      res.json(reptile);
    } catch(err) {
      next(err);
    }
  })

  .delete('/:id', async (req, res) => {
    try {
      const reptile = await Reptile.deleteById(req.params.id);
      res.json(reptile);
    } catch(err) {
      res(err);
    }
  });
  
