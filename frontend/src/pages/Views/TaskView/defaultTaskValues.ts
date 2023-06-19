const currentDate = new Date();
const currentDateString = currentDate.toISOString().split('T')[0] ?? '2023-01-01';

const defaultTaskValues = {
  taskName: 'Untitled',
  dueDate: currentDateString,
  content: '',
  labelId: '',
};

export default defaultTaskValues;
