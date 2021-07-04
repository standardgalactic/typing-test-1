import React from 'react';
import clsx from 'clsx';
import AppBar from '../AppBar';

export interface BasicLayoutProps {}

const BasicLayout: React.FC<BasicLayoutProps> = ({ children }) => {
  return (
    <div
      className={clsx(
        'min-h-screen',
        'bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100',
      )}
    >
      <div className={clsx('max-w-4xl mx-auto px-4')}>
        <AppBar />

        {children}
      </div>
    </div>
  );
};

export const withBasicLayout = <WCProps,>(
  WrappedComponent: React.ComponentType<WCProps>,
) => {
  const Component: React.FC<WCProps> = props => {
    return (
      <BasicLayout>
        <WrappedComponent {...props} />
      </BasicLayout>
    );
  };

  if (process.env.NODE_ENV !== 'production') {
    Component.displayName = `withBasicLayout(${WrappedComponent.displayName})`;
  }

  return Component;
};
