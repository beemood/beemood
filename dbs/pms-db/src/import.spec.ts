describe('import', () => {
  it('should import', () => {
    expect(import('./generated/prisma/client.js')).toBeDefined();
    expect(import('./generated/prisma/browser.js')).toBeDefined();
    expect(import('./generated/prisma/models/UserProfile.js')).toBeDefined();
  });
});
