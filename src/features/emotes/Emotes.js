import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToFrequentlyUsed, removeRepository, setInactiveAllRepositories } from '../repos/reposSlice';
import { selectedEmote, selectedFavouriteEmote } from '../contextMenu/contextMenuSlice';
import { areObjectsEqual } from '../../utils/objectsEqual';

import './Emotes.css'
import useWindowDimensions from '../../customHooks/WindowDimensions/useWindowDimensions';
import useLongPress from '../../customHooks/LongPress/useLongPress';
import logo from '../../assets/images/logo/firstLetter.png'; 
import appStore from '../../assets/images/downloadBranding/AppStore.svg'; 

const Emotes = ({ openSidebar, setOpenSidebar, setHomeActive, setContextMenuActive }) => {
  const { width } = useWindowDimensions();
  const allRepos = useSelector(state => state.repos.allRepos);
  const isRepoSelected = useSelector(state => state.emotes.active);
  const url = useSelector(state => state.emotes.url);
  const urlData = useSelector(state => state.emotes.urlData);
  const frequentlyUsed = useSelector(state => state.repos.frequentlyUsed);
  const dispatch = useDispatch();
  const contextMenuActive = useSelector((state) => state.contextMenu.active)
  
  const [isDownloadsActive, setIsDownloadsActive] = useState(false);
  const [isAboutActive, setIsAboutActive] = useState(false);
  const [isHomeActive, setIsHomeActive] = useState(true);

  const longPressProps = useLongPress({
      onClick: (e) => {
        if(!contextMenuActive) {
          console.log(e.target);
          const copyText = e.target.lastChild.lastChild.src;
          setTimeout(async () => await window.navigator.clipboard.writeText(copyText))
          dispatch(addToFrequentlyUsed(copyText))
        }
      },
      onLongPress: (e) => {
        const userAgent = window.navigator.userAgent;
        const iOS = !!userAgent.match(/iPad/i) || !!userAgent.match(/iPhone/i);
        const webkit = !!userAgent.match(/WebKit/i);
        if(iOS && webkit && !userAgent.match(/CriOS/i) && e.target.className === 'emoteContainer' && e.target.parentNode.className.includes("emotesContainer")) {
          const repo = allRepos.filter((rep) => rep.url === e.target.id)[0];
          let emoteURL = e.target.lastChild.lastChild.src.split('/')
          let emote = emoteURL[emoteURL.length - 1].split('.');
          if(repo.favourites && repo.favourites.filter((fav) => areObjectsEqual(fav, {name: emote[0], type: emote[1]})).length > 0) {
              dispatch(selectedFavouriteEmote({
                  url: e.target.id,
                  path: allRepos.filter((rep) => rep.url === e.target.id)[0].data.path,
                  name: e.target.lastChild.lastChild.src.split('/')[e.target.lastChild.lastChild.src.split('/').length - 1].split('.')[0],
                  type: e.target.lastChild.lastChild.src.split('/')[e.target.lastChild.lastChild.src.split('/').length - 1].split('.')[1]
              }));
          } else {
              dispatch(selectedEmote({
                active: true, name: emote[0], type: emote[1]
              }));
          }
          setContextMenuActive(true);
        }

        if(iOS && webkit && !userAgent.match(/CriOS/i) && e.target.className.includes("favouriteEmotesEmoteContainer")) {
          dispatch(selectedFavouriteEmote({
            active: true,
            url: e.target.id,
            path: allRepos.filter((rep) => rep.url === e.target.id)[0].data.path,
            name: e.target.lastChild.lastChild.src.split('/')[e.target.lastChild.lastChild.src.split('/').length - 1].split('.')[0],
            type: e.target.lastChild.lastChild.src.split('/')[e.target.lastChild.lastChild.src.split('/').length - 1].split('.')[1]
          }));
          setContextMenuActive(true);
        }
      },
  });

  return (
    <>
    <div className="logoContainer">
      <div className='header'>
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
          <img src={logo} alt="N" />ITROLESS
        </div>
        <div className="empty"></div>
      </div>
      {
        !isRepoSelected
        ?
          (<div className="homeButtons">
            <button className={`btn home${isHomeActive ? ' active' : ''}`} onClick={(e) => {
              e.preventDefault();
              setIsHomeActive(true);
              setIsAboutActive(false);
              setIsDownloadsActive(false);
            }}>
              Home
            </button>
            <button className={`btn about${isAboutActive ? ' active' : ''}`} onClick={(e) => {
              e.preventDefault();
              setIsHomeActive(false);
              setIsAboutActive(true);
              setIsDownloadsActive(false);
            }}>
              About
            </button>
            <button className={`btn downloads${isDownloadsActive ? ' active' : ''}`}onClick={(e) => {
              e.preventDefault();
              setIsHomeActive(false);
              setIsAboutActive(false);
              setIsDownloadsActive(true);
            }}>
              Downloads
            </button>
          </div>)
        :
          (<div className='repoButtons'>
            <button className="btn">
              <i className="fa fa-share-square-o"></i> Share
            </button>
            <button className="btn danger">
              <i className="fa fa-trash"></i> Remove
            </button>
          </div>)
      }
    </div>
    {
      !isRepoSelected
      ?
        HomeView({isHomeActive: isHomeActive, isAboutActive: isAboutActive, isDownloadsActive: isDownloadsActive, frequentlyUsed: frequentlyUsed, longPressProps: longPressProps})
      :
        RepoView({selectedRepoURL: url, selectedRepoData: urlData, longPressProps: longPressProps})
    }
    </>
  )
}

