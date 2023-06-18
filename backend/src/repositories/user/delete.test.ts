/* eslint-disable no-console */
import deleteUser from './delete';

(async () => {
  try {
    const x = await deleteUser({
      userId: '0',
    });
    console.log(x);
  } catch {
    throw new Error('aaa');
  }
})();
