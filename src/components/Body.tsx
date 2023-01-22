import React from 'react';
import { getAlbum, getSearch } from '../api/spotify';
import './body.scss';
import { Dashboard } from './Dashboard';
import { ListAlbum } from './ListAlbum';
import { Player } from './Player';
import { Search } from './Search';

export const Body = (props: any) => {

    const [ album, setAlbum ] = React.useState();

    const handleViewAlbum = (url: string) => {
      getAlbum(url)
        .then(res => setAlbum(res));
    };

    const handleSearch = async (searchVal: string) => {
      const res = await getSearch(searchVal);
      console.log(res);
    }

    return (
        <>
            {/* List selected song */}
            { album && <ListAlbum back={() => setAlbum(undefined)} album={album} /> }
            { 
              !album &&
              <div>
                <Search typedSearch={handleSearch} />
                <Dashboard code={props.code} setViewAlbum={handleViewAlbum} /> 
              </div>
            }
            <Player code={props.code} />
        </>
    );
}

export default Body;