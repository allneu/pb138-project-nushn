import { useState } from 'react';
import { useParams, Outlet } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import AutosizeInput from 'react-textarea-autosize';

import ViewType from './viewType';
import ActionBar from '../../components/ActionBar/ActionBar.tsx';
import BoardView from '../../components/BoardView/BoardView.tsx';
import ListView from '../../components/ListView/ListView.tsx';

import { subpageFormSchema, SubpageFormDataType } from './subpageSchema';
// replace with subpage object from backend
import defaultSubpageValues from './defaultSubpageValues';

import './Subpage.css';
import subpages from '../../../public/subpages.json';

function Subpage() {
  const { subpageId } = useParams();
  // TODO - load the subpage from backend by its ID
  const subpage = subpages.find((page) => page.id === subpageId);

  const [view, setView] = useState<ViewType>('board');
  const handleViewChange = (newView: ViewType) => {
    setView(newView);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubpageFormDataType>({
    values: defaultSubpageValues,
    resolver: zodResolver(subpageFormSchema),
  });

  const onSubmit = (data: SubpageFormDataType) => {
    console.log(data);
  };

  let viewComponent: JSX.Element;
  if (view === 'board') {
    viewComponent = <BoardView />;
  } else if (view === 'checklist') {
    viewComponent = <ListView type="check" />;
  } else {
    viewComponent = <ListView type="bullet" />;
  }

  return (
    <>
        <div className="subpage">
            <header className="subpage-form">
                <div className="name-wrapper">
                    <i className={subpage?.icon}/>
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
