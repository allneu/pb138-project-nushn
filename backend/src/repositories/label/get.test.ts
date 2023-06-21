import get from './get';

(async () => {
  try {
    const up = await get({ subpageId: '0' });
    // eslint-disable-next-line no-console
    console.log(up);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('An error occurred while creating the label:', error);
    throw new Error('There was some problem with creating the label');
  }
})();
