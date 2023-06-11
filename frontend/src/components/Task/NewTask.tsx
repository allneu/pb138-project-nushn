import './Task.css';

function NewTask() {
  return (
    <div className="task">
        <img className="task__icon new" src="../../assets/icons/add_gray.svg" alt="Checklist task icon" />
        <h3 className="task__name new">Add new task</h3>
    </div>
  );
}

export default NewTask;
