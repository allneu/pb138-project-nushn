/* eslint-disable no-console */
import create from './create';

(async () => {
  try {
    const x = await create({
      username: 'testingname1',
      password: 'testingpassword1',
      email: 'testing@gmails.com',
    });
    console.log(x);
  } catch {
    throw new Error('aaa');
  }
})();
