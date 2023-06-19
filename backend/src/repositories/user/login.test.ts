/* eslint-disable no-console */
import { login } from './login';

(async () => {
  try {
    const x = await login({
      email: 'testing@gmails.com',
      password: 'testingpassword1',
    });
    console.log(x);
  } catch {
    throw new Error('aaa');
  }
})();
