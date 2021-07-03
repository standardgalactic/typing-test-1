import React from 'react';
import clsx from 'clsx';

function App() {
  return (
    <div className={clsx('h-screen', 'bg-gray-800 text-white', 'p-2')}>
      <h1 className={clsx('text-5xl font-medium')}>Typing Test</h1>
    </div>
  );
}

export default App;
