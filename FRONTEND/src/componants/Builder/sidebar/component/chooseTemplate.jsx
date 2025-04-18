import { Box, Dialog, DialogTitle, Grid, List, useMediaQuery, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import React from 'react'
import TemplateCard from './templateCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect , useState} from 'react';
import {cvTemplateAction} from '../../../../redux/store/slices/cvTemplateSlice';

function ChooseTemplateDialog(props) {
    const { onClose, open } = props;

     const muiTheme = useTheme();
      const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
    

    const dispatch = useDispatch();
    const templates = useSelector((state) => state.cvTemplate.cvTemplate);
    useEffect(() => {
        dispatch(cvTemplateAction())
    }, [])   

    const handleClose = () => {
        onClose();
    }
    return (
        <Dialog onClose={handleClose} open={open}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <DialogTitle>Choose Template</DialogTitle>
                <CloseIcon
                   sx={{ cursor: 'pointer', color: '#555', marginRight: '10px' }}
                   onClick={handleClose}
                ></CloseIcon>
            </Box>
            <Grid container spacing={2} sx={{ padding: 2,  justifyContent: 'center'  }}>
                {/* <TemplateCard></TemplateCard> */}
                {templates.map((template, index) => (
                    <Grid item xs={12} sm={6} md={4}  key={index}>
                    <TemplateCard
                        sx={{minWidth:isMobile?'100%':'30%'}}
                        title={template.title}
                        img={template.img}
                        disc={template.disc}
                        pro={template.pro}
                    ></TemplateCard>
                    </Grid>
                ))}

            </Grid>
        </Dialog>
    )
}

export default ChooseTemplateDialog
