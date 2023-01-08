
import axios from 'axios';
import { config } from '../../config';

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
  