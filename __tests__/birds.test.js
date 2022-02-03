const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Bird = require('../lib/models/Bird');

const testObj = { name: 'Greater roadrunner', species:'Geococcyx californianus' };
const testObjTwo = { name: 'Common Ostrich', species:'Struthio camelus' };


describe('tests for the bird resource', () => {
  beforeEach(() => {
    return setup(pool);
  });
  
  afterAll(() => {
    pool.end();
  });
  
  it('should be able to create a bird', async () => {
    const res = await request(app)
      .post('/api/v1/birds')
      .send(testObj);
    expect(res.body).toEqual({ id: expect.any(String), name: 'Greater roadrunner', species:'Geococcyx californianus' });
  });

  it('should be able to get an bird by id', async () => {
    const { body } = await request(app)
      .post('/api/v1/birds')
      .send(testObj);
    const res = await request(app).get(`/api/v1/birds/${body.id}`);
    expect(res.body).toEqual(body);
  });

  it('should be able to list all bird', async () => {
    await request(app)
      .post('/api/v1/birds')
      .send(testObj);
    
    expect(await Bird.getAll()).toEqual([{ id: expect.any(String), name: 'Greater roadrunner', species:'Geococcyx californianus' }]);
  });

  it('should be able to update an bird', async () => {
    const { body } = await request(app)
      .post('/api/v1/birds')
      .send(testObj);
    
    const res = await request(app)
      .patch(`/api/v1/birds/${body.id}`)
      .send(testObjTwo);
    
    const expected = { id: body.id, name: 'Common Ostrich', species:'Struthio camelus'  };

    expect(res.body).toEqual(expected);
    expect(await Bird.getById(body.id)).toEqual(expected);
  });
  it('should be able to delete by id', async () => {
    const { body } = await request(app)
      .post('/api/v1/birds')
      .send(testObj);
    const res = await request(app)
      .delete(`/api/v1/birds/${body.id}`);
    
    expect(res.body).toEqual(body);
    expect(await Bird.getById(body.id)).toBeNull();
  });
});
