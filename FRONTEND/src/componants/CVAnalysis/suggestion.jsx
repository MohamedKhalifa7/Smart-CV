import { Box, Typography, useTheme } from '@mui/material'
import React from 'react'
import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined';

function Suggestion() {
    const theme = useTheme();

    return (
        <Box>
            <Typography 
                variant='h5' 
                sx={{ fontWeight: 'bold', mb: 3 }}
            >
                 Improvement Suggestions
            </Typography>

            <Box
                sx={{
                    border: `1px solid ${theme.palette.primary.main}`,
                    borderRadius: 3,
                    p: 3,
                    backgroundColor: theme.palette.background.paper,
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
                    transition: '0.3s',
                    '&:hover': {
                        boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.1)',
                    },
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <EmojiObjectsOutlinedIcon sx={{ color: theme.palette.primary.main }} />
                    <Typography variant='h6' sx={{ fontWeight: 600 }}>
                        Section Title
                    </Typography>
                </Box>

                <Typography variant='body1' sx={{ mt: 2, ml: 4, color: 'text.secondary' }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat.
                </Typography>
            </Box>
        </Box>
    )
}

export default Suggestion
