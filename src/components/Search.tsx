import { TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { useDebounce } from 'usehooks-ts'

export const Search = ({ typedSearch }: any) => {
  const [ search, setSearch ] = React.useState('');
  const debouncedValue = useDebounce<string>(search, 1000)

  useEffect(() => {
    typedSearch(debouncedValue);
  }, [debouncedValue])

  const handleChange = (e: React.ChangeEvent<any>) => {
    setSearch(e.target.value);
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
