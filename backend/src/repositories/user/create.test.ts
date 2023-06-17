import create from './create';

(async () => {
  try {
    const x = await create({
      userName: 'testingname',
      password: 'testingpassword',
      email: 'testing@gmail.com',
    });
    console.log(x);
  } catch {
    throw new Error('aaa');
  }
})();
