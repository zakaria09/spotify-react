import React from 'react';
import { getAlbum } from '../api/spotify';
import './body.scss';
import { Dashboard } from './Dashboard';
import { ListAlbum } from './ListAlbum';

export const Body = (props: any) => {

    const [ album, setAlbum ] = React.useState();

    const handleViewAlbum = (url: string) => {
      console.log('body',url);
      getAlbum(url)
        .then(res => setAlbum(res));
    };

    return (
        <>
            {/* Handle Search  */}
            {/* List selected song */}
            { album && <ListAlbum /> }
            { !album && <Dashboard code={props.code} setViewAlbum={handleViewAlbum} /> }
        </>
    );
}

export default Body;