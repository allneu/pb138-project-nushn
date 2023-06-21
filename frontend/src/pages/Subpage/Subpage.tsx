import { Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import AutosizeInput from 'react-textarea-autosize';

import ActionBar from '../../components/ActionBar/ActionBar.tsx';
import BoardView from '../../components/BoardView/BoardView.tsx';
import ListView from '../../components/ListView/ListView.tsx';
import Notice from '../../components/Notice/Notice.tsx';

import useSubpage from '../../hooks/useSubpage';
import useUpdateSubpage from '../../hooks/useUpdateSubpage';
import { SubpageFormDataType } from './subpageSchema';

import './Subpage.css';

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

  const allTasks = labelsWithTasks ? labelsWithTasks.data.flatMap(
    (labelWithTasks) => labelWithTasks.tasks,
  ) : [];

  const onSubmit = (data: SubpageFormDataType) => {
    updateSubpage(data);
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
                    <FontAwesomeIcon className='icon' icon={subpage?.data.icon.split(' ') as IconProp} />
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

        <Outlet />
    </>
  );
}

export default Subpage;
