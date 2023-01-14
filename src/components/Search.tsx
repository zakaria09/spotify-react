import { TextField } from '@mui/material'
import React from 'react'

export const Search = () => {
  const [ search, setSearch ] = React.useState('');

  const handleChange = (e: React.ChangeEvent<any>) => {
    setSearch(e.target.value);
    console.log(search);
  }

  return (
    <>
      <TextField
        fullWidth
        placeholder="What do you want to listen to?"
        value={search}
        onChange={handleChange}
      />
    </>
  )
}
