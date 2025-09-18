import { expect } from 'chai';
import request from 'supertest';
import app from '../src/index.js';

describe('Business Date Calculator API', () => {
  it('should handle Friday 5:00 p.m. with hours=1', async () => {
    const response = await request(app)
      .get('/api/calculate')
      .query({ date: '2025-09-19T22:00:00Z', hours: 1 });
    expect(response.status).to.equal(200);
    expect(response.body.date).to.equal('2025-09-22T14:00:00Z');
  });

  it('should handle Saturday 2:00 p.m. with hours=1', async () => {
    const response = await request(app)
      .get('/api/calculate')
      .query({ date: '2025-04-12T19:00:00Z', hours: 1 });
    expect(response.status).to.equal(200);
    expect(response.body.date).to.equal('2025-04-14T14:00:00Z');
  });

  it('should handle Tuesday 3:00 p.m. with days=1 and hours=4', async () => {
    const response = await request(app)
      .get('/api/calculate')
      .query({ date: '2025-04-08T20:00:00Z', days: 1, hours: 4 });
    expect(response.status).to.equal(200);
    expect(response.body.date).to.equal('2025-04-10T15:00:00Z');
  });

  it('should handle Sunday 6:00 p.m. with days=1', async () => {
    const response = await request(app)
      .get('/api/calculate')
      .query({ date: '2025-09-14T23:00:00Z', days: 1 });
    expect(response.status).to.equal(200);
    expect(response.body.date).to.equal('2025-09-15T22:00:00Z');
  });

  it('should handle business day 8:00 a.m. with hours=8', async () => {
    const response = await request(app)
      .get('/api/calculate')
      .query({ date: '2025-04-14T13:00:00Z', hours: 8 });
    expect(response.status).to.equal(200);
    expect(response.body.date).to.equal('2025-04-14T22:00:00Z');
  });

  it('should handle business day 8:00 a.m. with days=1', async () => {
    const response = await request(app)
      .get('/api/calculate')
      .query({ date: '2025-04-14T13:00:00Z', days: 1 });
    expect(response.status).to.equal(200);
    expect(response.body.date).to.equal('2025-04-15T13:00:00Z');
  });

  it('should handle business day 12:30 p.m. with days=1', async () => {
    const response = await request(app)
      .get('/api/calculate')
      .query({ date: '2025-04-14T17:00:00Z', days: 1 });
    expect(response.status).to.equal(200);
    expect(response.body.date).to.equal('2025-04-15T17:00:00Z');
  });

  it('should handle business day 11:30 a.m. with hours=3', async () => {
    const response = await request(app)
      .get('/api/calculate')
      .query({ date: '2025-04-14T16:00:00Z', hours: 3 });
    expect(response.status).to.equal(200);
    expect(response.body.date).to.equal('2025-04-14T20:00:00Z');
  });

  it('should handle date=2025-04-10T15:00:00Z with days=5 and hours=4', async () => {
    const response = await request(app)
      .get('/api/calculate')
      .query({ date: '2025-04-10T15:00:00Z', days: 5, hours: 4 });
    expect(response.status).to.equal(200);
    expect(response.body.date).to.equal('2025-04-21T20:00:00Z');
  });
});