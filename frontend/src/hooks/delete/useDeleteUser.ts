import { useMutation } from '@tanstack/react-query';
import { UsersApi } from '../../services';
import useAuth from '../useAuth';
import useLogout from '../useLogout';

const UseDeleteUser = () => {
  const { auth } = useAuth();
  const userId = auth?.data.id;
  const { logout } = useLogout();

  const deleteUserFC = () => UsersApi.deleteSingle(userId || '');

  const { mutateAsync: deleteUser } = useMutation({
    mutationFn: deleteUserFC,
    onSuccess: () => { logout(); },
  });

  return { deleteUser };
};

export default UseDeleteUser;
