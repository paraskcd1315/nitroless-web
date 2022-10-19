import React, {useEffect, useState} from 'react';
import { ColorRing } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import ContextMenu from '../features/contextMenu/ContextMenu';
import { selectedEmote, selectedRepoContext } from '../features/contextMenu/contextMenuSlice';

import Emotes from '../features/emotes/Emotes';
import Repos from '../features/repos/Repos';
import './App.css';

function App() {
  const allRepos = useSelector(state => state.repos.allRepos); 
  const dispatch = useDispatch();
  const [ openSidebar, setOpenSidebar ] = useState(false);
  const [ homeActive, setHomeActive ] = useState(true);
  const [ contextmenuActive, setContextMenuActive ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    const contextMenuEventHandler = (e) => {
        e.preventDefault();
        if(e.target.className === 'emoteContainer' && e.target.parentNode.className === "emotesContainer") {
            let emoteURL = e.target.lastChild.lastChild.lastChild.src.split('/')
            let emote = emoteURL[emoteURL.length - 1].split('.');
            dispatch(selectedEmote({
              name: emote[0], type: emote[1]
            }));
        }

        if(e.target.className.includes("repo")) {
          const repo = allRepos.filter((rep) => rep.url === e.target.id)[0];
          dispatch(selectedRepoContext({
            url: repo.url,
            icon: repo.data.icon,
            name: repo.data.name
          }));
        }

        setContextMenuActive(true);
    };

    document.addEventListener('contextmenu', contextMenuEventHandler);

    return () => document.removeEventListener('contextmenu', contextMenuEventHandler)
  }, [dispatch, allRepos]);

  return (
      <div className='App'>
        {
        
        isLoading ?
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}>
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={['#5865F2', '#5865F2', '#5865F2', '#5865F2', '#5865F2']}
            /> 
          </div>
        : ""
        
        }

        <div className='sidebar'>   
          <Repos openSidebar={openSidebar} homeActive={homeActive} setHomeActive={setHomeActive} isLoading={isLoading} setIsLoading={setIsLoading} setContextMenuActive={setContextMenuActive} />
        </div>
        <div className='mainContent'>
          <Emotes openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} setHomeActive={setHomeActive} setContextMenuActive={setContextMenuActive} isLoading={isLoading} />
          <ContextMenu contextmenuActive={contextmenuActive} setContextMenuActive={setContextMenuActive} />
        </div>
        
      </div>
  );
}

export default App;
