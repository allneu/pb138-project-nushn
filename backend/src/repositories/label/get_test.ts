import { getLabelsOfSubpage } from './get';

(async () => {
  try {
    const up = await getLabelsOfSubpage({ subpageId: '0' });
    const result = up.unwrap();
    const { labels } = result;
    labels.forEach((label) => {
      console.log(label);
    });
    console.log(up);
  } catch (error) {
    console.error('An error occurred while creating the label:', error);
    throw new Error('There was some problem with creating the label');
  }
})();
