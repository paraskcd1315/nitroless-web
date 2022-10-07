import React from 'react'
import ReactSquircle from 'react-squircle';
import './ContextMenu.css'

import { useSelector, useDispatch } from 'react-redux';
import { addEmoteToFavourites } from '../repos/reposSlice';
import { updateFavourites } from '../emotes/emotesSlice';

const ContextMenu = ({ contextmenuActive, setContextMenuActive }) => {
    const selectedRepo = useSelector(state => state.emotes);
    const selectedEmote = useSelector(state => state.contextMenu.emote);
    const dispatch = useDispatch();
    
    return (
        <div className={`contextMenu${contextmenuActive && selectedEmote.name !== '' ? ' active' : ''}`}>
            <div className='contextMenuContainer'>
                <div className='emoteContainer'>
                    <ReactSquircle imageUrl={selectedRepo.urlData.path !== '' ? selectedRepo.url + selectedRepo.urlData.path + '/' + selectedEmote.name + '.' + selectedEmote.type : selectedRepo.url + selectedEmote.name + '.' + selectedEmote.type} alt={selectedEmote.name} width={48} height={48} />
                    <h2 className='emoteName'>{selectedEmote.name}</h2>
                </div>
                <div className='contextMenuOptions'>
                    <div className='option' onClick={(e) => {
                        e.preventDefault();
                        window.navigator.clipboard.writeText(selectedRepo.urlData.path !== '' ? selectedRepo.url + selectedRepo.urlData.path + '/' + selectedEmote.name + '.' + selectedEmote.type : selectedRepo.url + selectedEmote.name + '.' + selectedEmote.type);
                    }}><i className="fa fa-copy"></i> Copy</div>
                    <div className='option' onClick={(e) => {
                        e.preventDefault();
                        setContextMenuActive(false);
                        dispatch(addEmoteToFavourites({
                            url: selectedRepo.url,
                            emote: {
                                name: selectedEmote.name,
                                type: selectedEmote.type
                            }
                        }));
                        dispatch(updateFavourites({name: selectedEmote.name, type: selectedEmote.type}));
                    }}><i className="fa fa-star"></i> Add to Favourites</div>
                    <div className='option' onClick={(e) => {
                        setContextMenuActive(false);
                        setTimeout(() => dispatch(selectedEmote({
                            name: "", type: ""
                        })), 250);
                    }}><i className="fa fa-close"></i> Cancel</div>
                </div>
            </div>
        </div>
    )
}

export default ContextMenu