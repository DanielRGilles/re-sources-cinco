const pool = require('../utils/pool');

module.exports = class Bird {
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
      'INSERT INTO birds (name, species ) VALUES ($1, $2) RETURNING *;',
      [name, species]
    );
    return new Bird(rows[0]);
  } 
  

  static async getAll() {
    const { rows } = await pool.query(
      'SELECT * FROM birds'
    );
    return rows.map(row => new Bird(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM birds WHERE id=$1;', [
      id,
    ]);
    
    if(!rows[0]) return null;
    return new Bird(rows[0]);
  }

  static async updateById(id, { name, species }) {
    const { rows } = await pool.query(
      'UPDATE birds SET name = $1, species = $2 WHERE id = $3 RETURNING *',
      [name, species, id]
    );
    return new Bird(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      'DELETE FROM birds WHERE id = $1 RETURNING *;', [id]
    );
    if (!rows[0]) return null;
    return new Bird(rows[0]);
  }
};
