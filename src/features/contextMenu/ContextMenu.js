import React from 'react'
import ReactSquircle from 'react-squircle';
import './ContextMenu.css'

import { useSelector, useDispatch } from 'react-redux';
import { addEmoteToFavourites, removeRepository, removeEmoteFromFavourites } from '../repos/reposSlice';
import { updateFavourites } from '../emotes/emotesSlice';
import { selectedEmote, selectedFavouriteEmote, selectedRepoContext } from './contextMenuSlice';

const ContextMenu = ({ contextmenuActive, setContextMenuActive }) => {
    const allRepos = useSelector(state => state.repos.allRepos)
    const selectedRepo = useSelector(state => state.emotes);
    const selEmote = useSelector(state => state.contextMenu.emote);
    const selRepo = useSelector(state => state.contextMenu.repo);
    const selFavouriteEmote = useSelector(state => state.contextMenu.favouriteEmote)
    const dispatch = useDispatch();
    
    return (
        selEmote.name.length > 0 
        ?
        (
        <div className={`contextMenu${contextmenuActive ? ' active' : ''}`}>
            <div className='contextMenuContainer'>
                <div className='emoteContainer'>
                    <div className="emoteImageContainer">
                        <img src={selectedRepo.urlData.path !== '' ? selectedRepo.url + selectedRepo.urlData.path + '/' + selEmote.name + '.' + selEmote.type : selectedRepo.url + selEmote.name + '.' + selEmote.type} alt={selEmote.name} />
                    </div>
                    <h2 className='emoteName'>{selEmote.name}</h2>
                </div>
                <div className='contextMenuOptions'>
                    <div className='option' onClick={(e) => {
                        e.preventDefault();
                        setTimeout(async () => await window.navigator.clipboard.writeText(selectedRepo.urlData.path !== '' ? selectedRepo.url + selectedRepo.urlData.path + '/' + selEmote.name + '.' + selEmote.type : selectedRepo.url + selEmote.name + '.' + selEmote.type));
                        setTimeout(() => dispatch(selectedEmote({
                            active: false, name: "", type: ""
                        })), 250);
                    }}><i className="fa fa-copy"></i> Copy</div>
                    {/* <div className='option' onClick={(e) => {
                        e.preventDefault();
                        setContextMenuActive(false);
                        dispatch(addEmoteToFavourites({
                            url: selectedRepo.url,
                            emote: {
                                name: selEmote.name,
                                type: selEmote.type
                            }
                        }));
                        setTimeout(() => {
                            dispatch(selectedEmote({
                                active: false, name: "", type: ""
                            }));
                            const repo = allRepos.filter(repo => repo.url === selFavouriteEmote.url)[0];
                            dispatch(updateFavourites(repo.favourites));
                        }, 250);
                    }}><i className="fa fa-star"></i> Add to Favourites</div> */}
                    <div className='option' onClick={(e) => {
                        setContextMenuActive(false);
                        setTimeout(() => dispatch(selectedEmote({
                            active: false, name: "", type: ""
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
                        <img src={selRepo.url + '/' + selRepo.icon} alt={selRepo.name} />
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
                            active: false, name: "", url: "", icon: ""
                        })), 250);
                    }}><i className="fa fa-close"></i> Cancel</div>
                </div>
            </div>
        </div>
        )
        :
        selFavouriteEmote.emoteName.length > 0
        ?
        (
            <div className={`contextMenu${contextmenuActive ? ' active' : ''}`}>
            <div className='contextMenuContainer'>
                <div className='emoteContainer'>
                    <div className="emoteImageContainer">
                        <img src={selFavouriteEmote.path !== '' ? selFavouriteEmote.url + '/' + selFavouriteEmote.path + '/' + selFavouriteEmote.emoteName + '.' + selFavouriteEmote.emoteType : selFavouriteEmote.url + '/' + selFavouriteEmote.emoteName + '.' + selFavouriteEmote.emoteType} alt={selFavouriteEmote.emoteName} />
                    </div>
                    <h2 className='emoteName'>{selFavouriteEmote.emoteName}</h2>
                </div>
                <div className='contextMenuOptions'>
                    <div className='option' onClick={(e) => {
                        e.preventDefault();
                        setTimeout(async () => await window.navigator.clipboard.writeText(selFavouriteEmote.path !== '' ? selFavouriteEmote.url + '/' + selFavouriteEmote.path + '/' + selFavouriteEmote.emoteName + '.' + selFavouriteEmote.emoteType : selFavouriteEmote.url + '/' + selFavouriteEmote.emoteName + '.' + selFavouriteEmote.emoteType));
                        setTimeout(() => dispatch(selectedFavouriteEmote({
                            active: false, name: "", type: "", url: "", path: ""
                        })), 250);
                    }}><i className="fa fa-copy"></i> Copy</div>
                    <div className='option' onClick={(e) => {
                        e.preventDefault();
                        setContextMenuActive(false);
                        dispatch(removeEmoteFromFavourites({
                            url: selFavouriteEmote.url,
                            emote: {
                                name: selFavouriteEmote.emoteName,
                                type: selFavouriteEmote.emoteType
                            }
                        }));
                        setTimeout(() => {
                            const repo = allRepos.filter(repo => repo.url === selFavouriteEmote.url)[0];
                            dispatch(updateFavourites(repo.favourites));
                            dispatch(selectedFavouriteEmote({
                                active: false, name: "", type: "", url: "", path: ""
                            }));
                        }, 250);
                    }}><i className="fa fa-star"></i> Remove from Favourites</div>
                    <div className='option' onClick={(e) => {
                        setContextMenuActive(false);
                        setTimeout(() => dispatch(selectedFavouriteEmote({
                            active: false, name: "", type: "", url: "", path: ""
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