
import axios from 'axios';
import { config } from '../../config';
import Cookies from 'js-cookie';

export const axiosInstance = axios.create({
  baseURL: config.api.baseUrl,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    config.headers = { authorization: `Bearer ${localStorage.getItem('token')}` };
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use((response) => {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, (error) => {
  console.log(error);
  window.location.replace(window.location.origin);
  Cookies.remove('spotifyAuthToken')
  return Promise.reject(error);
});

export const getAlbum = async (url: string) => {
  const { data } = await axiosInstance.get(url);
  return data;
};

export const listReleases = async () => {
  const { data } = await axiosInstance.get(config.api.baseUrl + '/browse/new-releases' );
  return data;
};

export const savedTracks = async () => {
  const { data } = await axiosInstance.get(config.api.baseUrl + '/me/tracks' );
  return data;
};

export const getNext = async (url: string) => {
  const { data } = await axiosInstance.get( url );
  return data;
};
  