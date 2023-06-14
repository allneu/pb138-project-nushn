import createLabel from './create';
// import deleteLabel from './delete';

(async () => {
  try {
    const cr = await createLabel({ subpageId: '0', name: 'My first label' });
    console.log(cr);
    // const de =
    // await deleteLabel({ subpageId: '0', labelId: 'a4c01a21-3582-409e-9f92-a287ad77b8f8' });
    // console.log(de);
  } catch (error) {
    console.error('An error occurred while creating the label:', error);
    throw new Error('There was some problem with creating the label');
  }
})();
