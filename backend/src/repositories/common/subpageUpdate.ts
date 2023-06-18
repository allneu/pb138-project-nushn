import { UserIdSubpageIdType } from '../../models';
import { PrismaTransactionHandle } from './types';

const subpageEditCreate = async (
  { userId, subpageId }: UserIdSubpageIdType,
  editedAt: Date,
  tx: PrismaTransactionHandle,
) => {
  await tx.subPageEdit.create({
    data: {
      subpageId,
      editorId: userId,
      editedAt,
    },
  });
};

export default subpageEditCreate;
