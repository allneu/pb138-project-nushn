import NewTask from '../Task/NewTask.tsx';
import Task from '../Task/Task.tsx';
import { TaskType } from '../../models/taskTypes';
import ListViewType from './listViewType';
import projectIcons from '../../../public/assets/icons/projectIcons.json';

type ListViewProps = {
  type: ListViewType,
  tasks: TaskType[],
};

function ListView({
  type,
  tasks,
}: ListViewProps) {
  const todoIcon = projectIcons[`${type}-todo`];
  const doneIcon = projectIcons[`${type}-done`];

  return (
      <div className="flex flex-col gap-1 lg:pt-5 overflow-y-auto">
        {tasks.map((task) => (
          <Task key={task.id} task={task} todoIcon={todoIcon} doneIcon={doneIcon}/>
        ))}
        <NewTask />
      </div>
  );
}

export default ListView;
