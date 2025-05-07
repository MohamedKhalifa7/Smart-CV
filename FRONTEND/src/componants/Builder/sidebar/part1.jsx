import React, { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import AIWritingAssistDialog from './component/AIWritingAssist';
import ChooseTemplateDialog from './component/chooseTemplate';
import { usePreview } from '../../../context/previewContext';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { useAuth } from '../../../context/Auth/AuthContext';
import ProWarning from '../../../componants/proWarning';

function Part1() {
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [dialogKey, setDialogKey] = useState(0);  // Track the key for the dialog
    const [openPaymentDialog, setOpenPaymentDialog] = useState(false); // State to handle the payment dialog
    const { setGoToPreview } = usePreview();
    const { user } = useAuth();
    const isPro = user.role === 'pro user';
    const handleClickOpen = () => {
        if (isPro) {
            setOpen(true);
        } else {
            setOpenPaymentDialog(true); // Open the payment dialog for non-pro users
        }
    };
    const handleClose = () => {
        setOpen(false);
    }

    const handleClickOpen2 = () => {
        setOpen2(true);
    }

    const handleClose2 = () => {
        setOpen2(false);
    }
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
                >
                    Choose Template
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
                    AI Writing Assistant
                </Button>

                <AIWritingAssistDialog
                    open={open}
                    onClose={handleClose}
                    selectedValue={''}
                />


<ProWarning
                    openPaymentDialog={openPaymentDialog}
                    setOpenPaymentDialog={setOpenPaymentDialog}
                    onClose={() => setOpenPaymentDialog(false)}
                
                ></ProWarning>
            </Box>
        </>
    );
}

export default Part1
