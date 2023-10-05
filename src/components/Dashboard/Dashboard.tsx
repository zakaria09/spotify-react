import React, {useEffect} from 'react';
import {Button} from '@mui/material';
import {getFeaturedAlbums, listReleases, savedTracks} from '../../api/spotify';
import {PreviewSection} from '../PreviewSection/PreviewSection';
import Panel from '../Panel/Panel';
import {useQuery} from 'react-query';

export const Dashboard = (props: any) => {
  const {code} = props;

  const [accessToken, setAccessToken] = React.useState('');
  const [releaseUrl, setReleaseUrl] = React.useState<undefined | string>();
  const [featuredUrl, setFeaturedUrl] = React.useState<undefined | string>();
  const [savedUrl, setSavedUrl] = React.useState<undefined | string>();

  const [showMoreReleases, setShowMoreReleases] = React.useState(false);
  const [showMoreSavedSongs, setShowMoreSavedSongs] = React.useState(false);

  const {data: releases, isLoading: loadingReleases} = useQuery({
    queryFn: () => listReleases(releaseUrl),
    queryKey: ['releases', releaseUrl],
    keepPreviousData: true,
  });

  const {data: featured, isLoading: loadingFeatured} = useQuery({
    queryFn: () => getFeaturedAlbums(featuredUrl),
    queryKey: ['featured', featuredUrl],
    keepPreviousData: true,
  });

  const {data: savedSongs, isLoading: loadingSavedSongs} = useQuery({
    queryFn: () => savedTracks(savedUrl),
    queryKey: ['savedSongs', savedUrl],
    keepPreviousData: true,
  });

  useEffect(() => {
    setAccessToken(code);
    console.log('token', accessToken);
  }, []);

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
          songData={releases?.albums}
          isLoading={loadingReleases}
          fetchMoreData={(url: string) => setReleaseUrl(url)}
        >
          <div className='panel-container'>
            {releases?.albums.items.length
              ? releases?.albums.items.map((release: any) => (
                  <Panel
                    key={release.id}
                    {...release}
                    selectedSong={handleSelectedSong}
                  />
                ))
              : null}
          </div>
        </PreviewSection>

        <Button
          variant='outlined'
          onClick={() => setShowMoreReleases(!showMoreReleases)}
        >
          Show {showMoreReleases ? 'Less' : 'More'}
        </Button>

        <PreviewSection
          title='Liked Songs 💙'
          showMore={showMoreSavedSongs}
          songData={savedSongs}
          fetchMoreData={(url: string) => setSavedUrl(url)}
          isLoading={loadingSavedSongs}
        >
          <div className='panel-container'>
            {savedSongs?.items.length
              ? savedSongs?.items.map((saved: any) => (
                  <Panel
                    key={saved.track.id}
                    {...saved.track.album}
                    selectedSong={handleSelectedSong}
                  />
                ))
              : null}
          </div>
        </PreviewSection>

        <Button
          variant='outlined'
          onClick={() => setShowMoreSavedSongs(!showMoreSavedSongs)}
        >
          Show {showMoreSavedSongs ? 'Less' : 'More'}
        </Button>

        <PreviewSection
          title={`Featured Albums 🎶 | ${featured?.message}`}
          showMore={true}
          songData={featured?.playlists}
          isLoading={loadingFeatured}
          fetchMoreData={(url: string) => setFeaturedUrl(url)}
        >
          <div className='panel-container'>
            {featured?.playlists.items.length
              ? featured?.playlists.items.map((album: any) => (
                  <Panel
                    key={album.id}
                    {...album}
                    selectedSong={handleSelectedSong}
                  />
                ))
              : null}
          </div>
        </PreviewSection>
      </div>
    </div>
  );
};
