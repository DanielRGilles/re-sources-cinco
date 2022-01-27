const { Router } = require('express');
const Plant = require('../models/Plant');


module.exports = Router()
  .post('/', async (req, res) => {
    const plant = await Plant.insert(req.body);
    res.json(plant);
  })

  .get('/:id', async (req, res) => {
    const { id } = req.params;
    const plant = await Plant.getById(id);
    res.json(plant);
  })

  .get('/', async (req, res) => {
    const plant = await Plant.getAll();
    res.json(plant);
  })

  .patch('/:id', async (req, res, next) => {
    const { id } = req.params;
    const { name, species } = req.body;
   
    try {
      const plant = await Plant.updateById(id, { name, species });
      res.json(plant);
    } catch(err) {
      next(err);
    }
  })

  .delete('/:id', async (req, res) => {
    try {
      const plant = await Plant.deleteById(req.params.id);
      res.json(plant);
    } catch(err) {
      res(err);
    }
  });
