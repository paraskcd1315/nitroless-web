import React from 'react'
import ReactSquircle from 'react-squircle';
import './ContextMenu.css'

import { useSelector } from 'react-redux';

const ContextMenu = ({ contextmenuActive, setContextMenuActive }) => {
    const selectedRepo = useSelector(state => state.emotes);
    const selectedEmote = useSelector(state => state.contextMenu.emote);
    
    return (
        <div className={`contextMenu${contextmenuActive ? ' active' : ''}`}>
            <div className='contextMenuContainer'>
                <div className='emoteContainer'>
                    <ReactSquircle imageUrl={selectedRepo.urlData.path !== '' ? selectedRepo.url + selectedRepo.urlData.path + '/' + selectedEmote.name + '.' + selectedEmote.type : selectedRepo.url + selectedEmote.name + '.' + selectedEmote.type} alt={selectedEmote.name} width={48} height={48} />
                    <h2 className='emoteName'>{selectedEmote.name}</h2>
                </div>
                <div className='contextMenuOptions'>
                    <div className='option'>✄ Copy</div>
                    <div className='option'>★ Add to Favourites</div>
                    <div className='option' onClick={(e) => {
                        setContextMenuActive(false)
                    }}>⌫ Cancel</div>
                </div>
            </div>
        </div>
    )
}

export default ContextMenu