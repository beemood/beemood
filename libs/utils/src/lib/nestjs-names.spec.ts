import { nestjsNames } from './nestjs-names.js';

describe('nestjsNames', () => {
  it.each`
    input
    ${'UserRoleController'}
    ${'UserRoleService'}
    ${'UserRoleResolver'}
    ${'UserRoleModule'}
  `('', ({ input }) => {
    const n = nestjsNames(input);
    expect(n.contant).toEqual('USER_ROLE');
    expect(n.dot).toEqual('user.role');
    expect(n.kebab).toEqual('user-role');
    expect(n.lower).toEqual('user role');
    expect(n.normal).toEqual('user role');
    expect(n.pascal).toEqual('UserRole');
    expect(n.sentence).toEqual('User role');
    expect(n.snake).toEqual('user_role');
    expect(n.title).toEqual('User Role');
    expect(n.upper).toEqual('USER ROLE');
  });
});
