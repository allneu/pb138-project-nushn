import './Task.css';

type TaskProps = {
  name: string;
  done?: boolean;
};

function Task({ name, done }: TaskProps) {
  let taskIcon;
  let taskStyle;
  let taskEditIcon;

  if (done) {
    taskIcon = (
      <img className="task__icon done" src="../../assets/icons/done.svg" alt="Checklist task icon" />
    );
    taskStyle = 'task__name done';
    taskEditIcon = (
      <img className="flex-none" src="../../assets/icons/edit.svg" alt="Edit task icon"/>
    );
  } else if (done === false) {
    taskIcon = (
      <div className="task__icon todo"></div>
    );
    taskStyle = 'task__name todo';
    taskEditIcon = (
      <img className="flex-none" src="../../assets/icons/edit.svg" alt="Edit task icon"/>
    );
  } else { // done === undefined
    taskIcon = (
      <img className="task__icon new" src="../../assets/icons/add_gray.svg" alt="Checklist task icon" />
    );
    taskStyle = 'task__name new';
    taskEditIcon = (<></>);
  }

  return (
      <div className="task">
        {taskIcon}
        <h3 className={taskStyle}>{name}</h3>
        {taskEditIcon}
      </div>
  );
}

export default Task;
