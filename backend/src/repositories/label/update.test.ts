import update from './update';

(async () => {
  try {
    const up = await update({
      labelId: '79011b06-c305-4761-8071-b18465cd999a',
      subpageId: '0',
      oldOrderInSubpage: 5,
      newOrderInSubpage: 1,
    });
    console.log(up);
  } catch (error) {
    console.error('An error occurred while creating the label:', error);
    throw new Error('There was some problem with creating the label');
  }
})();
