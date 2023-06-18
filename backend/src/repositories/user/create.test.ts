/* eslint-disable no-console */
import create from './create';

(async () => {
  try {
    const x = await create({
      username: 'testingname',
      password: 'testingpassword',
      email: 'testing@gmail.com',
    });
    console.log(x);
  } catch {
    throw new Error('aaa');
  }
})();
