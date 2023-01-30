import React from 'react';
import { getAlbum, getSearch } from '../api/spotify';
import './body.scss';
import { Dashboard } from './Dashboard';
import { ListAlbum } from './ListAlbum';
import { Player } from './Player';
import { Search } from './Search';
import SearchResults from './SearchResults';

export const Body = (props: any) => {

    const [ album, setAlbum ] = React.useState();
    const [ searchResults, setSearchResults ] = React.useState();
    const [ searchTerm, setSearchTerm ] = React.useState('');

    const handleViewAlbum = (url: string) => {
      getAlbum(url)
        .then(res => setAlbum(res));
    };

    const handleSearch = async (searchVal: string) => {
      const resp = await getSearch(searchVal);
      console.log('searchTerm', resp);
      setSearchTerm(searchVal);
      setSearchResults(resp.tracks);
    }

    return (
        <>
            {/* List selected song */}
            { album && <ListAlbum back={() => setAlbum(undefined)} album={album} /> }
            { 
              !album &&
              <div>
                <Search typedSearch={handleSearch} />
                { !searchTerm && <Dashboard code={props.code} setViewAlbum={handleViewAlbum} /> }
                { searchTerm && <SearchResults tracks={searchResults} term={searchTerm} setViewAlbum={handleViewAlbum} /> }
              </div>
            }
            <Player code={props.code} />
        </>
    );
}

export default Body;