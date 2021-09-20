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
}