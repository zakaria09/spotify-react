import React, { useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

export const Player = (props: any) => {
  const { code } = props;

  const [ accessToken, setAccessToken ] = React.useState('');
  const [ playingSong, setPlayingSong ] = React.useState('');
  const [ play, setPlay ] = React.useState(false);

  useEffect(
    () => {
      setAccessToken(code);
    }
    , []);

  const styles = {
    bgColor: '#fff',
  };
  return (
    <>
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
    </>
  )
}
