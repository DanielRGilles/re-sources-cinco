const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Plant = require('../lib/models/Plant');

const testObj = { name: 'Poison Ivy', species:'Toxicodendron radicans' };
const testObjTwo = { name: 'Blood Orange', species:'Citrus x sinensis' };


describe('tests for the plants resource', () => {
  beforeEach(() => {
    return setup(pool);
  });
  
  afterAll(() => {
    pool.end();
  });
  
  it('should be able to create a plant', async () => {
    const res = await request(app)
      .post('/api/v1/plants')
      .send(testObj);
    expect(res.body).toEqual({ id: expect.any(String), name: 'Poison Ivy', species:'Toxicodendron radicans' });
  });

  it('should be able to get a plant by id', async () => {
    const { body } = await request(app)
      .post('/api/v1/plants')
      .send(testObj);
    const res = await request(app).get(`/api/v1/plants/${body.id}`);
    expect(res.body).toEqual(body);
  });

  it('should be able to list all plants', async () => {
    await request(app)
      .post('/api/v1/plants')
      .send(testObj);
    
    expect(await Plant.getAll()).toEqual([{ id: expect.any(String), name: 'Poison Ivy', species:'Toxicodendron radicans' }]);
  });

  it('should be able to update an plant', async () => {
    const { body } = await request(app)
      .post('/api/v1/plants')
      .send(testObj);
    
    const res = await request(app)
      .patch(`/api/v1/plants/${body.id}`)
      .send(testObjTwo);
    
    const expected = { id: body.id, name: 'Blood Orange', species:'Citrus x sinensis' };

    expect(res.body).toEqual(expected);
    expect(await Plant.getById(body.id)).toEqual(expected);
  });
  it('should be able to delete by id', async () => {
    const { body } = await request(app)
      .post('/api/v1/plants')
      .send(testObj);
    const res = await request(app)
      .delete(`/api/v1/plants/${body.id}`);
    
    expect(res.body).toEqual(body);
    expect(await Plant.getById(body.id)).toBeNull();
  });
});