const HomeView = ({ isHomeActive, isAboutActive, isDownloadsActive, frequentlyUsed, longPressProps }) => {

  if (isHomeActive) {
    return (
      <div className="views homeView">
        <div className="emotesContainer frequentlyUsedEmotesContainer">
          <h2><i className="fa fa-history"></i> Frequently used Emotes</h2>
          {
            frequentlyUsed.length > 0 
            ? 
              (<div className='frequentlyUsedEmotes'>{frequentlyUsed.map((emote, index) => {
                return (
                    <div key={index} id={emote} className='emoteContainer' {...longPressProps} >
                        <div className='emoteImageContainer'>
                            <img src={emote} alt={emote.split('/')[emote.split('/').length - 1].split('.')[0]} />
                        </div>
                    </div>
                )
              }
              )}</div>)
            : 
              (<p>Start using Nitroless to show your frequently used emotes here.</p>)
        }
        </div>
      </div>
    )
  }
  
  if (isAboutActive) {
    return (
      <div className='views aboutView'>
        <div className="aboutContainer">
          <h2><i className="fa fa-info-circle"></i> About</h2>
          <p>Nitroless is a small open source project made by students to help people without Nitro be able to use the community's Emotes to be used in discord. Nitroless is entirely community based requiring the community to make repositories where they can insert their own emotes and share them back to the community. The community uses this service by clicking/tapping on the image and it gets copied in their system's clipboard, allowing them to paste the Emote URL in Discord for the people to see.</p>
        </div>
        <div className="aboutContainer socials">
          <div className='socials Github' onClick={(e) => window.location.href = "https://github.com/Nitroless"}>
              <i className='fa fa-github'></i>
              <span>Github </span>
          </div>
          <div className='socials Link' onClick={(e) => window.location.href = "https://github.com/Nitroless/nitroless.github.io"}>
              <i className='fa fa-link'></i>
              <span>Source Code</span>
          </div>
          <div className='socials Twitter' onClick={(e) => window.location.href = "https://twitter.com/nitroless_"}>
              <i className='fa fa-twitter'></i>
              <span>Twitter </span>
          </div>
        </div>
        <div className="aboutContainer credits">
          <h2><i className="fa fa-info-circle"></i> Credits</h2>
          <div className="credit Alpha">
            <div className='creditContainer'>
              <img src="https://github.com/TheAlphaStream.png" alt="Alpha_Stream" />
              <div className='creditInformation'>
                <span className='creditUserName'>Alpha_Stream</span>
                <span className='creditByLine'>Founder and Designer</span>
                <div className='creditLinks'>
                  <div className='creditLink' onClick={(e) => window.location.href = "https://alphastream.weebly.com/"}>
                      <i className='fa fa-link'></i>
                      <span>Portfolio</span>
                  </div>
                  <div className='creditLink' onClick={(e) => window.location.href = "https://github.com/TheAlphaStream/"}>
                    <i className='fa fa-github'></i>
                    <span>TheAlphaStream</span>
                  </div>
                  <div className='creditLink' onClick={(e) => window.location.href = "https://twitter.com/Kutarin_/"}>
                    <i className='fa fa-twitter'></i>
                    <span>@Kutarin_</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="credit ParasKCD">
            <div className='creditContainer'>
              <img src="https://github.com/paraskcd1315.png" alt="ParasKCD" />
              <div className='creditInformation'>
                <span className='creditUserName'>ParasKCD</span>
                <span className='creditByLine'>Web, iOS and macOS Developer</span>
                <div className='creditLinks'>
                  <div className='creditLink' onClick={(e) => window.location.href = "https://paraskcd.com/"}>
                      <i className='fa fa-link'></i>
                      <span>Portfolio</span>
                  </div>
                  <div className='creditLink' onClick={(e) => window.location.href = "https://github.com/paraskcd1315/"}>
                    <i className='fa fa-github'></i>
                    <span>paraskcd1315</span>
                  </div>
                  <div className='creditLink' onClick={(e) => window.location.href = "https://twitter.com/ParasKCD"}>
                    <i className='fa fa-twitter'></i>
                    <span>@ParasKCD</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="credit LLSC12">
            <div className='creditContainer'>
              <img src="https://github.com/llsc12.png" alt="llsc12" />
              <div className='creditInformation'>
                <span className='creditUserName'>LLSC12</span>
                <span className='creditByLine'>iOS and macOS Developer</span>
                <div className='creditLinks'>
                  <div className='creditLink' onClick={(e) => window.location.href = "https://llsc12.github.io/"}>
                      <i className='fa fa-link'></i>
                      <span>Portfolio</span>
                  </div>
                  <div className='creditLink' onClick={(e) => window.location.href = "https://github.com/llsc12/"}>
                    <i className='fa fa-github'></i>
                    <span>llsc12</span>
                  </div>
                  <div className='creditLink' onClick={(e) => window.location.href = "https://twitter.com/llsc121"}>
                    <i className='fa fa-twitter'></i>
                    <span>@llsc121</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="credit LLSC12">
            <div className='creditContainer'>
              <img src="https://github.com/Superbro9.png" alt="Superbro" />
              <div className='creditInformation'>
                <span className='creditUserName'>Superbro</span>
                <span className='creditByLine'>iOS and macOS Adviser, Quality Control</span>
                <div className='creditLinks'>
                  <div className='creditLink' onClick={(e) => window.location.href = "https://github.com/Superbro9/"}>
                    <i className='fa fa-github'></i>
                    <span>Superbro9</span>
                  </div>
                  <div className='creditLink' onClick={(e) => window.location.href = "https://twitter.com/suuperbro/"}>
                    <i className='fa fa-twitter'></i>
                    <span>@suuperbro</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (isDownloadsActive) {
    return (
      <div className="views downloadsView">
        <div className="downloadsContainer">
          <h2><i className="fa fa-download"></i> Downloads</h2>
          <div className="downloads iOS" onClick={(e) => window.location.href = "https://testflight.apple.com/join/PeIAi5MM"}>
            <span>For iOS and macOS</span>
            <img src={appStore} alt="App Store" />
          </div>
        </div>
      </div>
    )
  }
}

const RepoView = ({selectedRepoURL, selectedRepoData, longPressProps}) => {
  return (
    <div className="views repoView">
      <div className="repoDetailsContainer" onClick={(e) => {
        e.preventDefault();
        window.location.href = selectedRepoURL
      }}>
        <div className="leftDetails">
          <img src={selectedRepoURL + selectedRepoData.icon} alt={selectedRepoData.name} />
          <div className="repoHeader">
            <h4>{selectedRepoData.name}</h4>
            {
              selectedRepoData.author && selectedRepoData.author !== undefined && selectedRepoData.author !== null && selectedRepoData.author.length > 0
              ?
              (<span>By {selectedRepoData.author}</span>)
              :
              ""
            }
          </div>
        </div>
        <div className="rightDetails">
          <span>{selectedRepoData.emotes.length} Emotes</span>
        </div>
      </div>
      <div className="emotesContainer repoEmotesContainer">
        {
          selectedRepoData.emotes.map((emote, index) => {
            return (
              <div key={index} id={selectedRepoURL} className='emoteContainer' {...longPressProps} >
                  <div className='emoteImageContainer'>
                      <img src={selectedRepoData.path !== '' ? selectedRepoURL + selectedRepoData.path + '/' + emote.name + '.' + emote.type : selectedRepoURL + emote.name + '.' + emote.type} alt={emote.name} />
                  </div>
              </div>
          )
          })
        }
      </div>
    </div>
  )
}

export default Emotes