/* eslint-disable no-console */
import getOne from './get';

(async () => {
  try {
    const x = await getOne({
      userId: '0',
    });
    console.log(x);
  } catch {
    throw new Error('aaa');
  }
})();
