import React from 'react';

interface Props {
    children: React.ReactNode
}

const MainLayout: React.FC<Props> = ({children }) => {
  return (
    <div className='max-w-7xl mx-auto'>
      {children}
    </div>
  );
};

export default MainLayout;