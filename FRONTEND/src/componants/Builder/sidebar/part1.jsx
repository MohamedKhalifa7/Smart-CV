import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import AIWritingAssistDialog from './component/AIWritingAssist';
import ChooseTemplateDialog from './component/chooseTemplate';
import { usePreview } from '../../../context/previewContext';
import { useTranslation } from 'react-i18next'; 

function Part1() {
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [dialogKey, setDialogKey] = useState(0);  // Track the key for the dialog
    const { t } = useTranslation();
    const { setGoToPreview } = usePreview();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen2 = () => {
        setGoToPreview(false);
        setOpen2(false);
        
        // Increment the dialog key to force a remount
        setDialogKey(prevKey => prevKey + 1);

        // Use a small delay if needed to ensure the state is reset first
        setTimeout(() => {
            setOpen2(true);
        }, 0);
    };

    const handleClose2 = () => {
        setOpen2(false);
    };

    return (
        <>
            <Box sx={{
                py: 2, px: 2,
                bgcolor: 'white',
                borderRadius: 2,
                border: '1px solid #ccc',
            }}>
                <Button sx={{ my: 1 }}
                    onClick={handleClickOpen2}
                    variant="outlined"
                    startIcon={<ViewModuleIcon />}
                    fullWidth
                > {t('chooseTemplate')} 
                </Button>

                <ChooseTemplateDialog
                    open={open2}
                    onClose={handleClose2}
                    key={dialogKey}  // Set the key to force remount on state change
                />

                <Button sx={{ my: 1 }}
                    onClick={handleClickOpen}
                    variant="outlined"
                    startIcon={<AutoFixHighIcon />}
                    fullWidth
                >
                     {t('aiWritingAssistant')}
                </Button>

                <AIWritingAssistDialog
                    open={open}
                    onClose={handleClose}
                    selectedValue={''}
                />
            </Box>
        </>
    );
}

export default Part1;
