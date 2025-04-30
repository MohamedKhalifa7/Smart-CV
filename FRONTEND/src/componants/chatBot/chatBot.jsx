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
import SmartToyIcon from '@mui/icons-material/SmartToy'; import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const ChatBot = () => {
    const theme = useTheme();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [chatId, setChatId] = useState(null);
    const [open, setOpen] = useState(false);
    const messagesEndRef = useRef(null);

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
                console.error('Error creating chat:', err);
            }
        };
        createChat();
    }, []);

    const handleSend = async () => {
        if (!input.trim() || !chatId) return;

        const userMsg = { type: 'user', text: input };
        setMessages((prev) => [...prev, userMsg]);
        setInput('');

        setMessages((prev) => [...prev, { type: 'bot', text: 'Typing...' }]);

        try {
            const res = await axios.post(
                'http://localhost:3001/api/chatbot',
                { message: input, chatId },
                { withCredentials: true }
            );

            const botMsg = { type: 'bot', text: res.data.response };
            setMessages((prev) => {
                const updated = [...prev];
                updated.pop(); // remove "Typing..."
                return [...updated, botMsg];
            });
        } catch (err) {
            console.error('Error sending message:', err);
            const errorMsg =
                err.code === 'ERR_NETWORK'
                    ? '❌ Network error. Please check your internet connection.'
                    : '⚠️ Something went wrong. Please try again later.';
            setMessages((prev) => [
                ...prev.slice(0, -1),
                { type: 'bot', text: errorMsg },
            ]);
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <>
            {/* Floating Button (FAB) */}

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
                    <Fab
                        color="primary"
                        onClick={() => setOpen(true)}
                    >
                        <SmartToyIcon />
                    </Fab>
                </Box>
            </Tooltip>



            {/* Chat Box */}
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
                    {/* Header */}
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
                        <Typography fontWeight="bold" sx={{ color: "white" }}>ChatBot</Typography>
                        <Button
                            onClick={() => setOpen(false)}
                            sx={{ minWidth: 'auto', color: 'white' }}
                        >
                            <CloseIcon />
                        </Button>
                    </Box>

                    {/* Messages */}
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



                    </Box>

                    {/* Input */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            px: 1,
                            py: 1,
                            borderTop: '1px solid #ccc',
                        }}
                    >
                        <TextField
                            fullWidth
                            placeholder="Type your message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            size="small"
                        />
                        <Button
                            variant="contained"
                            onClick={handleSend}
                            sx={{ ml: 1, minWidth: 40, height: 40 }}
                        >
                            <SendIcon fontSize="small" />
                        </Button>
                    </Box>
                </Paper>
            )}
        </>
    );
};

export default ChatBot;
