import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

const currentDate = new Date().toISOString().slice(0, 10);

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('POSTS a new entry', async () => {
    const entry = {
      name: 'DJ',
      event: true,
      note: ''
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

  afterAll(() => {
    pool.end();
  });
});
