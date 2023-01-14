import React, { useEffect, useMemo } from 'react';
import { Button, Collapse, TextField, Typography } from '@mui/material';
import { getFeaturedAlbums, getNext, listReleases, savedTracks } from '../api/spotify';
import Panel from './Panel';
import { PreviewSection } from './PreviewSection';

export const Dashboard = (props: any) => {

  const { code } = props;
  
  const [ accessToken, setAccessToken ] = React.useState('');
  const [ newReleases, setReleases ] = React.useState({ items: [], next: '', previous: '' });
  const [ savedSongs, setSavedSongs ] = React.useState({ items: [], next: '', previous: '' });
  const [ featuredAlbums, setFeaturedAlbums ] = React.useState({ message: '', playlists: { items: [] }, next: '', previous: '' });
  const [ showMoreReleases, setShowMoreReleases ] = React.useState(false);
  const [ showMoreSavedSongs, setShowMoreSavedSongs ] = React.useState(false);

  useEffect(
    () => {
      setAccessToken(code);
      console.log('token', accessToken);
      listRelease();
      listSavedTracks();
      listFeaturedAlbums();
      },
    []
  )

  const listRelease = async () => {
      const releases = await listReleases();
      setReleases(releases.albums);
  };

  const listSavedTracks = async () => {
      const saved = await savedTracks();
      setSavedSongs(saved);
  };

  const listFeaturedAlbums = async () => {
      const f_albums = await getFeaturedAlbums();
      console.log('f_albums', f_albums);
      setFeaturedAlbums(f_albums);
  };


  const fetchMoreData = (url: string, callback: (value: any) => void) => {
      getNext(url).then(nextItems => {
          callback(nextItems);
      });
  }

  const handleSelectedSong = (song: any) => {
    console.log('info', song);
    props.setViewAlbum(song.href);
      // setPlay(true);
      // setPlayingSong(song);
  };


  return (
    <div>
      <div className='main-container'>
        <PreviewSection 
          title='New Releases 🆕' 
          showMore={showMoreReleases} 
          songData={newReleases} 
          fetchMoreData={(data: any) => fetchMoreData(data, (nextItems: any) => setReleases(nextItems.albums))} >
            <div className='panel-container' >
              {
                newReleases.items.length ? 
                    newReleases.items.map((release: any) => <Panel key={release.id} {...release} selectedSong={handleSelectedSong} />) : null
              }
            </div>
        </PreviewSection>

        <Button variant="outlined" onClick={() => setShowMoreReleases(!showMoreReleases)}>Show { showMoreReleases ? 'Less' : 'More' }</Button>

        <PreviewSection 
          title='Liked Songs 💙' 
          showMore={showMoreSavedSongs} 
          songData={savedSongs} 
          fetchMoreData={(data: any) => fetchMoreData(data, (nextItems: any) => setSavedSongs(nextItems))} >
            <div className='panel-container' >
                {
                  savedSongs.items.length ? 
                      savedSongs.items.map((saved: any) => <Panel key={saved.track.id} {...saved.track.album} selectedSong={handleSelectedSong} />) : null
                }
            </div>
        </PreviewSection>

        <Button variant="outlined" onClick={() => setShowMoreSavedSongs(!showMoreSavedSongs)}>Show { showMoreSavedSongs ? 'Less' : 'More' }</Button>

        <PreviewSection 
          title={`Featured Albums 🎶 | ${featuredAlbums.message}`}
          showMore={true} 
          songData={featuredAlbums.playlists} 
          fetchMoreData={(data: any) => fetchMoreData(data, (nextItems: any) => setFeaturedAlbums(nextItems))} >
            <div className='panel-container' >
                {
                  featuredAlbums.playlists.items.length ? 
                      featuredAlbums.playlists.items.map((album: any) => <Panel key={album.id} {...album} selectedSong={handleSelectedSong} />) : null
                }
            </div>
        </PreviewSection>

        </div>
    </div>
  )
}
