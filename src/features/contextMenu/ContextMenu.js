import React from 'react'
import ReactSquircle from 'react-squircle';
import './ContextMenu.css'

import { useSelector, useDispatch } from 'react-redux';
import { addEmoteToFavourites, removeRepository } from '../repos/reposSlice';
import { updateFavourites } from '../emotes/emotesSlice';
import { selectedEmote, selectedRepoContext } from './contextMenuSlice';

const ContextMenu = ({ contextmenuActive, setContextMenuActive }) => {
    const selectedRepo = useSelector(state => state.emotes);
    const selEmote = useSelector(state => state.contextMenu.emote);
    const selRepo = useSelector(state => state.contextMenu.repo);
    const dispatch = useDispatch();
    
    return (
        selEmote.name.length > 0 
        ?
        (
        <div className={`contextMenu${contextmenuActive ? ' active' : ''}`}>
            <div className='contextMenuContainer'>
                <div className='emoteContainer'>
                    <div className="emoteImageContainer">
                        <ReactSquircle imageUrl={selectedRepo.urlData.path !== '' ? selectedRepo.url + selectedRepo.urlData.path + '/' + selEmote.name + '.' + selEmote.type : selectedRepo.url + selEmote.name + '.' + selEmote.type} alt={selEmote.name} width={48} height={48} />
                    </div>
                    <h2 className='emoteName'>{selEmote.name}</h2>
                </div>
                <div className='contextMenuOptions'>
                    <div className='option' onClick={(e) => {
                        e.preventDefault();
                        setTimeout(async () => await window.navigator.clipboard.writeText(selectedRepo.urlData.path !== '' ? selectedRepo.url + selectedRepo.urlData.path + '/' + selEmote.name + '.' + selEmote.type : selectedRepo.url + selEmote.name + '.' + selEmote.type));
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
        :
        selRepo.name.length > 0 
        ?
        (
        <div className={`contextMenu${contextmenuActive ? ' active' : ''}`}>
            <div className="contextMenuContainer">
                <div className="emoteContainer">
                    <div className="emoteImageContainer">
                        <ReactSquircle imageUrl={selRepo.url + '/' + selRepo.icon} width={64} height={64}/>
                    </div>
                    <h2 className="emoteName">{selRepo.name}</h2>
                </div>
                <div className='contextMenuOptions'>
                    <div className='option' onClick={(e) => {
                        e.preventDefault();
                        dispatch(removeRepository(selRepo.url));
                        setContextMenuActive(false);
                        setTimeout(() => {
                            window.location.reload()
                        }
                        , 250);
                    }}><i className="fa fa-trash"></i> Remove Repo</div>
                    <div className='option' onClick={(e) => {
                        setContextMenuActive(false);
                        setTimeout(() => dispatch(selectedRepoContext({
                            name: "", url: "", icon: ""
                        })), 250);
                    }}><i className="fa fa-close"></i> Cancel</div>
                </div>
            </div>
        </div>
        )
        :
        ""
    )
}

export default ContextMenu