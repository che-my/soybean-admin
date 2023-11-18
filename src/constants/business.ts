import { transformObjectToOption } from './_shared';

export const userRoleLabels: Record<Auth.RoleType, string> = {
  super: 'super-超级管理员',
  admin: 'admin-管理员',
  user: 'user-管理员'
};

export const userRoleOptions = transformObjectToOption(userRoleLabels);

/** 用户性别 */
export const genderLabels: Record<UserManagement.GenderKey, string> = {
  0: '女',
  1: '男'
};
export const genderOptions = transformObjectToOption(genderLabels);

/** 用户状态 */
export const userStatusLabels: Record<UserManagement.UserStatusKey, string> = {
  1: '启用',
  2: '禁用',
  3: '冻结',
  4: '软删除'
};
export const userStatusOptions = transformObjectToOption(userStatusLabels);
