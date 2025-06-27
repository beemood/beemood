import axios from 'axios';

describe('GET /api/category', () => {
  it('should return category list', async () => {
    const res = await axios.get(`/api/category`);
    expect(res.status).toBe(200);
    expect(res.data).toBeDefined();
    expect(res.data.length).toBeDefined();
  });
});
