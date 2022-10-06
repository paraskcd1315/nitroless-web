import React, {useState} from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

import Emotes from '../features/emotes/Emotes';
import Repos from '../features/repos/Repos';
import './App.css';

function App() {
  const [ openSidebar, setOpenSidebar ] = useState(false);

  return (
    <HashRouter>
      <div className='App'>
        <div className='sidebar'>   
          <Repos openSidebar={openSidebar} />
        </div>
        <div className='mainContent'>
          <Routes>
            <Route path='/' element={<Emotes openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />} />
          </Routes>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
