import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchRepoData } from "./reposAPI";
import data from '../../default.json';

const initialState = {
    loading: false,
    allRepos: JSON.parse(localStorage.getItem('repos')) && JSON.parse(localStorage.getItem('repos')).length > 0 
                    ? JSON.parse(localStorage.getItem('repos')) 
                    : data.map((repo) => {
                        return {
                            active: false,
                            url: repo.charAt(repo.length - 1) !== '/' ? repo + '/' : repo,
                            data: {}
                        }
                    })
}

export const fetchReposAsync = createAsyncThunk(
    'repo/fetch',
    async (repoURL) => {
        const data = await fetchRepoData(repoURL);

        if(data && data !== undefined) {
            return {
                url: repoURL,
                data: data
            };
        } else {
            alert('Repo either doesn\'t exist or is invalid. If someone shared this Repo to you, please contact them to fix their repo.');
        }
    });

const reposSlice = createSlice({
    name: 'repos',
    initialState,
    reducers: {
        loading: (state) => {
            state.loading = !state.loading;
        },
        setActiveRepository: (state, action) => {
            state.allRepos = state.allRepos.map((repo) => {
                let newRepo = repo;

                if(newRepo.url === action.payload.url) {
                    newRepo.active = true;
                } else {
                    newRepo.active = false;
                }

                return newRepo;
            });
        },
        setInactiveAllRepositories: (state) => {
            state.allRepos = state.allRepos.map((repo) => {
                let newRepo = repo;
                if(newRepo.active === true) {
                    newRepo.active = false;
                    return newRepo;
                } else return repo;
            })
        },
        removeRepository: (state, action) => {
            let lStorageRepos = JSON.parse(localStorage.getItem('repos'));

            if(lStorageRepos.length > 0) {
                lStorageRepos = lStorageRepos.filter(repo => repo.url !== action.payload);
    
                state.repoURLs = lStorageRepos;
    
                localStorage.setItem('repos', JSON.stringify(lStorageRepos));

                window.location.reload();
            } else return;
        },
        addEmoteToFavourites: (state, action) => {
            const { url, emote } = action.payload;
            let lStorageRepos = JSON.parse(localStorage.getItem('repos'));

            if(lStorageRepos.length > 0) {
                let repo = lStorageRepos.filter(repo => repo.url === url)[0];
                lStorageRepos = lStorageRepos.filter(repo => repo.url !== url); 
                
                if('favourites' in repo) {
                    repo.favourites.append(emote);
                } else {
                    repo.favourites = [emote];
                }

                lStorageRepos.append(repo);

                state.repoURLs = lStorageRepos;
                localStorage.setItem('repos', JSON.stringify(lStorageRepos));
            } else return;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchReposAsync.fulfilled, (state, action) => {
            if(state.allRepos.filter((repo) => repo.url === action.payload.url).length > 0) {
                let newRepos = state.allRepos.map((repo) => {
                    let newRepo = repo;
                    if(newRepo.url === action.payload.url) {
                        newRepo.data = action.payload.data;
                        return newRepo;
                    } else {
                        return repo;
                    }
                });
                state.allRepos = newRepos;
                newRepos = state.allRepos.map((repo) => {
                    return {
                        ...repo,
                        active: false,
                        data: {}
                    }
                });
                localStorage.setItem('repos', JSON.stringify(newRepos));
            } else {
                let newRepo = {
                    active: false,
                    url: action.payload.url,
                    data: action.payload.data
                }
                state.allRepos.push(newRepo);
                let newRepos = state.allRepos.map((repo) => {
                    return {
                        ...repo,
                        data: {}
                    }
                })
                localStorage.setItem('repos', JSON.stringify(newRepos));
            }
        });
    }
});

export const { addRepository, removeRepository, loading, setActiveRepository, setInactiveAllRepositories } = reposSlice.actions;

export default reposSlice.reducer;