import create from './create';

(async () => {
  try {
    await create({
      taskName: 'taskRepo',
      dueDate: new Date(),
      content: 'uiiiiii',
      creatorId: '0',
      labelId: '1',
    });
  } catch {
    throw new Error('aaa');
  }
})();
