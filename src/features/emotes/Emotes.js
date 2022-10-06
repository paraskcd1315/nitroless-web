import React, { useState } from 'react'
import ReactSquircle from 'react-squircle';

import { useDispatch, useSelector } from 'react-redux';

import './Emotes.css'
import useWindowDimensions from '../../customHooks/WindowDimensions/useWindowDimensions';
import { removeRepository, setInactiveAllRepositories } from '../repos/reposSlice';
import useLongPress from '../../customHooks/LongPress/useLongPress';
import { selectedEmote } from '../contextMenu/contextMenuSlice';

const Emotes = ({ openSidebar, setOpenSidebar, setHomeActive, setContextMenuActive }) => {
    const { width } = useWindowDimensions();
    const url = useSelector(state => state.emotes.url);
    const urlData = useSelector(state => state.emotes.urlData);

    // TODO
    // const [ showCopyFeedback, setShowCopyFeedback ] = useState(false);

    const longPressProps = useLongPress({
        onClick: (ev) => {
            const copyText = ev.target.lastChild.lastChild.lastChild.src;
            window.navigator.clipboard.writeText(copyText);
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
                    <div className="dashboard"></div>
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
                    <div className='favouriteEmotes'>
                        <h1>★ Favourite Emotes</h1>
                        <div className='favouriteEmotesContainer'>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Emotes