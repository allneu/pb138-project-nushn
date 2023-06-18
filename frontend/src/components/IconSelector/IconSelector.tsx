import { useEffect, useRef, useState } from 'react';

import './IconSelector.css';

type IconSelectorProps = {
  selectedIcon: string;
  setSelectedIcon: (iconName: string) => void;
  icons: { name: string }[];
};

function IconSelector({ selectedIcon, setSelectedIcon, icons }: IconSelectorProps) {
  const [open, setOpen] = useState(false);
  const [dialogPosition, setDialogPosition] = useState({ top: '0px', left: '0px' });
  const iconRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (iconRef.current) {
      const { bottom, left } = iconRef.current.getBoundingClientRect();
      setDialogPosition({ top: `${bottom}px`, left: `${left}px` });
    }
  }, [open]);

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
    <div className='icon-selector'>
      <i ref={iconRef} className={`icon-selector__icon large ${selectedIcon}`} onClick={toggleDialog} />
      <div style={{ ...dialogPosition, position: 'absolute' }}>
        <dialog className={`dialog ${open ? '' : 'dialog--close'}`} open={open}>
          <div className="icons-wrapper">
            <div className="icons">
              {icons.map((icon, index) => (
                <i
                  className={`dialog-icon large ${icon.name}`}
                  key={index}
                  onClick={() => handleIconClick(icon.name)}
                  />
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
