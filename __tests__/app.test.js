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

  afterAll(() => {
    pool.end();
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

    const res3 = await request(app).get('/api/v1/alchemy-cry-lab');
    expect(res3.body).toEqual([res1, res2]);
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

    const res3 = await request(app).get('/api/v1/alchemy-cry-lab/2');

    expect(res3.body).not.toEqual(res1);
    expect(res3.body).toEqual(res2);
  });


  it('PUT entry', async () => {
    const res1 = await Entry.create({
      name: 'DJ',
      event: true,
      note: 'my sorrow is an ocean'
    });

    const res2 = await request(app)
      .put(`/api/v1/alchemy-cry-lab/${res1.id}`)
      .send({
        event: false,
        note: ''
      });

    expect(res2.body).toEqual({
      id: res1.id,
      name: 'DJ',
      event: false,
      note: '',
      date: res1.date,
    });
  });

  it('DELETE entry', async () => {
    const res1 = await Entry.create({
      name: 'DJ',
      event: true,
      note: 'my sorrow is an ocean'
    });

    const res2 = await request(app)
      .delete(`/api/v1/alchemy-cry-lab/${res1.id}`);

    expect(res2.body).toEqual({ message: `Entry ${res1.id} was successfully deleted.` });
  });


});
