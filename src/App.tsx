import './App.scss'
import Body from './components/Body'
import { Routes, Route } from "react-router-dom";
import { SpotifyAuth, Scopes } from 'react-spotify-auth';
import 'react-spotify-auth/dist/index.css'
import React from 'react';
import Cookies from 'js-cookie';
import { config } from '../config';
import { createTheme, ThemeProvider } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {

  const [token, setToken] = React.useState(Cookies.get("spotifyAuthToken"));

  return (
      <div className='app'>
        {token ? (
              <>
              <ThemeProvider theme={darkTheme}>
                <Body code={token} />
              </ThemeProvider>
              </>
        ) : (
          // Display the login page
          <SpotifyAuth
            redirectUri='http://localhost:5173'
            noCookie={true}
            clientID={config.api.clientId}
            scopes={[
              Scopes.userReadPrivate,
              'streaming',
              'user-read-email',
              'streaming',
              'user-read-private',
              'user-library-read',
              'user-library-modify',
              'user-read-playback-state',
              'user-modify-playback-state'
            ]} // either style will work
            onAccessToken={(token: string) => {
              setToken(token)
              localStorage.setItem("token", token);
            }}
          />
        )}
      </div>
  )
}

export default App
