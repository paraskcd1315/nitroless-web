import React, {useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Emotes from '../features/emotes/Emotes';
import Repos from '../features/repos/Repos';
import './App.css';

function App() {
  const [ openSidebar, setOpenSidebar ] = useState(false);

  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
