import { Fab, Tooltip } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import { useNavigate } from 'react-router-dom';
import SmartToyIcon from '@mui/icons-material/SmartToy';
const FloatingChatButton = () => {
    const navigate = useNavigate();

    return (
        <Tooltip title="Open Chat Assistant" arrow>
            <Fab
                color="primary"
                aria-label="chat"
                onClick={() => navigate('/chatbot')}
                sx={{
                    position: 'fixed',
                    bottom: 24,
                    right: 24,
                    zIndex: 9999,
                    boxShadow: 3,
                }}
            >
                <SmartToyIcon />
                </Fab>
        </Tooltip>
    );
};

export default FloatingChatButton;
