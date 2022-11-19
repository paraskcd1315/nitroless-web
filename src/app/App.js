import React from 'react'

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReposAsync, removeRepository } from './viewModel';

import './App.css';

import Sidebar from '../sidebar/Sidebar';
import Home from '../home/Home';

import logo from '../assets/images/logo/firstLetter.png'
import Repo from '../repo/Repo';
import ContextMenu from '../contextMenu/ContextMenu';
import useWindowDimensions from '../customHooks/WindowDimensions';

const App = () => {
  const { width } = useWindowDimensions();

  const [homeActive, isHomeActive] = useState(true);
  const [aboutActive, isAboutActive] = useState(false);
  const [downloadActive, isDownloadActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

  const allRepos = useSelector((state) => state.viewModel.allRepos);
  const selectedRepo = useSelector((state) => state.viewModel.selectedRepo);
  const copied = useSelector((state) => state.viewModel.copied);

  const dispatch = useDispatch();

  useEffect(() => {
    allRepos.forEach(repo => {
        dispatch(fetchReposAsync(repo));
    });
  // eslint-disable-next-line
  }, [dispatch]);

  return (
    <div className="App">
      <div className={`copied${copied ? " active" : ""}`}>Copied</div>
      <ContextMenu />
      <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
      <div className={`mainContent${openSidebar ? " sidebarOpen" : ""}`}>
        <div className="container dark" style={{width: "90%"}}>
            <div className="logoContainer">
              {
                width <= 560 
                ?
                  (<button className={`hamburgerMenu${openSidebar ? " active" : ""}`} onClick={(e) => {
                    e.preventDefault();
                    setOpenSidebar(!openSidebar);
                  }}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </button>)
                :
                  (<div className='empty'></div>)
              }
              <div className="logo">
                <img src={logo} alt="N" /><span>ITROLESS</span>
              </div>
              <div className='empty'></div>
            </div>
            {
              selectedRepo.active
              ?
              (
                <div className="repoButtons">
                  <button className="shareButton btn primary">Share</button>
                  <button className="removeButton btn danger" onClick={(e) => {
                    e.preventDefault();
                    console.log("Clicked")
                    dispatch(removeRepository({ url: selectedRepo.url }))
                  }}>Remove Repo</button>
                </div>
              )
              :
              (
                <div className="homeButtons" onClick={(e) => {
                    e.preventDefault();

                    console.log(e.target.className.includes("aboutButton"));

                    if (e.target.className.includes("homeButton")) {
                      isHomeActive(true);
                      isAboutActive(false);
                      isDownloadActive(false);
                    }

                    if (e.target.className.includes("aboutButton")) {
                      isHomeActive(false);
                      isAboutActive(true);
                      isDownloadActive(false);
                    }

                    if (e.target.className.includes("downloadButton")) {
                      isHomeActive(false);
                      isAboutActive(false);
                      isDownloadActive(true);
                    }

                }}>
                    <button className={`homeButton btn primary${ homeActive ? " active" : "" }`}>Home</button>
                    <button className={`aboutButton btn primary${ aboutActive ? " active" : "" }`}>About</button>
                    <button className={`downloadButton btn primary${ downloadActive ? " active" : "" }`}>Downloads</button>
                </div>
              )
            }
        </div>
        {
          selectedRepo.active
          ?
          <Repo />
          :
          <Home homeActive={homeActive} aboutActive={aboutActive} downloadActive={downloadActive} />
        }
      </div>
    </div>
  )
}

export default App

