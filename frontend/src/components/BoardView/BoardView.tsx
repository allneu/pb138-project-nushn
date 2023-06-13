import { useParams } from "react-router-dom";
import LabelTasks from './LabelTasks.tsx';
import './BoardView.css';

// TODO - GET subpage labels from backend including tasks in label order
import labels from '../../../public/labeledTasks.json';

function BoardView() {
  // Get the subpage ID from the URL and load the labels from backend including tasks in label order
  // const { subpageId } = useParams();
  return (
      <>
        {labels.map((label) => (
          <LabelTasks key={label.id} label={label} />
        ))}
        <div className='board-view__new-label'>
          <img src="/assets/icons/add.svg" alt="Add new label icon"/>
          <h3>Add new label</h3>
        </div>
      </>
  );
}

export default BoardView;
