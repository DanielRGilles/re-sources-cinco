const pool = require('../utils/pool');

module.exports = class Plant {
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
      'INSERT INTO plants (name, species ) VALUES ($1, $2) RETURNING *;',
      [name, species]
    );
    return new Plant(rows[0]);
  } 
  

  static async getAll() {
    const { rows } = await pool.query(
      'SELECT * FROM plants'
    );
    return rows.map(row => new Plant(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM plants WHERE id=$1;', [
      id,
    ]);
    
    if(!rows[0]) return null;
    return new Plant(rows[0]);
  }

  static async updateById(id, { name, species }) {
    const { rows } = await pool.query(
      'UPDATE plants SET name = $1, species = $2 WHERE id = $3 RETURNING *',
      [name, species, id]
    );
    return new Plant(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      'DELETE FROM plants WHERE id = $1 RETURNING *;', [id]
    );
    if (!rows[0]) return null;
    return new Plant(rows[0]);
  }
};
