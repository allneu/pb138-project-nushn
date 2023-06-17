import { getMultiple, getOne } from './get';

(async () => {
  try {
    const x = await getMultiple({
      subpageId: '0',
    });
    const y = await getOne({
      subpageId: '0',
      taskId: '36b838af-fe4a-4993-a192-7b680f0fd3b3',
    });
    console.log(y);
    console.log(x);
  } catch {
    throw new Error('aaa');
  }
})();
