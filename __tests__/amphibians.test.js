const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Amphibian = require('../lib/models/Amphibian');

const testObj = { name: 'American BullFrog', species:'Lithobates catesbeianus' };
const testObjTwo = { name: 'Spotted salamander', species:'Ambystoma maculatum' };


describe('tests for the amphibians resource', () => {
  beforeEach(() => {
    return setup(pool);
  });
  
  afterAll(() => {
    pool.end();
  });
  
  it('should be able to create an amphibian', async () => {
    const res = await request(app)
      .post('/api/v1/amphibians')
      .send(testObj);
    expect(res.body).toEqual({ id: expect.any(String), name: 'American BullFrog', species:'Lithobates catesbeianus' });
  });

  it('should be able to get an amphibian by id', async () => {
    const { body } = await request(app)
      .post('/api/v1/amphibians')
      .send(testObj);
    const res = await request(app).get(`/api/v1/amphibians/${body.id}`);
    expect(res.body).toEqual(body);
  });

  it('should be able to list all amphibians', async () => {
    await request(app)
      .post('/api/v1/amphibians')
      .send(testObj);
    
    expect(await Amphibian.getAll()).toEqual([{ id: expect.any(String), name: 'American BullFrog', species:'Lithobates catesbeianus' }]);
  });

  it('should be able to update an amphibian', async () => {
    const  { body } = await request(app)
      .post('/api/v1/amphibians')
      .send(testObj);
    
    const res = await request(app)
      .patch(`/api/v1/amphibians/${body.id}`)
      .send(testObjTwo);
    
    const expected = { id: body.id, name: 'Spotted salamander', species:'Ambystoma maculatum'  };

    expect(res.body).toEqual(expected);
    expect(await Amphibian.getById(body.id)).toEqual(expected);
  });
  it('should be able to delete by id', async () => {
    const { body } =  await request(app)
      .post('/api/v1/amphibians')
      .send(testObj);
    const res = await request(app)
      .delete(`/api/v1/amphibians/${body.id}`);
    
    expect(res.body).toEqual(body);
    expect(await Amphibian.getById(body.id)).toBeNull();
  });
});
