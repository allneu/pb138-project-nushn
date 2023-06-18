import { RoleCreateType, UserIdSubpageIdType } from '../../models';
import { PrismaTransactionHandle } from './types';

const roleCreate = (
  data: RoleCreateType,
  { subpageId }: UserIdSubpageIdType,
  tx: PrismaTransactionHandle,
) => tx.role.create({
  data: { userId: data.userId, subpageId, roleType: data.role },
  include: {
    user: true,
    subpage: true,
  },
});

export default roleCreate;
