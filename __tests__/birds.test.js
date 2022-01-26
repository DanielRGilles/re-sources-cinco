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
  
  it('should be able to create an bird', async () => {
    const res = await Bird.insert(testObj);
    expect(res).toEqual({ id: expect.any(String), name: 'Greater roadrunner', species:'Geococcyx californianus' });
  });

  it('should be able to get an bird by id', async () => {
    const bird = await Bird.insert(testObj);
    const res = await request(app).get(`/api/v1/bird/${bird.id}`);
    expect(res.body).toEqual(bird);
  });

  it('should be able to list all bird', async () => {
    await Bird.insert(testObj);
    
    expect(await Bird.getAll()).toEqual([{ id: expect.any(String), name: 'Greater roadrunner', species:'Geococcyx californianus' }]);
  });

  it('should be able to update an bird', async () => {
    const bird = await Bird.insert(testObj);
    
    const res = await request(app)
      .patch(`/api/v1/bird/${bird.id}`)
      .send(testObjTwo);
    
    const expected = { id: bird.id, name: 'Common Ostrich', species:'Struthio camelus'  };

    expect(res.body).toEqual(expected);
    expect(await Bird.getById(bird.id)).toEqual(expected);
  });
  it('should be able to delete by id', async () => {
    const bird = await Bird.insert(testObj);
    const res = await request(app)
      .delete(`/api/v1/bird/${bird.id}`);
    
    expect(res.body).toEqual(bird);
    expect(await Bird.getById(bird.id)).toBeNull();
  });
});
