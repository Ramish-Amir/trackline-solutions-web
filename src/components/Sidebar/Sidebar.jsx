import { Box } from '@mui/material'
import React from 'react'
import { colors } from '../../assets'

function Sidebar() {
  return (
    <Box
    sx={{ bgcolor: colors.primary, 
        m: "15px", 
        px: "10px", 
        py: "15px",
        borderRadius: "25px",
        minHeight: "calc(100vh - 30px - 30px)",
        color: colors.textLight
    }}
    >Sidebar</Box>
  )
}

export default Sidebar