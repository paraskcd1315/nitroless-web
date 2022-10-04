import React, { useState } from 'react'
import ReactSquircle from 'react-squircle';

import { useDispatch, useSelector } from 'react-redux';

import './Emotes.css'

const Emotes = () => {
    const url = useSelector(state => state.emotes.url);
    const urlData = useSelector(state => state.emotes.urlData);
    const [ showCopyFeedback, setShowCopyFeedback ] = useState(false);

    if(urlData && Object.keys(urlData).length === 0 && Object.getPrototypeOf(urlData) === Object.prototype) {
        return (
            <div>Welcome to Nitroless</div>
        )
    } else {
        return (
            <div>
                <div className='pageHeader'></div>
                <div className='urlContent'>
                    <div className='emotesHeader'>
                        <ReactSquircle imageUrl={url + urlData.icon} alt={urlData.name} width={64} height={64} className='repoImage' />
                        <h1 className='repoName'>{urlData.name}</h1>
                    </div>
                    <div className='urlDetails'>
                        <h1>Details</h1>
                        <p>URL: <a href={url}>{url}</a></p>
                        <p>Number of Emotes: {urlData.emotes.length}</p>
                    </div>
                    <div className='emotesContent'>
                        <div className='emotesContainer'>
                        {
                            urlData.emotes.map((emote, index) => {
                                return (
                                    <div key={index} className='emoteContainer' onClick={(e) => {
                                        e.preventDefault();
                                        window.navigator.clipboard.writeText(url + urlData.path + '/' + emote.name + '.' + emote.type);
                                    }}>
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