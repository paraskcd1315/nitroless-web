import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchRepoData } from "./reposAPI";

const initialState = {
    loading: false,
    allRepos: JSON.parse(localStorage.getItem('repos')) && JSON.parse(localStorage.getItem('repos')).length > 0 
                    ? JSON.parse(localStorage.getItem('repos')) 
                    : [ { active: false, url: 'https://lillieh001.github.io/nitroless/', data: {} } ]
}

export const fetchReposAsync = createAsyncThunk(
    'repo/fetch',
    async (repoURL) => {
        const data = await fetchRepoData(repoURL);

        return {
            url: repoURL,
            data: data
        };
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
        addRepository: (state, action) => {
            let lStorageRepos = JSON.parse(localStorage.getItem('repos'));

            lStorageRepos = lStorageRepos.length > 0 ? lStorageRepos.append(action.payload) : [ { active: false, url: action.payload, data: {} } ];

            state.repoURLs = lStorageRepos;

            localStorage.setItem('repos', JSON.stringify(lStorageRepos));
        },
        removeRepository: (state, action) => {
            let lStorageRepos = JSON.parse(localStorage.getItem('repos'));

            if(lStorageRepos.length > 0) {
                lStorageRepos = lStorageRepos.filter(repo => repo.url !== action.payload);
    
                state.repoURLs = lStorageRepos;
    
                localStorage.setItem('repos', JSON.stringify(lStorageRepos));
            } else return;
        },
        addEmoteToFavourites: (state, action) => {
            const { url, emote } = action.payload;
            let lStorageRepos = JSON.parse(localStorage.getItem('repos'));

            if(lStorageRepos.length > 0) {
                let repo = lStorageRepos.filter(repo => repo.url === url)[0];
                lStorageRepos = lStorageRepos.filter(repo => repo.url !== url); 
                
                if(Object.keys(repo).contains('favourites')) {
                    repo.favourites.append(emote);
                } else {
                    repo.favourites = [emote];
                }

                lStorageRepos.append(repo);

                state.repoURLs = lStorageRepos;
                localStorage.setItem('repos', JSON.stringify(lStorageRepos));
            } else {
                lStorageRepos = [ {
                    active: false,
                    url: url,
                    data: {},
                    favourites: [ emote ]
                } ];

                state.repoURLs = lStorageRepos;
                localStorage.setItem('repos', JSON.stringify(lStorageRepos));
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchReposAsync.fulfilled, (state, action) => {
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
        });
    }
});

export const { addRepository, removeRepository, loading, setActiveRepository, setInactiveAllRepositories } = reposSlice.actions;

export default reposSlice.reducer;