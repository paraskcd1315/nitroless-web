import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import ContextMenu from '../features/contextMenu/ContextMenu';
import { selectedEmote } from '../features/contextMenu/contextMenuSlice';

import Emotes from '../features/emotes/Emotes';
import Repos from '../features/repos/Repos';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const [ openSidebar, setOpenSidebar ] = useState(false);
  const [ homeActive, setHomeActive ] = useState(true);
  const [ contextmenuActive, setContextMenuActive ] = useState(false);

  useEffect(() => {
    const contextMenuEventHandler = (e) => {
        e.preventDefault();
        if(e.target.className === 'emoteContainer') {
            let emoteURL = e.target.lastChild.lastChild.lastChild.src.split('/')
            let emote = emoteURL[emoteURL.length - 1].split('.');
            dispatch(selectedEmote({
              name: emote[0], type: emote[1]
            }));
            setContextMenuActive(true);
        }
    };

    document.addEventListener('contextmenu', contextMenuEventHandler);

    return () => document.removeEventListener('contextmenu', contextMenuEventHandler)
  }, [dispatch]);

  return (
      <div className='App'>
        <div className='sidebar'>   
          <Repos openSidebar={openSidebar} homeActive={homeActive} setHomeActive={setHomeActive} />
        </div>
        <div className='mainContent'>
          <Emotes openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} setHomeActive={setHomeActive} setContextMenuActive={setContextMenuActive} />
          <ContextMenu contextmenuActive={contextmenuActive} setContextMenuActive={setContextMenuActive} />
        </div>
      </div>
  );
}

export default App;
