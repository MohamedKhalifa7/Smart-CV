import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';

function ProWarning(props) {
    const { openPaymentDialog, setOpenPaymentDialog } = props;
    const navigate = useNavigate();

    const handleNavigateToPayment = () => {
        navigate('/payment-check'); 
    };
    return (
        <Dialog open={openPaymentDialog} onClose={() => setOpenPaymentDialog(false)}>
        <DialogTitle>Upgrade to Pro</DialogTitle>
        <DialogContent>
            <Typography>
                This feature is available only for Pro users. Please upgrade to access.
            </Typography>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => setOpenPaymentDialog(false)} color="primary">
                Close
            </Button>
            <Button onClick={handleNavigateToPayment} color="primary">
                Go to Payment
            </Button>
        </DialogActions>
    </Dialog>
    )
}

export default ProWarning
