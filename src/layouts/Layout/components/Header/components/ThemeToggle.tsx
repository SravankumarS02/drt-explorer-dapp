import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { faSun, faSnooze } from 'icons/solid';
import { interfaceSelector } from 'redux/selectors';
import { setColorMode } from 'redux/slices/interface';

export const ThemeToggle = () => {
  const dispatch = useDispatch();
  const { colorMode = 'light' } = useSelector(interfaceSelector);

  const toggleMode = () => {
    dispatch(setColorMode(colorMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <div
      className='d-flex align-items-center justify-content-center cursor-pointer me-3 text-neutral-400 side-action user-select-none'
      onClick={toggleMode}
      role='button'
      title={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
      style={{ width: '24px', height: '24px', fontSize: '1.25rem' }}
    >
      <FontAwesomeIcon icon={colorMode === 'light' ? faSnooze : faSun} />
    </div>
  );
};
