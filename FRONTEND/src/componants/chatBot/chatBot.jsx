import {
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    Avatar,
    Fab,
    useTheme,
    Tooltip
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/Auth/AuthContext';
import ProWarning from '../proWarning';

const ChatBot = () => {
    const theme = useTheme();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [chatId, setChatId] = useState(null);
    const [open, setOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false); // <-- Typing state
    const navigate = useNavigate();
    const messagesEndRef = useRef(null);
    const { user } = useAuth();
    const isPro = user?.role === 'pro user';
    const [openPaymentDialog, setOpenPaymentDialog] = useState(false);

    const handleChatButtonClick = () => {
        if (!user) {
            setOpen(true);
            return;
        }

        if (isPro) {
            setOpen(true);
        } else {
            setOpenPaymentDialog(true);
        }
    };

    useEffect(() => {
        const createChat = async () => {
            try {
                const res = await axios.post(
                    'http://localhost:3001/api/chatbot/create',
                    { messages },
                    { withCredentials: true }
                );
                setChatId(res.data._id);
            } catch (err) {
                if (err.response?.status === 401) {
                    setErrorMessage('🔒 You need to log in to start the chatbot.');
                } else {
                    console.error('Error creating chat:', err);
                }
            }
        };
        createChat();
    }, []);

    const handleSend = async () => {
        if (!input.trim() || !chatId) return;

        setErrorMessage('');
        const userMsg = { type: 'user', text: input };
        setMessages((prev) => [...prev, userMsg]);
        setInput('');
        setIsTyping(true); // <-- Show "Typing..."

        try {
            const res = await axios.post(
                'http://localhost:3001/api/chatbot',
                { message: input, chatId },
                { withCredentials: true }
            );

            const botMsg = { type: 'bot', text: res.data.response };
            setMessages((prev) => [...prev, botMsg]);
        } catch (err) {
            console.error('Error sending message:', err);
            if (err.response && err.response.status === 401) {
                setErrorMessage('🔒 You need to log in to use the chatbot.');
            } else if (err.code === 'ERR_NETWORK') {
                setErrorMessage('❌ Network error. Please check your internet connection.');
            } else {
                setErrorMessage('⚠️ Something went wrong. Please try again later.');
            }
        } finally {
            setIsTyping(false); // <-- Hide "Typing..."
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    return (
        <>
            <Tooltip title="Open Chat Assistant" arrow>
                <Box
                    sx={{
                        display: open ? 'none' : 'block',
                        position: 'fixed',
                        bottom: 24,
                        right: 24,
                        zIndex: 999,
                    }}
                >
                    <Fab color="primary" onClick={handleChatButtonClick}>
                        <SmartToyIcon />
                    </Fab>
                </Box>
            </Tooltip>

            {open && (
                <Paper
                    elevation={4}
                    sx={{
                        position: 'fixed',
                        bottom: 10,
                        right: 30,
                        width: 380,
                        height: 500,
                        borderRadius: 3,
                        zIndex: 998,
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                    }}
                >
                    <Box
                        sx={{
                            height: 50,
                            background: 'linear-gradient(135deg, #6216b4 0%, #8e2de2 100%)',
                            color: 'white',
                            px: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Avatar
                            src="/Images/bot.jpg"
                            sx={{ width: 30, height: 30, mr: 1 }}
                        />
                        <Typography fontWeight="bold" sx={{ color: 'white' }}>ChatBot</Typography>
                        <Button
                            onClick={() => setOpen(false)}
                            sx={{ minWidth: 'auto', color: 'white' }}
                        >
                            <CloseIcon />
                        </Button>
                    </Box>

                    <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 1 }}>
                        {messages.map((msg, index) => (
                            <Box
                                key={index}
                                sx={{
                                    display: 'flex',
                                    justifyContent:
                                        msg.type === 'user' ? 'flex-end' : 'flex-start',
                                    mb: 1,
                                }}
                            >
                                {msg.type === 'bot' && (
                                    <Avatar
                                        src="/Images/bot.jpg"
                                        sx={{ width: 30, height: 30, mr: 1, alignSelf: 'flex-end' }}
                                    />
                                )}

                                <Paper
                                    sx={{
                                        p: 1,
                                        maxWidth: '70%',
                                        borderRadius: 3,
                                        background:
                                            msg.type === 'user'
                                                ? 'linear-gradient(135deg, #6a11cb 0%, #8e2de2 100%)'
                                                : theme.palette.background.default,
                                        color:
                                            msg.type === 'user'
                                                ? 'white'
                                                : theme.palette.text.primary,
                                    }}
                                >
                                    <Typography variant="body2">{msg.text}</Typography>
                                </Paper>
                                <div ref={messagesEndRef} />
                            </Box>
                        ))}

                        {/* Typing Indicator */}
                        {isTyping && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    mb: 1,
                                }}
                            >
                                <Avatar
                                    src="/Images/bot.jpg"
                                    sx={{ width: 30, height: 30, mr: 1, alignSelf: 'flex-end' }}
                                />
                                <Paper
                                    sx={{
                                        p: 1,
                                        maxWidth: '70%',
                                        borderRadius: 3,
                                        background: theme.palette.background.default,
                                        color: theme.palette.text.primary,
                                    }}
                                >
                                    <Typography variant="body2" fontStyle="italic">Typing...</Typography>
                                </Paper>
                            </Box>
                        )}
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            px: 1,
                            py: 1,
                            borderTop: '1px solid #ccc',
                        }}
                    >
                        {errorMessage && (
                            <Typography
                                variant="body2"
                                color="error"
                                sx={{ mb: 1 }}
                            >
                                {errorMessage}{' '}
                                <span
                                    onClick={() => navigate('/login')}
                                    style={{ color: 'purple', cursor: 'pointer' }}
                                >
                                    Login
                                </span>
                            </Typography>
                        )}

                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <TextField
                                fullWidth
                                placeholder="Type your message..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                size="small"
                            />
                            <Button
                                disabled={!!errorMessage}
                                variant="contained"
                                onClick={handleSend}
                                sx={{ ml: 1, minWidth: 40, height: 40 }}
                            >
                                <SendIcon fontSize="small" />
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            )}

            <ProWarning
                openPaymentDialog={openPaymentDialog}
                setOpenPaymentDialog={setOpenPaymentDialog}
                onClose={() => setOpenPaymentDialog(false)}
            />
        </>
    );
};

export default ChatBot;
