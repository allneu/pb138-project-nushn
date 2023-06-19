import { Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import AutosizeInput from 'react-textarea-autosize';

import ActionBar from '../../components/ActionBar/ActionBar.tsx';
import BoardView from '../../components/BoardView/BoardView.tsx';
import ListView from '../../components/ListView/ListView.tsx';
import Notice from '../../components/Notice/Notice.tsx';

import useSubpage from '../../hooks/useSubpage';
import { SubpageFormDataType } from './subpageSchema';

import './Subpage.css';

function Subpage() {
  const {
    view,
    handleViewChange,
    isLoading,
    isError,
    subpage,
    tasks,
    register,
    handleSubmit,
    errors,
  } = useSubpage();

  const onSubmit = (data: SubpageFormDataType) => {
    console.log(data);
  };

  let viewComponent: JSX.Element;
  if (view === 'board') {
    viewComponent = <BoardView labels={subpage ? subpage.data.labels : []}
      tasks={tasks ? tasks.data : []} />;
  } else if (view === 'checklist') {
    viewComponent = <ListView type="check" tasks={tasks ? tasks.data : []} />;
  } else {
    viewComponent = <ListView type="bullet" tasks={tasks ? tasks.data : []} />;
  }

  if (isError) return <Notice message={'An error occured while loading subpage.'} />;
  if (isLoading) return <Notice message={'The subpage is loading ...'} />;

  return (
    <>
        <div className="subpage">
            <header className="subpage-form">
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
            </header>

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
