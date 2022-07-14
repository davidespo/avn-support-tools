import React from 'react';

import Header from './layout/Header';
import Auth from './layout/Auth';

const App = () => {
  return (
    <div className="container">
      <Header />
      <div className="p-3">
        <Auth />
      </div>
    </div>
  );
};

export default App;
