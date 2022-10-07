import React, { useState } from 'react'
import ReactSquircle from 'react-squircle';

import { useDispatch, useSelector } from 'react-redux';

import './Emotes.css'
import useWindowDimensions from '../../customHooks/WindowDimensions/useWindowDimensions';
import { addToFrequentlyUsed, removeRepository, setInactiveAllRepositories } from '../repos/reposSlice';
import useLongPress from '../../customHooks/LongPress/useLongPress';
import { selectedEmote } from '../contextMenu/contextMenuSlice';

const Emotes = ({ openSidebar, setOpenSidebar, setHomeActive, setContextMenuActive }) => {
    const { width } = useWindowDimensions();
    const allRepos = useSelector(state => state.repos.allRepos);
    const url = useSelector(state => state.emotes.url);
    const urlData = useSelector(state => state.emotes.urlData);
    const favourites = useSelector(state => state.emotes.favourites);
    const frequentlyUsed = useSelector(state => state.repos.frequentlyUsed);

    // TODO
    // const [ showCopyFeedback, setShowCopyFeedback ] = useState(false);

    const longPressProps = useLongPress({
        onClick: (e) => {
            const copyText = e.target.lastChild.lastChild.lastChild.src;
            window.navigator.clipboard.writeText(copyText);

            let emoteURL = copyText.split('/')
            let emote = emoteURL[emoteURL.length - 1].split('.');
            dispatch(addToFrequentlyUsed({
                url: url,
                path: urlData.path,
                emote: {
                    name: emote[0], type: emote[1]
                }
            }))
        },
        onLongPress: (e) => {
            const userAgent = window.navigator.userAgent;
            const iOS = !!userAgent.match(/iPad/i) || !!userAgent.match(/iPhone/i);
            const webkit = !!userAgent.match(/WebKit/i);
            if(iOS && webkit && !userAgent.match(/CriOS/i)) {
                let emoteURL = e.target.lastChild.lastChild.lastChild.src.split('/')
                let emote = emoteURL[emoteURL.length - 1].split('.');
                dispatch(selectedEmote({
                    name: emote[0], type: emote[1]
                }));
                setContextMenuActive(true);
            }
        },
      });
    
    const dispatch = useDispatch();

    if(urlData && Object.keys(urlData).length === 0 && Object.getPrototypeOf(urlData) === Object.prototype) {
        return (
            <div className='Home'>
                <div className='pageHeader'>
                    <div className={`hamburgerMenu${openSidebar ? ' open' : ''}`} onClick={(e) => {
                        e.preventDefault();
                        setOpenSidebar(state => !state);
                    }}>
                        <div className="icon-left"></div>
                        <div className="icon-right"></div>
                    </div>
                    <h1 className="pageTitle">NITROLESS</h1>
                </div>
                <div className="urlContent">
                    <div className='navigation'>
                        <div className='navItem active'>
                            <span className='navItemName'>Home</span>
                        </div>
                        <div className='navItem'>
                            <span className='navItemName'>About</span>
                        </div>
                        <div className='navItem'>
                            <span className='navItemName'>Downloads</span>
                        </div>
                    </div>
                    <div className='frequentlyUsedEmotes'>
                        <h1><i className="fa fa-history"></i> Frequently used Emotes</h1>
                        <div className='frequentlyUsedEmotesContainer' style={frequentlyUsed.length < 1 ? {display: 'flex'} : {}}>
                            {
                                frequentlyUsed.length > 0 ? frequentlyUsed.map((emote, index) => {
                                    return (
                                        <div key={index} id={emote.url} className='emoteContainer' {...longPressProps} >
                                            <div className='emoteImageContainer'>
                                                <ReactSquircle imageUrl={emote.path !== '' ? emote.url + emote.path + '/' + emote.emote.name + '.' + emote.emote.type : emote.url + emote.emote.name + '.' + emote.emote.type} alt={emote.emote.name} width={48} height={48} />
                                            </div>
                                        </div>
                                    )
                                }) : (<p>Start using Nitroless to show your frequently used emotes here.</p>)
                            }
                        </div>
                    </div>
                    {
                        allRepos.map((repo, index) => {
                            return repo.favourites && repo.favourites.length > 0 ? (
                                <div key={index} className='favouriteEmotes'>
                                    <h1><i className="fa fa-star"></i> {repo.data.name}'s Favourite Emotes</h1>
                                    <div className='favouriteEmotesContainer'>
                                        {
                                            repo.favourites.map((emote, indexx) => {
                                                return (
                                                    <div key={index + indexx} id={repo.url} className='emoteContainer' {...longPressProps} >
                                                        <div className='emoteImageContainer'>
                                                            <ReactSquircle imageUrl={repo.data.path !== '' ? repo.url + repo.data.path + '/' + emote.name + '.' + emote.type : repo.url + emote.name + '.' + emote.type} alt={emote.name} width={48} height={48} />
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            ) : ""
                        })
                    }
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <div className='pageHeader'>
                    <div className={`hamburgerMenu${openSidebar ? ' open' : ''}`} onClick={(e) => {
                        e.preventDefault();
                        setOpenSidebar(state => !state);
                    }}>
                        <div className="icon-left"></div>
                        <div className="icon-right"></div>
                    </div>
                    {width <= 560 ? 
                        (
                            <h1 className="pageTitle">NITROLESS</h1>
                        ) :
                        ('')
                    }
                </div>
                <div className='urlContent'>
                    <div className='emotesHeader'>
                        <ReactSquircle imageUrl={url + urlData.icon} alt={urlData.name} width={64} height={64} className='repoImage' />
                        <h1 className='repoName'>{urlData.name}</h1>
                    </div>
                    <div className='urlDetails'>
                        <h1>Details</h1>
                        <p>URL: <a href={url}>{url}</a></p>
                        <p>Number of Emotes: {urlData.emotes.length}</p>
                        <button className='btn' onClick={(e) => {
                            e.preventDefault();
                            if(window.navigator.share && width <= 560) {
                                window.navigator.share({
                                    title: urlData.name,
                                    text: `Checkout the awesome Nitroless Repo - ${urlData.name} ${url}`,
                                })
                                .then(() => console.log('Shared Successfully'))
                                .catch((err) => console.error('DEBUG', err));
                            } else {
                                window.navigator.clipboard.writeText(`Checkout the awesome Nitroless Repo - ${urlData.name} ${url}`);
                            }
                        }}>Share</button>
                        <button className='btn danger' onClick={(e) => {
                            e.preventDefault();
                            dispatch(removeRepository(url));
                            dispatch(setInactiveAllRepositories());
                            setHomeActive(true);
                        }}>Remove</button>
                    </div>
                    <div className='emotesContent'>
                        <div className='emotesContainer'>
                        {
                            urlData.emotes.map((emote, index) => {
                                return (
                                    <div key={index} id={url} className='emoteContainer' {...longPressProps} >
                                        <div className='emoteImageContainer'>
                                            <ReactSquircle imageUrl={urlData.path !== '' ? url + urlData.path + '/' + emote.name + '.' + emote.type : url + emote.name + '.' + emote.type} alt={emote.name} width={48} height={48} />
                                        </div>
                                    </div>
                                )
                            })
                        }
                        </div>
                    </div>
                    {favourites && favourites.length > 0 ? (
                        <div className='favouriteEmotes'>
                            <h1><i className="fa fa-star"></i> Favourite Emotes</h1>
                            <div className='favouriteEmotesContainer'>
                            {
                                favourites.map((emote, index) => {
                                    return (
                                        <div key={index} id={url} className='emoteContainer' {...longPressProps} >
                                            <div className='emoteImageContainer'>
                                                <ReactSquircle imageUrl={urlData.path !== '' ? url + urlData.path + '/' + emote.name + '.' + emote.type : url + emote.name + '.' + emote.type} alt={emote.name} width={48} height={48} />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            </div>
                        </div>
                    ) : ""}
                </div>
            </div>
        )
    }
}

export default Emotes