import React, { useState } from 'react'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './ListAlbum.scss';
import { Button, Typography } from '@mui/material';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowLeft, faPlay, faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { Album } from './song.types';

library.add(faArrowLeft, faPlay, faClock);

export const ListAlbum = (props: {
  back(): void; album: Album
}) => {
  const [isHoveringTrack, setIsHoveringTrack] = useState<number | undefined>();

  const handleMouseOver = (id: number) => {
    setIsHoveringTrack(id);
    console.log('handleMouseOver', id);
  };

  const handleMouseOut = () => {
    setIsHoveringTrack(undefined);
  };
  
  return (
    <>
      <div className='back-btn'>        
        <Button onClick={() => props.back()} size='large'>
          <FontAwesomeIcon icon={faArrowLeft} />
        </Button>
      </div>
      <div className='album-info-container'>
        <img src={props.album.images[0].url} className="album-img" />
        <div>
          <Typography className='album-type' align='left' variant="subtitle2">
            { props.album.album_type }
          </Typography>
          <Typography align='left' variant="h5">
            {props.album.name}
          </Typography>
        </div>
      </div>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align='left'>Title</TableCell>
              <TableCell align="right"><FontAwesomeIcon icon={faClock} /> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.album.tracks.items.map((row) => (
              <TableRow
                key={row.track_number}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                hover
                onMouseOver={() => handleMouseOver(row.track_number)} 
                onMouseOut={handleMouseOut}
              >
                <TableCell component="th" scope="row">
                  { 
                    row.track_number === isHoveringTrack 
                    ? 
                    <FontAwesomeIcon icon={faPlay} /> : 
                    row.track_number 
                  }
                </TableCell>
                <TableCell align='left'>{row.name}</TableCell>
                <TableCell align="right">
                    { moment(row.duration_ms).format('mm:ss') }
                </TableCell>
                
              </TableRow>
          ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
