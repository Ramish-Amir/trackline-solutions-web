import { Container } from '@mui/material'
import React from 'react'

function Page(props) {
  return (
    <Container sx={{ width: "100%", m: "20px"}}>{props.children}</Container>
  )
}

export default Page