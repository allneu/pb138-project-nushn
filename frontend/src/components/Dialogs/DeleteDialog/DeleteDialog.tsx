import { useState } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../Dialog.css';
import projectIcons from '../../../../public/assets/icons/projectIcons.json';

type DeleteDialogProps = {
  deleteEntity: () => void;
};

function DeleteDialog({ deleteEntity }: DeleteDialogProps) {
  const [open, setOpen] = useState(false);

  const toggleDialog = () => {
    setOpen(!open);
  };

  const handleDelete = () => {
    deleteEntity();
    toggleDialog();
  };

  return (
    <>
    <div className={`bcg ${open ? '' : 'dialog--close'}`} onClick={toggleDialog}/>
    <div className='self-center'>
      <FontAwesomeIcon className='dialog-icon icon' icon={projectIcons.edit.split(' ') as IconProp} onClick={toggleDialog}/>
      <div className='absolute z-1'>
        <dialog className={`delete-dialog dialog ${open ? '' : 'dialog--close'}`} open={open}>
            <div className="delete" onClick={handleDelete}>
                <FontAwesomeIcon className='icon' icon={projectIcons.delete.split(' ') as IconProp} onClick={toggleDialog}/>
                <p className="hidden lg:block">Delete</p>
            </div>
        </dialog>
      </div>
    </div>
    </>
  );
}

export default DeleteDialog;
