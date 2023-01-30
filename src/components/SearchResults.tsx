import React from 'react'
import { Tracks } from './song.types'
import { PreviewSection } from './PreviewSection'
import { getNext } from '../api/spotify'
import Panel from './Panel'

const SearchResults = ({ tracks, term, setViewAlbum }: { tracks: Tracks | undefined; term: string | undefined; setViewAlbum: any }) => {

  console.log('tracks', tracks, term);

  const [ showMoreSavedSongs, setShowMoreSavedSongs ] = React.useState(false);
  const [ savedSongs, setNextSongs ] = React.useState({ items: [], next: '', previous: '' });

  const fetchMoreData = (url: string, callback: (value: any) => void) => {
    getNext(url).then(nextItems => {
        callback(nextItems);
    });
  }

  const handleSelectedSong = (song: any) => {
    console.log('info', song);
    setViewAlbum(song.href);
  };

  return (
    <>
        <PreviewSection 
          title={`Showing Results: ${term}`}
          showMore={showMoreSavedSongs} 
          songData={tracks} 
          fetchMoreData={(data: any) => fetchMoreData(data, (nextItems: any) => setNextSongs(nextItems))} >
            <div className='panel-container' >
                {
                  tracks &&
                  tracks.items.length ? 
                  tracks.items.map((saved: any) => <Panel key={saved.id} {...saved.album} selectedSong={handleSelectedSong} />) : null
                }
            </div>
        </PreviewSection>
    </>
  )
}

export default SearchResults
