import update from './update';

(async () => {
  try {
    const x = await update({
      userId: '94ba79b3-ede8-4d91-9e72-a9f09b328b92',
      userName: 'testing username',
      email: 'testing email',
      password: 'testing password',
      avatar: 'avatar avatar',
    });
    console.log(x);
  } catch {
    throw new Error('aaa');
  }
})();
