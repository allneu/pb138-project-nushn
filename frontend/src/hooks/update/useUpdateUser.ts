import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  UserUpdateType,
} from '../../models';
import useAuth from '../useAuth';
import { UsersApi } from '../../services';

const useUpdateUser = () => {
  const { auth } = useAuth();
  const queryClient = useQueryClient();

  const updateUserFn = (
    data: UserUpdateType,
  ) => UsersApi.updateSingle(auth!.data.id, data);

  const { mutateAsync: updateUser } = useMutation({
    mutationFn: updateUserFn,
    onSuccess: () => {
      queryClient.invalidateQueries(['auth']);
    },
  });

  return { updateUser };
};

export default useUpdateUser;
