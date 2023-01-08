import React from 'react'

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
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Moment from 'react-moment';
import moment from 'moment';

library.add(faArrowLeft);

interface Album {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: any;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions: any;
  type: string;
  uri: string;
  artists: Artist[];
  tracks: Tracks;
};

interface Tracks {
  href: string;
  items: any[];
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
}

interface Artist {
  external_urls: string;
  followers: any;
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

interface Image {
  url: string;
  height: number;
  width: number;
}

export const ListAlbum = (props: {
  back(): void; album: Album
}) => {
  console.log('ugyuu', props.album);
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
              <TableCell align="right">Duration</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.album.tracks.items.map((row) => (
              <TableRow
                key={row.track_number}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                hover
              >
                <TableCell component="th" scope="row">{row.track_number}</TableCell>
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
