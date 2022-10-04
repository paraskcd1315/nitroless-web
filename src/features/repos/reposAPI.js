import axios from 'axios';

export const fetchRepoData = async (repoURL) => {
    try {
        const response = await axios.get(repoURL+'index.json');
        return response.data;
    } catch (err) {
        console.error('DEBUG - ', err);
    }
}