import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchRepoData } from "./reposAPI";
import { areObjectsEqual } from "../../utils/objectsEqual";
import axios from "axios";

axios.get("https://nitroless.github.io/default.json").then((res) => {
    if (JSON.parse(localStorage.getItem('repos')) && JSON.parse(localStorage.getItem('repos')).length > 0) {
        return
    } else {
        let repos = res.data.map((repo) => ({url: repo, active: false, data: {}}));
        localStorage.setItem('repos', JSON.stringify(repos))
        window.location.reload();
    }
})

const initialState = {
    loading: false,
    allRepos: JSON.parse(localStorage.getItem('repos')) && JSON.parse(localStorage.getItem('repos')).length > 0 
                    ? JSON.parse(localStorage.getItem('repos')) 
                    : [],
    frequentlyUsed: JSON.parse(localStorage.getItem('frequentlyUsed')) && JSON.parse(localStorage.getItem('frequentlyUsed')).length > 0
                    ? JSON.parse(localStorage.getItem('frequentlyUsed'))
                    : []
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
    
                state.allRepos = lStorageRepos;
    
                localStorage.setItem('repos', JSON.stringify(lStorageRepos));
            } else return;
        },
        addEmoteToFavourites: (state, action) => {
            const { url, emote } = action.payload;

            let newRepos = state.allRepos.map((repo) => {
                if(repo.url === url) {
                    repo.favourites = 'favourites' in repo ? [...repo.favourites, emote] : [emote];
                    return repo;
                } else return repo;
            });

            state.allRepos = newRepos;

            localStorage.setItem('repos', JSON.stringify(newRepos.map((repo) => ({...repo, active: false, data: {}}))))
        },
        addToFrequentlyUsed: (state, action) => {
            if(state.frequentlyUsed.length > 0) {
                if(state.frequentlyUsed.filter((freq) => {
                    return areObjectsEqual(freq, action.payload)
                }).length > 0) {
                    state.frequentlyUsed = state.frequentlyUsed.filter((freq) => {
                        return !areObjectsEqual(freq, action.payload)
                    });
                } 

                state.frequentlyUsed.unshift(action.payload);

                if(state.frequentlyUsed.length === 25) {
                    state.frequentlyUsed.slice(-1);
                }
            } else {
                state.frequentlyUsed = [action.payload];
            }

            localStorage.setItem('frequentlyUsed', JSON.stringify(state.frequentlyUsed));
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

export const { addToFrequentlyUsed, addEmoteToFavourites, removeRepository, loading, setActiveRepository, setInactiveAllRepositories } = reposSlice.actions;

export default reposSlice.reducer;