const { Router } = require('express');
const Amphibian = require('../models/Amphibian');


module.exports = Router()
  .post('/', async (req, res) => {
    const amphibian = await Amphibian.insert(req.body);
    res.json(amphibian);
  })

  .get('/:id', async (req, res) => {
    const { id } = req.params;
    const amphibian = await Amphibian.getById(id);
    res.json(amphibian);
  })

  .get('/', async (req, res) => {
    const amphibian = await Amphibian.getAll();
    res.json(amphibian);
  })

  .patch('/:id', async (req, res, next) => {
    const { id } = req.params;
    const { name, species } = req.body;
   
    try {
      const amphibian = await Amphibian.updateById(id, { name, species });
      res.json(amphibian);
    } catch(err) {
      next(err);
    }
  })

  .delete('/:id', async (req, res) => {
    try {
      const amphibian = await Amphibian.deleteById(req.params.id);
      res.json(amphibian);
    } catch(err) {
      res(err);
    }
  });
