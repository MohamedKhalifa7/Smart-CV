import { Box, Dialog, DialogTitle, List } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import React from 'react'
import TemplateCard from './templateCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect , useState} from 'react';
import {cvTemplateAction} from '../../../../redux/store/slices/cvTemplateSlice';

function ChooseTemplateDialog(props) {
    const { onClose, open } = props;

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
            <List>
                {/* <TemplateCard></TemplateCard> */}
                {templates.map((template, index) => (
                    <TemplateCard
                        key={index}
                        template={template}
                    ></TemplateCard>
                ))}

            </List>
        </Dialog>
    )
}

export default ChooseTemplateDialog
