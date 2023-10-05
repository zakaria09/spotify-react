import React from 'react';
import {Box, Collapse, Skeleton, Typography} from '@mui/material';
import NavigateSongs from '../Navigation/NavigateSongs';

export const PreviewSection = ({
  children,
  title,
  showMore,
  songData,
  fetchMoreData,
  isLoading,
}: any) => {
  return (
    <>
      {!isLoading ? (
        <div>
          <Typography variant='h2' gutterBottom>
            {title}
          </Typography>

          <NavigateSongs {...songData} fetchMoreData={fetchMoreData} />

          <Collapse sx={{margin: '1.5rem 0'}} in={showMore} collapsedSize={550}>
            {children}
          </Collapse>
        </div>
      ) : (
        <Box>
          <Skeleton height={420} />
        </Box>
      )}
    </>
  );
};
