import pool from '../utils/pool.js';

export default class Entry {
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
    const { rows } = await pool.query(
      'SELECT * FROM entries'
      );

    return rows.map((row) => new Entry(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM entries where id=$1', 
    [id]
    );

    return new Entry(rows[0]);
  }

  static async create({ name, event, note }) {
    const currentDate = new Date().toISOString().slice(0, 10);
    const { rows } = await pool.query(
      'INSERT INTO entries (name, event, note, date) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, event, note, currentDate]
    );

    return new Entry(rows[0]);
  }

  static async update(id, { newName, newEvent, newNote }){
  const { currentName, currentEvent, currentNote, date } = await Entry.getById(id);

  const name = newName ? newName : currentName;
  const event = newEvent ? newEvent : currentEvent;
  const note = newNote ? newNote : currentNote;

  const { rows } = await pool.query(
    'UPDATE entries SET name=$1, event=$2, note=$3, date=$4 WHERE id=$5 RETURNING *', 
    [name, event, note, date, id]
  );

  return new Entry(rows[0]);
}

static async delete(id) {
  const { rows } = await pool.query(
    'DELETE FROM entries WHERE id=$1 RETURNING *', 
    [id]
  );

  return new Entry(rows[0]);
  }
}