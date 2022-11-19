import React from 'react'
import './Sidebar.css';

import { useDispatch, useSelector } from 'react-redux';
import { addRepository, deselectRepository, setActiveRepository } from '../app/viewModel';

import SidebarItem from './sidebarItem/SidebarItem';
import logo from '../assets/images/logo/index.png'

const Sidebar = ({ openSidebar, setOpenSidebar }) => {
  const dispatch = useDispatch();
  const allRepos = useSelector((state) => state.viewModel.allRepos);
  const selectedRepo = useSelector((state) => state.viewModel.selectedRepo);
  
  return (
    <div className={`sidebar${openSidebar ? " active" : ""}`}>
        <SidebarItem image={logo} title="Home" active={ !selectedRepo.active } onClick={(e) => {
          e.preventDefault();
          dispatch(deselectRepository());
          setOpenSidebar(false);
        }} />
        {
          allRepos.length > 0 
          ?
          (<div className="divider"></div>)
          :
          ""
        }
        {
          allRepos.map((repo) => {
            if (typeof repo === 'string' || repo instanceof String) {
              return <SidebarItem id={repo} icon="fa-solid fa-triangle-exclamation danger" title="Broken Repo" active={ false } />
            } else {
              return (<SidebarItem id={repo.url} image={repo.url + '/' + repo.data.icon} title={repo.data.name} active={ selectedRepo.active && selectedRepo.url === repo.url } onClick={(e) => {
                e.preventDefault();
                dispatch(setActiveRepository({ url: repo.url, data: repo.data }));
                setOpenSidebar(false)
              }} />)
            }
          })
        }
        <div className="divider"></div>
        <SidebarItem icon="fa-solid fa-circle-plus" active={false} className="success" onClick={(e) => {
          e.preventDefault();
          let repo = prompt("Please enter the Repository's URL");
          if (repo && repo.length > 0 && repo !== "") {
            dispatch(addRepository({ url: repo }));
          }
        }} />
    </div>
  )
}

export default Sidebar