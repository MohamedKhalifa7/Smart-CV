import { Box, Typography, TextField, Button, Paper, useTheme, Avatar } from '@mui/material';
import { useEffect, useState, useRef } from 'react';
import SendIcon from '@mui/icons-material/Send';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HistoryIcon from '@mui/icons-material/History'
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
const ChatBot = () => {
    const theme = useTheme();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [chatId, setChatId] = useState(null);
    const messagesEndRef = useRef(null);

    const navigate = useNavigate();


    // 1. Create a new chat on first load
    useEffect(() => {
        const createChat = async () => {
            try {
                const res = await axios.post('http://localhost:3001/api/chatbot/create', { messages }, {
                    withCredentials: true,
                });
                console.log(res.data);
                setChatId(res.data._id);
            } catch (err) {
                console.error('Error creating chat:', err);
            }
        };

        createChat();
    }, []);

    // 2. Send user message and receive bot response
    const handleSend = async () => {
        if (!input.trim() || !chatId) return;

        const userMsg = { type: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');


        const typingMsg = { type: 'bot', text: ' Typing...' };
        setMessages(prev => [...prev, typingMsg]);

        try {
            const res = await axios.post('http://localhost:3001/api/chatbot', {
                message: input,
                chatId
            }, {
                withCredentials: true,
            });

            const botMsg = { type: 'bot', text: res.data.response };
            setMessages(prev => {
                const updated = [...prev];
                updated.pop(); // remove "Typing..."
                return [...updated, { type: 'bot', text: res.data.response }];
            });


        } catch (err) {
            console.error('Error sending message:', err);
            if (err.code === 'ERR_NETWORK') {
                setMessages(prev => [
                    ...prev,
                    {
                        type: 'bot',
                        text: '❌ Network error. Please check your internet connection and try again.'
                    }
                ]);
            } else {
                setMessages(prev => [
                    ...prev,
                    {
                        type: 'bot',
                        text: '⚠️ Something went wrong. Please try again later.'
                    }
                ]);
            }
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    useEffect(() => {
        scrollToBottom();
    }, [messages]);


    return (
        <Box sx={{
            display: 'flex',
            height: '100vh',
            width: '100%',
            bgcolor: 'background.default',
        }}>
            {/* Left side - style section */}
            <Box
                sx={{
                    width: '40%',
                    position: 'relative',
                    color: 'white',
                    overflow: 'hidden',
                }}
            >
                {/* Background Image */}
                <img
                    src="Images/ai.avif"
                    alt="AI"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                    }}
                />

                {/* Overlay Text */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '95%',
                        height: '100%',
                        bgcolor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        p: 2,
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            mb: 2,
                            fontWeight: 'bold',
                            color: theme.customStyles.gradientText,
                        }}
                    >
                        Welcome to Your AI Assistant
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'white' }}>
                        Ask career questions, get CV tips, and explore how we can help you grow professionally.
                    </Typography>
                </Box>
            </Box>


            {/* Right side - Chat Section */}
            <Box sx={{
                width: '60%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                // p: 1
            }}>

                {/* Chat Header */}

                <Box
                    sx={{
                        width: '100%',
                        height: "50px",
                        background: 'linear-gradient(135deg,rgb(35, 8, 65) 0%,rgb(116, 41, 182) 100%)',
                        boxShadow: 2,
                        mb: 2,
                        // overflowX:"hidden",

                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <Button
                        onClick={() => navigate(-1)}
                        sx={{
                            minWidth: 20,
                            minHeight: 40,
                            color: 'white',
                            pr: 0

                        }}
                    >
                        <ArrowBackIcon />
                    </Button>
                    <Typography
                        variant="h6"
                        sx={{
                            color: 'white',
                            fontWeight: 'bold',
                            letterSpacing: 1,
                            flexGrow: 1,
                            paddingInlineStart: 2

                        }}
                    >
                        ChatBot
                    </Typography>

                    <Box sx={{ display: 'flex', }}>
                        <Button
                            sx={{
                                minWidth: 20,
                                minHeight: 40,
                                color: 'white',
                                '&:hover': {
                                    borderColor: '#fff',
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                }
                            }}
                        >
                            <AddCircleOutlineIcon />
                        </Button>
                        <Button
                            sx={{
                                minWidth: 20,
                                minHeight: 40,
                                borderColor: 'white',
                                color: 'white',
                                '&:hover': {
                                    borderColor: '#fff',
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                }
                            }}
                        >
                            <HistoryIcon />
                        </Button>
                    </Box>
                </Box>
                <Box sx={{ overflowY: 'auto', flexGrow: 1, mb: 2 }}>
                    {messages.map((msg, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: 'flex',
                                justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start',
                                m: 1,
                            }}
                        >
                            <Paper
                                sx={{
                                    p: 1.5,
                                    maxWidth: '70%',
                                    borderRadius: '16px',
                                    boxShadow: 1,
                                    background: msg.type === 'user'
                                        ? 'linear-gradient(135deg, #6a11cb 0%, #8e2de2 100%)'
                                        : theme.palette.background.gray,
                                    color: msg.type === 'user' ? 'white' : theme.palette.text.primary,
                                    display: 'flex',
                                    //    alignItems: 'center',
                                    gap: 1, // space between avatar and text
                                }}
                            >
                                {msg.type === 'bot' && (
                                    <Avatar
                                        src="/Images/bot.jpg"
                                        sx={{ width: 24, height: 24 }}
                                    />
                                )}
                                <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                                    {msg.text}
                                </Typography>
                            </Paper>
                            <div ref={messagesEndRef} />
                        </Box>

                    ))}
                </Box>

                {/* Chat input */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <TextField
                        variant="outlined"
                        placeholder="Type your message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        sx={{
                            flex: 1,
                            '& .MuiOutlinedInput-root': {
                                height: 45,
                                fontSize: '0.9rem',
                                padding: 0,
                                width: '99%',
                                alignSelf: 'end',
                            },
                            '& input': {
                                // padding: '8px 12px',
                            }
                        }}
                    />
                    <Button
                        variant="contained"
                        onClick={handleSend}
                        sx={{
                            minWidth: 40,
                            minHeight: 43,
                            m: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <SendIcon fontSize="small" />
                    </Button>
                </Box>

            </Box>
        </Box>
    );
};

export default ChatBot;
