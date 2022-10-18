import React, { useEffect } from 'react';
import ReactSquircle from 'react-squircle';

import { fetchReposAsync, setActiveRepository, setInactiveAllRepositories } from './reposSlice';
import { useDispatch, useSelector } from 'react-redux';
import './Repos.css';
import logo from '../../assets/images/logo/index.png';
import { selectedRepo } from '../emotes/emotesSlice';

const Repos = ({ openSidebar, homeActive, setHomeActive, setIsLoading, isLoading }) => {
    const allRepos = useSelector((state) => state.repos.allRepos);
    const dispatch = useDispatch();

    useEffect(() => {
        const withoutData = allRepos.filter((repo) => Object.keys(repo.data).length === 0);
        if(withoutData.length === 0) {
            setIsLoading(false);
        }
    }, [allRepos, setIsLoading])

    useEffect(() => {
        allRepos.forEach(repo => {
            dispatch(fetchReposAsync(repo.url));
        });
    // eslint-disable-next-line
    }, [dispatch]);

    return isLoading ?
    <div className={`Repos${openSidebar ? ' sidebarOpened' : ''}`}>
        <div className={`repo${homeActive ? ' active' : ''}`} onClick={(e) => {
                    e.preventDefault();

                    dispatch(selectedRepo({ url: '', urlData: {} }));
                    setHomeActive(true);
                    dispatch(setInactiveAllRepositories());
                }}>
            <div className='pill'>
                <span className='item'></span>
            </div>
            <ReactSquircle imageUrl={logo} width={48} height={48} className='repoImage' />
            <span className='tooltip'>Home</span>
        </div>
        <div className='repo'>
            <div className='divider'></div>
        </div>
        <div className='repo' onClick={(e) => {
            e.preventDefault();

            let url = window.prompt('Enter URL for the Repository');
            url = url.charAt(url.length - 1) !== '/' ? url + '/' : url;
            
            dispatch(fetchReposAsync(url));
        }}>
            <div className='addRepo'>
                <svg width="0" height="0"><defs><clipPath id="squircle" clipPathUnits="objectBoundingBox"><path d="M .5,0 C .1,0 0,.1 0,.5 0,.9 .1,1 .5,1 .9,1 1,.9 1,.5 1,.1 .9,0 .5,0 Z"></path></clipPath></defs></svg>
                <div className='button'>
                    +
                </div>
                <span className='tooltip'>Add Repo</span>
            </div>
        </div>
    </div>
    :

    (
    <div className={`Repos${openSidebar ? ' sidebarOpened' : ''}`}>
        <div className={`repo${homeActive ? ' active' : ''}`} onClick={(e) => {
                    e.preventDefault();

                    dispatch(selectedRepo({ url: '', urlData: {} }));
                    setHomeActive(true);
                    dispatch(setInactiveAllRepositories());
                }}>
            <div className='pill'>
                <span className='item'></span>
            </div>
            <ReactSquircle imageUrl={logo} width={48} height={48} className='repoImage' />
            <span className='tooltip'>Home</span>
        </div>
        <div className='repo'>
            <div className='divider'></div>
        </div>
        {allRepos.map((repo, index) => {
            return (
                <div key={index} className={`repo${repo.active ? ' active' : ''}`} onClick={(e) => {
                    e.preventDefault();

                    dispatch(selectedRepo({ url: repo.url, urlData: repo.data, favourites: repo.favourites }));
                    setHomeActive(false);
                    dispatch(setActiveRepository({url: repo.url}));
                }}>
                    <div className='pill'>
                        <span className='item'></span>
                    </div>
                    <ReactSquircle imageUrl={repo.url + repo.data.icon} alt={repo.name} width={48} height={48} className='repoImage' />
                    <span className='tooltip'>{repo.data.name}</span>
                </div>
            )
        })}
        <div className='repo'>
            <div className='divider'></div>
        </div>
        <div className='repo' onClick={(e) => {
            e.preventDefault();

            let url = window.prompt('Enter URL for the Repository');
            url = url.charAt(url.length - 1) !== '/' ? url + '/' : url;
            
            dispatch(fetchReposAsync(url));
        }}>
            <div className='addRepo'>
                <svg width="0" height="0"><defs><clipPath id="squircle" clipPathUnits="objectBoundingBox"><path d="M .5,0 C .1,0 0,.1 0,.5 0,.9 .1,1 .5,1 .9,1 1,.9 1,.5 1,.1 .9,0 .5,0 Z"></path></clipPath></defs></svg>
                <div className='button'>
                    +
                </div>
                <span className='tooltip'>Add Repo</span>
            </div>
        </div>
    </div>
    )
}

export default Repos