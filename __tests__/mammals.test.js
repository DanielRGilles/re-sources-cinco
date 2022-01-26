const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Mammal = require('../lib/models/Mammal');

const testObj = { name: 'Blue Whale', species:'Balaenoptera musculus' };
const testObjTwo = { name: 'Orca', species:'Orcinus orca' };


describe('tests for the mammals resource', () => {
  beforeEach(() => {
    return setup(pool);
  });
  
  afterAll(() => {
    pool.end();
  });
  
  it('should be able to create a mammal', async () => {
    const res = await Mammal.insert(testObj);
    expect(res).toEqual({ id: expect.any(String), name: 'Blue Whale', species:'Balaenoptera musculus' });
  });

  it('should be able to get a mammals by id', async () => {
    const mammals = await Mammal.insert(testObj);
    const res = await request(app).get(`/api/v1/mammals/${mammals.id}`);
    expect(res.body).toEqual(mammals);
  });

  it('should be able to list all mammals', async () => {
    await Mammal.insert(testObj);
    
    expect(await Mammal.getAll()).toEqual([{ id: expect.any(String), name: 'Blue Whale', species:'Balaenoptera musculus' }]);
  });

  it('should be able to update a mammals', async () => {
    const mammals = await Mammal.insert(testObj);
    
    const res = await request(app)
      .patch(`/api/v1/mammals/${mammals.id}`)
      .send(testObjTwo);
    
    const expected = { id: mammals.id, name: 'Orca', species:'Orcinus orca' };

    expect(res.body).toEqual(expected);
    expect(await Mammal.getById(mammals.id)).toEqual(expected);
  });
  it('should be able to delete by id', async () => {
    const mammal = await Mammal.insert(testObj);
    const res = await request(app)
      .delete(`/api/v1/mammals/${mammal.id}`);
    
    expect(res.body).toEqual(mammal);
    expect(await Mammal.getById(Mammal.id)).toBeNull();
  });
});
