import { SetMetadata } from '@nestjs/common';
import { Role } from '../enum/role.enum';

export const ROLES_KEY = 'roles';
// 反射器
export const Roles = (...roles: Role[]) => {
  return SetMetadata(ROLES_KEY, roles);
};
