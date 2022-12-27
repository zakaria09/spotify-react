import { Button, Collapse, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { getAccessToken, getNext, listReleases, savedTracks } from '../api/spotify';
import Panel from './Panel';
import './panel-list.scss';
import InfiniteScroll from 'react-infinite-scroller';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import SpotifyPlayer from 'react-spotify-web-playback';
import NavigateSongs from './NavigateSongs';


export const Body = (props: any) => {
    const { code } = props;

    const access_token = async () => await getAccessToken(code);
    
    const [ accessToken, setAccessToken ] = React.useState('');
    const [ newReleases, setReleases ] = React.useState({ items: [], next: '', previous: '' });
    const [ savedSongs, setSavedSongs ] = React.useState({ items: [], next: '', previous: '' });
    const [ showMoreReleases, setShowMoreReleases ] = React.useState(false);
    const [ showMoreSavedSongs, setShowMoreSavedSongs ] = React.useState(false);
    const [ playingSong, setPlayingSong ] = React.useState('');
    const [ play, setPlay ] = React.useState(false);
  
    useEffect(
      () => {
        access_token().then(token => {
            const { access_token } = token.data;
            setAccessToken(access_token);
            localStorage.setItem('token', access_token);
            listRelease();
            listSavedTracks();
        }).catch(err => {
            (window as any).location = '/';
        });
        },
      []
    )
  
    const listRelease = async () => {
        const releases = await listReleases();
        setReleases(releases.albums);
    };

    const listSavedTracks = async () => {
        const saved = await savedTracks();
        console.log('saved', saved);
        setSavedSongs(saved);
    };


    const fetchMoreData = (url: string, callback: (value: any) => void) => {
        getNext(url).then(nextItems => {
            callback(nextItems);
        });
    }

    const handleSelectedSong = (song: string) => {
        console.log(song);
        setPlay(true);
        setPlayingSong(song);
    };

    const styles = {
        bgColor: '#fff',
    };

    return ( 
        <>
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
                    savedSongs.items.map((saved: any) => console.log(saved.track))
                }
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
                    uris={[`${playingSong}`]}
                    play={play}
                    autoPlay={true}
                    magnifySliderOnHover={true}
                    showSaveIcon={true}
                    styles={styles}
                />;
            </div>
          )
        }
        </>
    );
}

export default Body;