import LabelTasks from './LabelTasks.tsx';
import './BoardView.css';

// TODO - GET subpage labels from backend including tasks in label order
import labels from '../../../public/labeledTasks.json';

function BoardView() {
  // Get the subpage ID from the URL and load the labels from backend including tasks in label order
  // const { subpageId } = useParams();
  return (
    <div className="">
      <div className="columns-wrapper">
        {labels.map((label) => (
          <LabelTasks key={label.id} label={label} />
        ))}
        <div className='board-view__new-label'>
          <img className="icon" src="/assets/icons/add.svg" alt="Add new label icon"/>
          <span className="text-sm font-semibold">Add new label</span>
        </div>
      </div>
    </div>
  );
}

export default BoardView;
