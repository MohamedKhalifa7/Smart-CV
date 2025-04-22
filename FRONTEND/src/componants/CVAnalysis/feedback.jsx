import { Box, Typography, Divider } from '@mui/material';
import React, { useState } from 'react';
import Alert from '@mui/material/Alert';

function Feedback() {
    const [good, setGood] = useState([
        { id: 1, text: "Well-structured CV layout" },
        { id: 2, text: "Clear contact information" },
    ]);
    const [bad, setBad] = useState([
        { id: 1, text: "No specific job title mentioned" },
        { id: 2, text: "Lack of quantifiable achievements" },
    ]);
    const [warning, setWarning] = useState([
        { id: 1, text: "Generic objective statement" },
        { id: 2, text: "Missing recent experience details" },
    ]);

    const renderFeedbackSection = (title, items, severity) => (
        items.length > 0 && (
            <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold', color: `${severity}.main` }}>
                    {title}
                </Typography>
                {items.map(item => (
                    <Alert
                        key={`${severity}-${item.id}`}
                        severity={severity}
                        sx={{
                            mb: 1,
                            borderLeft: `5px solid`,
                            borderColor: `${severity}.main`,
                            boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                        }}
                    >
                        {item.text}
                    </Alert>
                ))}
            </Box>
        )
    );

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            p: 3,
            mt: 3,
            backgroundColor: "#fafafa",
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
        }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                Feedback Summary
            </Typography>

            <Divider sx={{ mb: 2 }} />

            {renderFeedbackSection("✅ Strengths", good, "success")}
            {renderFeedbackSection("⚠️ Warnings", warning, "warning")}
            {renderFeedbackSection("❌ Issues", bad, "error")}
        </Box>
    );
}

export default Feedback;
