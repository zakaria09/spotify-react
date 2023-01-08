import React, { useEffect, useMemo } from 'react';
import { Button, Collapse, TextField, Typography } from '@mui/material';
import { getNext, listReleases, savedTracks } from '../api/spotify';
import Panel from './Panel';
import SpotifyPlayer from 'react-spotify-web-playback';
import NavigateSongs from './NavigateSongs';
import { useNavigate } from 'react-router-dom'

export const Dashboard = (props: any) => {
  const navigate = useNavigate();
  const { code } = props;
  
  const [ accessToken, setAccessToken ] = React.useState('');
  const [ newReleases, setReleases ] = React.useState({ items: [], next: '', previous: '' });
  const [ savedSongs, setSavedSongs ] = React.useState({ items: [], next: '', previous: '' });
  const [ showMoreReleases, setShowMoreReleases ] = React.useState(false);
  const [ showMoreSavedSongs, setShowMoreSavedSongs ] = React.useState(false);
  const [ playingSong, setPlayingSong ] = React.useState('');
  const [ play, setPlay ] = React.useState(false);
  const [ search, setSearch ] = React.useState('');

  useEffect(
    () => {
      setAccessToken(code);
      console.log('token', accessToken);
      listRelease();
      listSavedTracks();
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

  const handleChange = (e: React.ChangeEvent<any>) => {
    setSearch(e.target.value);
    console.log(search);
  }


  const styles = {
      bgColor: '#fff',
  };
  return (
    <div>
      <div className='main-container'>
         <TextField
          id="outlined-name"
          label="Name"
          value={search}
          onChange={handleChange}
        />

        <Typography variant="h2" gutterBottom>
            New Releases 🆕
        </Typography>
        
        <NavigateSongs {...newReleases} fetchMoreData={(data: any) => fetchMoreData(data, (nextItems: any) => setReleases(nextItems.albums))} />

        <Collapse in={showMoreReleases} collapsedSize={510}>
            <div className='panel-container' >
                {
                    newReleases.items.length ? 
                        newReleases.items.map((release: any) => <Panel key={release.id} {...release} selectedSong={handleSelectedSong} />) : null
                }
            </div>
        </Collapse>

        <Button variant="outlined" onClick={() => setShowMoreReleases(!showMoreReleases)}>Show { showMoreReleases ? 'Less' : 'More' }</Button>

        <Typography variant="h2" gutterBottom>
            Liked Songs 💙
        </Typography>

        <NavigateSongs {...savedSongs} fetchMoreData={(data: any) => fetchMoreData(data, (nextItems: any) => setSavedSongs(nextItems))} />

        <Collapse in={showMoreSavedSongs} collapsedSize={510}>
            <div className='panel-container' >
                <>
                {
                    savedSongs.items.length ? 
                        savedSongs.items.map((saved: any) => <Panel key={saved.track.id} {...saved.track.album} selectedSong={handleSelectedSong} />) : null
                }
                </>
            </div>
        </Collapse>

        <Button variant="outlined" onClick={() => setShowMoreSavedSongs(!showMoreSavedSongs)}>Show { showMoreSavedSongs ? 'Less' : 'More' }</Button>

        {
          accessToken && (
            <div className="player">
                <SpotifyPlayer
                    token={accessToken}
                    uris={ playingSong ? [`${playingSong}`] : [] }
                    play={play}
                    autoPlay={true}
                    magnifySliderOnHover={true}
                    showSaveIcon={true}
                    styles={styles}
                />;
            </div>
          )
        }
        </div>
    </div>
  )
}
