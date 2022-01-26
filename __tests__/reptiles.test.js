const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const fetch =  require('cross-fetch');
const app = require('../lib/app');
const Reptile = require('../lib/models/Reptile');

describe('refactory routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  
  afterAll(() => {
    pool.end();
  });
  
  it('should be able to create a reptile', async () => {
    const res = await Reptile.insert();
    expect(res).toEqual({ id: expect.any(String), name: 'alligator', species: 'brb gotta google' });
  });
  
  it('should be able to list a reptile by id', async () => {
    const reptiles = await Reptile.insert({ name: 'alligator', species: 'brb gotta google' });
    const res = await fetch(app).get(`/api/v1/reptiles/${reptiles.id}`);
    expect(res.body).toEqual(reptiles);
  });

  it('should be able to list all reptiles', async () => {
    const res = await Reptile.insert({ name:'alligator', species: 'brb gotta google' });
    
    expect(res).toEqual([{ id: expect.any(String), name: 'alligator', species: 'brb gotta google' }]);
  });
});
