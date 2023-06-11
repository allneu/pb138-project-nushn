import './Task.css';

type TaskProps = {
  name: string;
  done?: boolean;
};

function Task({ name, done }: TaskProps) {
  let taskIcon;
  let taskStyle;

  if (done) {
    taskIcon = (<img className="task__icon done" src="../../assets/icons/done.svg" alt="Checklist task icon" />);
    taskStyle = 'task__name done';
  } else {
    taskIcon = (<div className="task__icon todo"></div>);
    taskStyle = 'task__name todo';
  }

  return (
      <div className="task">
        {taskIcon}
        <h3 className={taskStyle}>{name}</h3>
        <img className="flex-none" src="../../assets/icons/edit.svg" alt="Edit task icon"/>
      </div>
  );
}

export default Task;
