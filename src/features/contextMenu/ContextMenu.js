import React from 'react'
import ReactSquircle from 'react-squircle';
import './ContextMenu.css'

import { useSelector, useDispatch } from 'react-redux';
import { addEmoteToFavourites } from '../repos/reposSlice';
import { updateFavourites } from '../emotes/emotesSlice';
import { selectedEmote } from './contextMenuSlice';

const ContextMenu = ({ contextmenuActive, setContextMenuActive }) => {
    const selectedRepo = useSelector(state => state.emotes);
    const selEmote = useSelector(state => state.contextMenu.emote);
    const dispatch = useDispatch();
    
    return (
        <div className={`contextMenu${contextmenuActive && selEmote.name !== '' ? ' active' : ''}`}>
            <div className='contextMenuContainer'>
                <div className='emoteContainer'>
                    <ReactSquircle imageUrl={selectedRepo.urlData.path !== '' ? selectedRepo.url + selectedRepo.urlData.path + '/' + selEmote.name + '.' + selEmote.type : selectedRepo.url + selEmote.name + '.' + selEmote.type} alt={selEmote.name} width={48} height={48} />
                    <h2 className='emoteName'>{selEmote.name}</h2>
                </div>
                <div className='contextMenuOptions'>
                    <div className='option' onClick={(e) => {
                        e.preventDefault();
                        window.navigator.clipboard.writeText(selectedRepo.urlData.path !== '' ? selectedRepo.url + selectedRepo.urlData.path + '/' + selEmote.name + '.' + selEmote.type : selectedRepo.url + selEmote.name + '.' + selEmote.type);
                    }}><i className="fa fa-copy"></i> Copy</div>
                    <div className='option' onClick={(e) => {
                        e.preventDefault();
                        setContextMenuActive(false);
                        dispatch(addEmoteToFavourites({
                            url: selectedRepo.url,
                            emote: {
                                name: selEmote.name,
                                type: selEmote.type
                            }
                        }));
                        dispatch(updateFavourites({name: selEmote.name, type: selEmote.type}));
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