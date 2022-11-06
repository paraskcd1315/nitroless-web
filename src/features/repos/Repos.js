import React, { useEffect } from 'react'
import useLongPress from '../../customHooks/LongPress/useLongPress';
import { fetchReposAsync, setActiveRepository, setInactiveAllRepositories } from './reposSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectedRepo } from '../emotes/emotesSlice';
import { selectedRepoContext } from '../contextMenu/contextMenuSlice';

import './Repos.css';
import logo from '../../assets/images/logo/index.png'; 

const Repos = ({ openSidebar, homeActive, setHomeActive, setIsLoading, isLoading, setContextMenuActive }) => {
    const allRepos = useSelector((state) => state.repos.allRepos);
    const contextMenuActive = useSelector((state) => state.contextMenu.active)
    const dispatch = useDispatch();

    useEffect(() => {
        const withoutData = allRepos.filter((repo) => Object.keys(repo.data).length === 0);
        if(withoutData.length === 0) {
            setIsLoading(false);
        }
    }, [allRepos, setIsLoading]);

    useEffect(() => {
        allRepos.forEach(repo => {
            dispatch(fetchReposAsync(repo.url));
        });
    // eslint-disable-next-line
    }, [dispatch]);

    const longPressProps = useLongPress({
        onClick: (e) => {
            if(!contextMenuActive) {
                console.log(e.target);
                const repo = allRepos.filter((rep) => rep.url === e.target.id)[0];

                dispatch(selectedRepo({ url: repo.url, urlData: repo.data, favourites: repo.favourites, active: true }));
                setHomeActive(false);
                dispatch(setActiveRepository({url: repo.url}));
            }
        },
        onLongPress: (e) => {
            const userAgent = window.navigator.userAgent;
            const iOS = !!userAgent.match(/iPad/i) || !!userAgent.match(/iPhone/i);
            const webkit = !!userAgent.match(/WebKit/i);
            if(iOS && webkit && !userAgent.match(/CriOS/i) && e.target.className.includes("repo")) {
                const repo = allRepos.filter((rep) => rep.url === e.target.id)[0];
                dispatch(selectedRepoContext({
                    active: true,
                    url: repo.url,
                    icon: repo.data.icon,
                    name: repo.data.name
                }));
                setContextMenuActive(true);
            }
        },
    });

    return (
    <div className={`sidebar${openSidebar ? " active" : ""}`}>
        <div className={`sidebar-item${homeActive ? " active" : ""}`}>
            <div className="vertical-line"></div>
            <button className="home sidebar-btn repo" onClick={(e) => {
                e.preventDefault();

                dispatch(selectedRepo({ url: '', urlData: {}, active: false, favourites: [] }));
                dispatch(setInactiveAllRepositories());
                setHomeActive(true);
            }}>
                <img src={logo} alt="logo" />
            </button>
        </div>
        {
            allRepos && allRepos.length > 0 
            ? 
                <div className="divider"></div>
            :
                ""
        }
        {
            allRepos.map((repo, index) => {
                return (
                    <div className={`sidebar-item${repo.active ? " active" : ""}`} key={index}>
                        <div className="vertical-line"></div>
                        <button id={repo.url} className='sidebar-btn repo' {...longPressProps}>
                            <img src={repo.url + repo.data.icon} alt="logo" />
                        </button>
                    </div>
                )
            })
        }
        <div className="divider"></div>
        <div className="sidebar-item">
            <div className="vertical-line"></div>
            <button className="add-repo sidebar-btn repo" onClick={(e) => {
                e.preventDefault();

                let url = window.prompt('Enter URL for the Repository');
                url = url.charAt(url.length - 1) !== '/' ? url + '/' : url;
                
                dispatch(fetchReposAsync(url));
            }}>
                <div className="add-repo-design">+</div>
            </button>
        </div>
    </div>
  )
}

export default Repos