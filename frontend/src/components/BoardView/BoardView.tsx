import LabelTasks from './LabelTasks.tsx';
import './BoardView.css';

function BoardView() {
  return (
      <>
        <LabelTasks />
        <LabelTasks />
        <LabelTasks />
        <LabelTasks />
        <LabelTasks />
        <LabelTasks />
        <LabelTasks />
        <LabelTasks />
        <div className='board-view__new-label'>
          <img src="../../assets/icons/add.svg" alt="Add new label icon"/>
          <h3>Add new label</h3>
        </div>
      </>
  );
}

export default BoardView;
