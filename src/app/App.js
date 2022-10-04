import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Emotes from '../features/emotes/Emotes';
import Repos from '../features/repos/Repos';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <div className='sidebar'>   
          <Repos />
        </div>
        <div className='mainContent'>
          <Routes>
            <Route path='/' element={<Emotes />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
