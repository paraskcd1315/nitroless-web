import React, { useState } from 'react'
import ReactSquircle from 'react-squircle';

import { useDispatch, useSelector } from 'react-redux';

import './Emotes.css'
import useWindowDimensions from '../../customHooks/WindowDimensions/useWindowDimensions';
import useLongPress from '../../customHooks/LongPress/useLongPress';

const Emotes = ({ openSidebar, setOpenSidebar }) => {
    const { width, height } = useWindowDimensions();
    const url = useSelector(state => state.emotes.url);
    const urlData = useSelector(state => state.emotes.urlData);
    const [ showCopyFeedback, setShowCopyFeedback ] = useState(false);

    const longPressProps = useLongPress({
        onClick: (ev) => {
            const copyText = ev.target.lastChild.lastChild.lastChild.src;
            window.navigator.clipboard.writeText(copyText);
        },
        onLongPress: (ev) => console.log('on long press', ev),
      });

    if(urlData && Object.keys(urlData).length === 0 && Object.getPrototypeOf(urlData) === Object.prototype) {
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
                                window.navigator.clipboard.writeText(`Checkout the awesome Nitroless Repo - ${urlData.name}` + ' ' + url);
                            }
                        }}>Share</button>
                    </div>
                    <div className='emotesContent'>
                        <div className='emotesContainer'>
                        {
                            urlData.emotes.map((emote, index) => {
                                return (
                                    <div key={index} className='emoteContainer' {...longPressProps}>
                                        <div className='emoteImageContainer'>
                                            <ReactSquircle imageUrl={url + urlData.path + '/' + emote.name + '.' + emote.type} alt={emote.name} width={48} height={48} />
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