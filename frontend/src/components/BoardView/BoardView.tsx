import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import LabelTasks from './LabelTasks.tsx';
import './BoardView.css';
import projectIcons from '../../../public/assets/icons/projectIcons.json';
import { LabelCreateResultType, LabelCreateType, LabelWithTasksType } from '../../models/labelTypes';
import { addSingle } from '../../services/labelsApi';
import { ResponseMulti, ResponseSingle } from '../../models';

type BoardViewProps = {
  labelsWithTasks: LabelWithTasksType[],
};

function BoardView({
  labelsWithTasks,
}: BoardViewProps) {
  const { subpageId } = useParams();
  const queryClient = useQueryClient();

  const newLabelFC = (data: LabelCreateType) => addSingle(subpageId || '', data);

  const { mutateAsync: mutate } = useMutation({
    mutationFn: newLabelFC,
    onSuccess: (newTaskResponse: ResponseSingle<LabelCreateResultType>) => {
      queryClient.setQueryData<ResponseMulti<LabelWithTasksType>>(
        ['subpage', subpageId, 'labelsWithTasks'],
        (oldData) => (oldData ? {
          ...oldData,
          data: [...oldData.data, { ...newTaskResponse.data, tasks: [] }],
        }
          : undefined),
      );
    },
  });

  function handleAddNewLabel() {
    const newLabel: LabelCreateType = {
      name: 'Untitled',
    };
    mutate(newLabel);
  }

  return (
    <div className="">
      <div className="columns-wrapper">
        {
          labelsWithTasks.map((labelWithTasks) => (
            <LabelTasks key={labelWithTasks.id} labelWithTasks={labelWithTasks} />
          ))
        }
        <div className='board-view__new-label' onClick={handleAddNewLabel}>
          <FontAwesomeIcon className='icon' icon={projectIcons['add-new'].split(' ') as IconProp} />
          <span className="text-sm font-semibold hover:bg-gray-200">Add new label</span>
        </div>
      </div>
    </div>
  );
}

export default BoardView;
