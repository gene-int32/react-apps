import React from 'react';
import {Routes, Route} from 'react-router-dom';
import './App.scss';

import Home from './home/Home';

function App() {
  return (
    <Routes>
      <Route path="/*" element={<Home />}></Route>
    </Routes>
  );
}

export default App;
