const { Router } = require('express');
const Bird = require('../models/Bird');


module.exports = Router()
  .post('/', async (req, res) => {
    const bird = await Bird.insert(req.body);
    res.json(bird);
  })

  .get('/:id', async (req, res) => {
    const { id } = req.params;
    const bird = await Bird.getById(id);
    res.json(bird);
  })

  .get('/', async (req, res) => {
    const bird = await Bird.getAll();
    res.json(bird);
  })

  .patch('/:id', async (req, res, next) => {
    const { id } = req.params;
    const { name, species } = req.body;
   
    try {
      const bird = await Bird.updateById(id, { name, species });
      res.json(bird);
    } catch(err) {
      next(err);
    }
  })

  .delete('/:id', async (req, res) => {
    try {
      const bird = await Bird.deleteById(req.params.id);
      res.json(bird);
    } catch(err) {
      res(err);
    }
  });
