import deleteTask from './delete';

(async () => {
  try {
    await deleteTask({
      labelId: '1',
      subpageId: '0',
      taskId: 'a05314cf-949e-4998-bb7e-c317dd1a57ff',
    });
  } catch {
    throw new Error('aaa');
  }
})();
