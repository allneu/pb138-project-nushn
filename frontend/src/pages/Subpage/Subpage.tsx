import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AutosizeInput from 'react-textarea-autosize';

import ActionBar from '../../components/ActionBar/ActionBar.tsx';
import BoardView from '../../components/BoardView/BoardView.tsx';
import ListView from '../../components/ListView/ListView.tsx';
import Notice from '../../components/Notice/Notice.tsx';
import TaskView from '../Views/TaskView/TaskView.tsx';

import useSubpage from '../../hooks/useSubpage';
import useUpdateSubpage from '../../hooks/update/useUpdateSubpage';
import { SubpageFormDataType } from './subpageSchema';

import './Subpage.css';
import UserView from '../Views/UserView/UserView.tsx';
import IconSelector from '../../components/Dialogs/IconSelector/IconSelector.tsx';
import projectIcons from '../../../public/assets/icons/projectIcons.json';
import dialogIcons from '../../../public/assets/icons/dialogIcons.json';
import { SubpageUpdateType } from '../../models/subpageTypes';

function Subpage() {
  const {
    view,
    handleViewChange,
    isLoading,
    isError,
    subpage,
    labelsWithTasks,
    register,
    handleSubmit,
    errors,
  } = useSubpage();

  const { updateSubpage } = useUpdateSubpage();
  const [selectedIcon, setSelectedIcon] = useState<string>(subpage?.data.icon || projectIcons['subpage-default']);

  // Update the selected icon when different subpage is loaded
  useEffect(() => {
    setSelectedIcon(subpage?.data.icon || projectIcons['subpage-default']);
  }, [subpage?.data.icon]);

  const allLabels = labelsWithTasks ? labelsWithTasks.data.map(
    (labelWithTasks) => {
      const { tasks, ...label } = labelWithTasks;
      return label;
    },
  ) : [];

  const allTasks = labelsWithTasks ? labelsWithTasks.data.flatMap(
    (labelWithTasks) => labelWithTasks.tasks,
  ).sort((fst, snd) => fst.orderInList - snd.orderInList) : [];

  const onSubmit = (data: SubpageFormDataType) => {
    const updatedSubpage: SubpageUpdateType = {
      ...data,
      icon: selectedIcon,
    };
    updateSubpage(updatedSubpage);
  };

  let viewComponent: JSX.Element;
  if (view === 'board') {
    viewComponent = <BoardView labelsWithTasks={labelsWithTasks ? labelsWithTasks.data : []} />;
  } else if (view === 'checklist') {
    viewComponent = <ListView type="check" tasks={allTasks} />;
  } else {
    viewComponent = <ListView type="bullet" tasks={allTasks} />;
  }

  if (isError) return <Notice message={'An error occured while loading subpage.'} />;
  if (isLoading) return <Notice message={'The subpage is loading ...'} />;

  return (
    <>
        <div className="subpage">
            <form className="subpage-form">
                <div className="name-wrapper">
                    <div onBlur={handleSubmit(onSubmit)}>
                    <IconSelector selectedIcon={selectedIcon}
                      setSelectedIcon={setSelectedIcon}
                      icons={dialogIcons.subpage} />
                    </div>
                    <div className="input-with-errors">
                        <AutosizeInput
                            className="subpage-name"
                            placeholder='Subpage name'
                            {...register('name', { onBlur: handleSubmit(onSubmit) })}
                        />
                        {errors.name && <span className="validation-error">{errors.name.message}</span>}
                    </div>
                </div>
                <div className="input-with-errors">
                        <AutosizeInput
                            className="subpage-description"
                            placeholder='Subpage description'
                            {...register('description', { onBlur: handleSubmit(onSubmit) })}
                        />
                        {errors.description && <span className="validation-error">{errors.description.message}</span>}
                    </div>
                <ActionBar onViewChange={handleViewChange}/>
            </form>

            <div className="subpage__separator"/>

            <main className="subpage__tasks">
                {viewComponent}
            </main>

            <footer className="subpage__last-edit">
              <span>Last edited x hours ago by @user</span>
            </footer>
        </div>

        <Routes>
          <Route path="task/:taskId" element={<TaskView tasks={allTasks} labels={allLabels} />} />
          <Route path="editUser" element={<UserView />} />
        </Routes>
    </>
  );
}

export default Subpage;
