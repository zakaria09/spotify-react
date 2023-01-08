import React from 'react'
import { Collapse, Typography } from '@mui/material';
import NavigateSongs from './NavigateSongs';

export const PreviewSection = ({ children, title, showMore, songData, fetchMoreData }: any) => {
  return (
    <div>
        <Typography variant="h2" gutterBottom>
            { title }
        </Typography>
        
        <NavigateSongs {...songData} fetchMoreData={fetchMoreData} />

        <Collapse sx={{margin: '1.5rem 0'}} in={showMore} collapsedSize={550}>
            { children }
        </Collapse>
    </div>
  )
}
