import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Entry from '../lib/models/Entry.js';

const currentDate = new Date().toISOString().slice(0, 10);

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('POSTS a new entry', async () => {
    const entry = {
      name: 'DJ',
      event: true,
      note: 'my sorrow is an ocean'
    };

    const res = await request(app)
      .post('/api/v1/alchemy-cry-lab')
      .send(entry);

    expect(res.body).toEqual({
      id: '1',
      date: currentDate,
      ...entry,
    });
  });

  it('GET all entries', async () => {
    const res1 = await Entry.create({
      name: 'DJ',
      event: true,
      note: 'my sorrow is an ocean'
    });

    const res2 = await Entry.create({
      name: '.Kubisiak',
      event: true,
      note: 'dab soon'
    });

    const res = await request(app).get('/api/v1/alchemy-cry-lab/2');
    expect(res.body).toEqual([res1, res2]);
  });

  it('GET entry by id', async () => {
    const res1 = await Entry.create({
      name: 'DJ',
      event: true,
      note: 'my sorrow is an ocean'
    });

    const res2 = await Entry.create({
      name: '.Kubisiak',
      event: true,
      note: 'dab soon'
    });

    const res = await request(app).get('/api/v1/alchemy-cry-lab/2');
    expect(res.body).not.toEqual(res1);
    expect(res.body).toEqual(res2);
  });


  afterAll(() => {
    pool.end();
  });
});
