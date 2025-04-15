import React from 'react'
import { Box } from '@mui/material'
import Part1 from './part1'
import Part2 from './part2'

function SideBar() {
    return (
        <Box            sx={{display: 'flex', flexDirection: 'column', gap: 2,}}
>
         <Box>
          <Part1></Part1>
        </Box>
        <Box>
          <Part2></Part2>
        </Box>
        </Box>
    )
}

export default SideBar
