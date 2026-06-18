import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { interfaceSelector } from 'redux/selectors';

export const getHeaders = () => {
  return undefined;
};

export const Interceptor = ({ children }: { children: React.ReactNode }) => {
  const { colorMode = 'light' } = useSelector(interfaceSelector);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', colorMode);
  }, [colorMode]);

  return <>{children}</>;
};
