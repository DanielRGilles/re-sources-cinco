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
    const res = await Amphibian.insert(testObj);
    expect(res).toEqual({ id: expect.any(String), name: 'American BullFrog', species:'Lithobates catesbeianus' });
  });

  it('should be able to get an amphibian by id', async () => {
    const amphibians = await Amphibian.insert(testObj);
    const res = await request(app).get(`/api/v1/amphibians/${amphibians.id}`);
    expect(res.body).toEqual(amphibians);
  });

  it('should be able to list all amphibians', async () => {
    await Amphibian.insert(testObj);
    
    expect(await Amphibian.getAll()).toEqual([{ id: expect.any(String), name: 'American BullFrog', species:'Lithobates catesbeianus' }]);
  });

  it('should be able to update an amphibian', async () => {
    const amphibians = await Amphibian.insert(testObj);
    
    const res = await request(app)
      .patch(`/api/v1/amphibians/${amphibians.id}`)
      .send(testObjTwo);
    
    const expected = { id: amphibians.id, name: 'Spotted salamander', species:'Ambystoma maculatum'  };

    expect(res.body).toEqual(expected);
    expect(await Amphibian.getById(amphibians.id)).toEqual(expected);
  });
  it('should be able to delete by id', async () => {
    const amphibian = await Amphibian.insert(testObj);
    const res = await request(app)
      .delete(`/api/v1/amphibians/${amphibian.id}`);
    
    expect(res.body).toEqual(amphibian);
    expect(await Amphibian.getById(amphibian.id)).toBeNull();
  });
});
