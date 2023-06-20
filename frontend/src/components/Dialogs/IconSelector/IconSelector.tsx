import { useState } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../Dialog.css';

type IconSelectorProps = {
  selectedIcon: string;
  setSelectedIcon: (iconName: string) => void;
  icons: { name: string }[];
};

function IconSelector({ selectedIcon, setSelectedIcon, icons }: IconSelectorProps) {
  const [open, setOpen] = useState(false);

  const toggleDialog = () => {
    setOpen(!open);
  };

  const handleIconClick = (iconName) => {
    setSelectedIcon(iconName);
    toggleDialog();
  };

  return (
    <>
    <div className={`bcg ${open ? '' : 'dialog--close'}`} onClick={toggleDialog}/>
    <div className='icon-selector self-center'>
      <FontAwesomeIcon className='icon-selector__icon icon' icon={selectedIcon.split(' ') as IconProp} onClick={toggleDialog}/>
      <div className='absolute z-1'>
        <dialog className={`dialog ${open ? '' : 'dialog--close'}`} open={open}>
          <div className="icons-wrapper">
            <div className="icons">
              {icons.map((icon, index) => (
                <FontAwesomeIcon className='dialog-icon icon'
                      key={index}
                      icon={icon.name.split(' ') as IconProp}
                      onClick={() => handleIconClick(icon.name)}/>
              ))}
            </div>
          </div>
          <p className="close-btn" onClick={toggleDialog}>Close</p>
        </dialog>
      </div>
    </div>
    </>
  );
}

export default IconSelector;
