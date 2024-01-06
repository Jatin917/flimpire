import axios from 'axios';

const movieApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: process.env.REACT_APP_TMDB_KEY,
  },
});
export const fetchToken = async () => {
  try {
    const { data: response } = await movieApi.get('/authentication/token/new');
    const token = response.request_token;
    if (response.success) {
      localStorage.setItem('request_token', token);
      window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${window.location.origin}/approved`;
    }
    console.log(token);
  } catch (error) {
    console.log('error in getting user token');
  }
};
