import React from 'react';
import LeadForm from './components/LeadForm';
import LeadList from './components/LeadList';

const App = () => {
  return (
    <div>
      <h1>Real Estate Lead Management</h1>
      <LeadForm />
      <LeadList />
    </div>
  );
};

export default App;
