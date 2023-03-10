import React, { useState } from 'react'
import { Card, CardMedia, Chip, Paper, Typography } from '@mui/material';
import './panel.scss'
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faCirclePlay);

export default function Panel(props: any) {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const largestImage = () => {
    return props.images.sort((a: any, b: any) => {
      return b.height - a.height;
    })[0]
  }
  
  return (
    <div className='panel-item'>
      <Paper elevation={isHovering ? 10 : 1} variant='elevation' className='MuiPaper-rounded paper-panel'>
        <Card style={{boxShadow: "none"}} sx={{ maxWidth: 375 }} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onClick={() => props.selectedSong(props)}>
          <div className='song-card-continer'>
            <CardMedia
              component="img"
              height={props.height}
              width={props.width}
              image={largestImage().url}
              alt="album image"
              />

              <div className='song-info'>    
                { props.album_type && <Chip label={ props.album_type } variant="outlined" /> }
                <Typography component="div" variant="h5">
                  { props.name }
                </Typography>
                { 
                  props.artists && <Typography variant="subtitle1" color="text.secondary" component="div">
                    {
                      props.artists.map((artist: any) => artist.name).join(', ')
                    }
                  </Typography> 
                }
                {
                  props.description && <Typography variant="subtitle1" color="text.secondary" component="div">
                    {
                      props.description
                    }
                  </Typography>
                }
              </div>
          </div>
        </Card>
      </Paper>
    </div>
  )
}