import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { changePasswordFormSchema, ChangePasswordFormDataType } from './ChangePasswordSchema';

type ChangePasswordProps = {
  onClose: () => void;
};

function ChangePassword({ onClose }: ChangePasswordProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormDataType>({
    resolver: zodResolver(changePasswordFormSchema),
  });

  const onSubmit = (data: ChangePasswordFormDataType) => {
    console.log(data);
    // TODO - make sure the old password matches the new one and
    // send an update of the password
    onClose();
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <div className="input-with-errors">
        <input
          className='form__input'
          type="password"
          placeholder="Old password"
          {...register('oldPassword')}
        />
        {errors.oldPassword && <span className="validation-error">{errors.oldPassword.message}</span>}
      </div>

      <div className="input-with-errors">
        <input
          className='form__input'
          type="password"
          placeholder="New password"
          {...register('newPassword')}
        />
        {errors.newPassword && <span className="validation-error">{errors.newPassword.message}</span>}
      </div>

      <button type="submit" className="user-view__btn">
        Change
      </button>
    </form>
  );
}

export default ChangePassword;
