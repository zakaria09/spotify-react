import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '@mui/material'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faChevronLeft, faChevronRight);


export default function NavigateSongs({ next, previous, fetchMoreData }: any): JSX.Element {
  return (
    <div>
      <Button onClick={() => fetchMoreData(previous)} disabled={!previous}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </Button>
      <Button onClick={() => fetchMoreData(next)} disabled={!next}>
          <FontAwesomeIcon icon={faChevronRight} />
      </Button>
    </div>
  )
}
