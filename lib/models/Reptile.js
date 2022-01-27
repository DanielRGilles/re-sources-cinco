const pool = require('../utils/pool');

module.exports = class Reptile {
  id;
  name;
  species;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.species = row.species;
    
  }

  static async insert({ name, species }) {
    const { rows } = await pool.query(
      'INSERT INTO reptiles (name, species ) VALUES ($1, $2) RETURNING *;',
      [name, species]
    );
    return new Reptile(rows[0]);
  } 
  

  static async getAll() {
    const { rows } = await pool.query(
      'SELECT * FROM reptiles'
    );
    return rows.map(row => new Reptile(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM reptiles WHERE id=$1;', [
      id,
    ]);
    
    if(!rows[0]) return null;
    return new Reptile(rows[0]);
  }

  static async updateById(id, { name, species }) {
    const { rows } = await pool.query(
      'UPDATE reptiles SET name = $1, species = $2 WHERE id = $3 RETURNING *',
      [name, species, id]
    );
    return new Reptile(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      'DELETE FROM reptiles WHERE id = $1 RETURNING *;', [id]
    );
    if (!rows[0]) return null;
    return new Reptile(rows[0]);
  }
};
