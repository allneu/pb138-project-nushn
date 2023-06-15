import './Task.css';

function NewTask() {
  return (
    <div className="task">
        <img className="icon rounded" src="/assets/icons/add_gray.svg" alt="Checklist task icon" />
        <span className="task__name task__name--new">Add new task</span>
    </div>
  );
}

export default NewTask;
