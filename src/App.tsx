import React from 'react';
import TestPage from './pages/TestPage';
import { withBasicLayout } from './components/BasicLayout';

function App() {
  return <TestPage />;
}

export default withBasicLayout(App);
