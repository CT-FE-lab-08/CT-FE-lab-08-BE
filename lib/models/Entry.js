const pool = require('../utils/pool.js');

module.exports = class Entry {
  id;
  name;
  event;
  note;
  date;
  
  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.event = row.event;
    this.note = row.note;
    this.date = row.date;
  }
  
  static async getAll() {
    const { rows } = await pool.query
    ('SELECT * FROM entries');
    return rows.map((row) => new Entry(row));
  }

  static async getByid(id) {
    const { rows } = await pool.query
    ('SELECT * FROM entries where id=$1', [id]);
    return new Entry(rows[0]);
  }

  static async create(name, event, note) {
    const currentDate = new Date().toISOString().slice(0, 10);
    const { rows } = await pool.query(
      'INSERT INTO entries (name, event, note, date) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, event, note, date]
    );
    return new Entry(rows[0]);
  }
}