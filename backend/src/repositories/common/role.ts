import { RoleCreateType, UserIdSubpageIdType } from '../../models';
import { PrismaTransactionHandle } from './types';

const roleCreate = (
  data: RoleCreateType,
  params: UserIdSubpageIdType,
  tx: PrismaTransactionHandle,
) => tx.role.create({
  data: { ...params, roleType: data.role },
  include: {
    user: true,
    subpage: true,
  },
});

export default roleCreate;
