import deleteLabel from './delete';

(async () => {
  try {
    const de = await deleteLabel({ subpageId: '0', labelId: 'a79cfbf0-a46a-4bb5-a3b9-c473c5622506' });
    console.log(de);
  } catch (error) {
    console.error('An error occurred while creating the label:', error);
    throw new Error('There was some problem with creating the label');
  }
})();
