import { extractResourceName } from './extract-resource-name.js';

describe('nestjsNames', () => {
  it.each`
    input
    ${'UserRoleController'}
    ${'UserRoleService'}
    ${'UserRoleResolver'}
    ${'UserRoleModule'}
    ${'UserRoleInterface'}
    ${'UserRoleGuard'}
    ${'UserRoleMiddleware'}
    ${'UserRolePipe'}
    ${'UserRoleDto'}
    ${'UserRoleFilter'}
    ${'UserRoleCreateDto'}
    ${'UserRoleUpdateDto'}
    ${'UserRoleFindManyDto'}
    ${'UserRoleFindOneDto'}
  `('extractResourceName($input) -> UserRole ', ({ input }) => {
    expect(extractResourceName(input)).toEqual('UserRole');
  });
});
