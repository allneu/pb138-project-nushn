import createLabel from './create';

(async () => {
  try {
    const cr = await createLabel({ subpageId: '0', name: 'My first label' });
    console.log(cr);
  } catch (error) {
    console.error('An error occurred while creating the label:', error);
    throw new Error('There was some problem with creating the label');
  }
})();
