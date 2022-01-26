const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Reptile = require('../lib/models/Reptile');

describe('tests for the reptile resource', () => {
  beforeEach(() => {
    return setup(pool);
  });
  
  afterAll(() => {
    pool.end();
  });
  
  it('should be able to create a reptile', async () => {
    const res = await Reptile.insert();
    expect(res).toEqual({ id: expect.any(String), name: 'American Alligator', species: 'Alligator mississippiensis' });
  });

  it('should be able to get a reptile by id', async () => {
    const reptiles = await Reptile.insert({ name: 'American Alligator', species: 'Alligator mississippiensis' });
    const res = await request(app).get(`/api/v1/reptiles/${reptiles.id}`);
    expect(res.body).toEqual(reptiles);
  });

  it('should be able to list all reptiles', async () => {
    const res = await Reptile.insert({ name:'American Alligator', species: 'Alligator mississippiensis' });
    
    expect(res.body).toEqual([{ id: expect.any(String), name: 'American Alligator', species: 'Alligator mississippiensis' }]);
  });
  it('should be able to update a reptile', async () => {
    const reptile = await Reptile.insert({ name: 'American Alligator', species: 'Alligator mississippiensis' });
    const res = await request(app)
      .patch(`/api/v1/reptiles/${reptile.id}`)
      .send({ name: 'American Crocodile', species: 'Crocodylus acutus' });
    const expected = { id: reptile.id, name: 'American Crocodile', species: 'Crocodylus acutus' };

    expect(res.body).toEqual(expected);
    expect(await Reptile.getById(reptile.id)).toEqual(expected);
  });
  it('should be able to delete by id', async () => {
    const reptile = await Reptile.insert({ name: 'American Alligator', species: 'Alligator mississippiensis' });
    const res = await request(app)
      .delete(`/api/v1/reptiles/${reptile.id}`);
    
    expect(res.body).toEqual(reptile);
    expect(await Reptile.getById(reptile.id)).toBeNull();
  });
});
