import axios from 'axios';

describe('AppController', () => {
  it('GET /api/hello', async () => {
    const res = await axios.get(`http://localhost:3000/api/hello`);
    expect(res.status).toEqual(200);
    expect(res.data).toEqual({ message: 'Hello' });
  });
});
