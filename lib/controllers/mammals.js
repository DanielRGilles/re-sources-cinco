const { Router } = require('express');
const Mammal = require('../models/Mammal');


module.exports = Router()
  .post('/', async (req, res) => {
    const mammal = await Mammal.insert(req.body);
    res.json(mammal);
  })

  .get('/:id', async (req, res) => {
    const { id } = req.params;
    const mammal = await Mammal.getById(id);
    res.json(mammal);
  })

  .get('/', async (req, res) => {
    const mammal = await Mammal.getAll();
    res.json(mammal);
  })

  .patch('/:id', async (req, res, next) => {
    const { id } = req.params;
    const { name, species } = req.body;
   
    try {
      const mammal = await Mammal.updateById(id, { name, species });
      res.json(mammal);
    } catch(err) {
      next(err);
    }
  })

  .delete('/:id', async (req, res) => {
    try {
      const mammal = await Mammal.deleteById(req.params.id);
      res.json(mammal);
    } catch(err) {
      res(err);
    }
  });
