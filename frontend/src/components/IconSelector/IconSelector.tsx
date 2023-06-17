import { useEffect, useRef, useState } from 'react';

import './IconSelector.css';

// TODO - load from some file
const icons = [
  { src: '/assets/icons/account.svg' },
  { src: '/assets/icons/right-arrow.svg' },
  { src: '/assets/icons/account.svg' },
  { src: '/assets/icons/account.svg' },
  { src: '/assets/icons/account.svg' },
  { src: '/assets/icons/account.svg' },
  { src: '/assets/icons/account.svg' },
  { src: '/assets/icons/account.svg' },
  { src: '/assets/icons/account.svg' },
  { src: '/assets/icons/account.svg' },
  { src: '/assets/icons/account.svg' },
  { src: '/assets/icons/account.svg' },
  { src: '/assets/icons/account.svg' },
  { src: '/assets/icons/account.svg' },
  { src: '/assets/icons/account.svg' },
  { src: '/assets/icons/account.svg' },
  { src: '/assets/icons/account.svg' },
  { src: '/assets/icons/account.svg' },
  { src: '/assets/icons/account.svg' },
  { src: '/assets/icons/account.svg' },
  { src: '/assets/icons/account.svg' },
  { src: '/assets/icons/account.svg' },
  { src: '/assets/icons/account.svg' },
  { src: '/assets/icons/account.svg' },
  { src: '/assets/icons/account.svg' },
  { src: '/assets/icons/account.svg' },
  { src: '/assets/icons/account.svg' },
  { src: '/assets/icons/account.svg' },
  { src: '/assets/icons/account.svg' },
  { src: '/assets/icons/account.svg' },
  { src: '/assets/icons/account.svg' },
  { src: '/assets/icons/account.svg' },
  { src: '/assets/icons/account.svg' },
  { src: '/assets/icons/account.svg' },
  { src: '/assets/icons/account.svg' },
  { src: '/assets/icons/account.svg' },
  { src: '/assets/icons/account.svg' },
  { src: '/assets/icons/account.svg' },
  { src: '/assets/icons/account.svg' },
  { src: '/assets/icons/account.svg' },
  { src: '/assets/icons/account.svg' },
  { src: '/assets/icons/account.svg' },
  { src: '/assets/icons/account.svg' },
  { src: '/assets/icons/account.svg' },
  { src: '/assets/icons/account.svg' },
  { src: '/assets/icons/account.svg' },
  { src: '/assets/icons/account.svg' },
];

type IconSelectorProps = {
  selectedIcon: string;
  setSelectedIcon: (iconSrc: string) => void;
};

function IconSelector({ selectedIcon, setSelectedIcon }: IconSelectorProps) {
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

  const handleIconClick = (iconSrc) => {
    setSelectedIcon(iconSrc);
    toggleDialog();
  };

  return (
    <>
    <div className={`bcg ${open ? '' : 'dialog--close'}`} onClick={toggleDialog}/>
    <div className='icon-selector'>
      <img ref={iconRef} className='icon-selector__icon' src={selectedIcon} onClick={toggleDialog} alt="Selected icon" />
      <div style={{ ...dialogPosition, position: 'absolute' }}>
      <dialog className={`dialog ${open ? '' : 'dialog--close'}`} open={open}>
        <div className="icons-wrapper">
          <div className="icons">
            {icons.map((icon, index) => (
              <img
              className="dialog-icon"
                src={icon.src}
                key={index}
                onClick={() => handleIconClick(icon.src)}
                alt="icon"
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
