import React, { useState } from 'react'
import { Box, Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import AIWritingAssistDialog from './component/AIWritingAssist';

function Part1() {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }
    return (
 <>
     <Box  sx={{
        py:2, px:2, 
        bgcolor:'white',
        borderRadius: 2,
        border: '1px solid #ccc',
     //   boxShadow: 1,
        }}> 
        <Button sx={{my:1}}
         variant="outlined"
        startIcon={<ViewModuleIcon></ViewModuleIcon>} 
         fullWidth>
             Choose Template
        </Button>
        <Button sx={{my:1}}
        onClick={handleClickOpen}
        variant="outlined" 
        startIcon={<AutoFixHighIcon></AutoFixHighIcon>}
         fullWidth>
             AI Writing Assistant
        </Button>
        <AIWritingAssistDialog
       
        open={open}
        onClose={handleClose}
        selectedValue={''}
        ></AIWritingAssistDialog>
     </Box>
</>
    )
}

export default Part1
