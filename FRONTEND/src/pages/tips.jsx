import { useState } from 'react';
import {
    Box,
    Typography,
    useTheme,
    Paper,
    Tabs,
    Tab,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";

const CVTipsSection = () => {
    const theme = useTheme();
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <Box
            sx={{

                overflow: "hidden",
            }}
        >

            <Box sx={{
                bgcolor: "background.gray",
                width: "100%",
                height: "200px",
                mb: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: "bold",
                        background:
                            "linear-gradient(to right, rgba(107, 36, 155, 0.84), rgba(247, 61, 201, 0.79),  rgba(233, 155, 38, 0.77))",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        textAlign: "center",
                        mb: 2
                    }}
                >
                    {t('CV Tips & Best Practices')}
                </Typography>

                <Typography
                    variant="subtitle1"
                    sx={{
                        color: "text.secondary",
                        fontSize: "18px",
                        textAlign: "center",
                    }}
                >
                    {t('Expert advice to help you create a standout CV that gets results')}
                </Typography>
            </Box>
            {/* Tab Section */}
            <Paper sx={{
                mb: 3,
                bgcolor: theme.palette.background.gray,
                height: 40,
                maxWidth: 800,
                mx: 'auto'
            }}>
                <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    variant="fullWidth"
                    sx={{
                        height: "100%",

                        minHeight: "unset",
                        '& .MuiTabs-flexContainer': {
                            display: 'flex',
                            justifyContent: 'space-between',
                            height: '100%',
                        },
                        '& .MuiTab-root': {
                            fontWeight: 600,
                            flex: 1,
                            maxWidth: 'none',
                            textTransform: 'none',
                            height: '100%',
                            minHeight: "unset",
                            padding: 0,
                            margin: 0,
                            '&.Mui-selected': {
                                color: 'primary.main',
                                bgcolor: 'white',
                                borderRadius: 2,
                            },
                        },
                        '& .MuiTabs-indicator': {
                            display: 'none',
                        },
                    }}
                >
                    <Tab label={t('Dos & Don\'ts')} />
                    <Tab label={t('Best Practices')} />
                </Tabs>
            </Paper>

            {/* Content based on active tab */}
            <Paper sx={{
                p: 3,
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: 3,
                maxWidth: 1200,
                mx: 'auto'
            }}>
                {activeTab === 0 ? (
                    // Dos & Don'ts Tab
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
                        {/* Dos Column */}
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" sx={{ mb: 2, color: "green" }}>
                                {t('CV Dos')}
                            </Typography>
                            <List>
                                {[
                                    t('Tailor your CV to each job application'),
                                    t('Use active language and action verbs'),
                                    t('Quantify achievements with numbers when possible'),
                                    t('Keep your CV to 1-2 pages maximum'),
                                    t('Use a clean, professional design'),
                                    t('Include relevant keywords from the job posting'),
                                    t('Proofread carefully for spelling and grammar errors'),
                                    t('Include a professional summary or objective'),
                                    t('List your most recent experience first'),
                                    t('Use a professional email address'),
                                ].map((item) => (
                                    <ListItem key={item} disablePadding sx={{ mb: 1 }}>
                                        <ListItemIcon sx={{ minWidth: 32 }}>
                                            <CheckIcon sx={{ color: 'green' }} />
                                        </ListItemIcon>
                                        <ListItemText primary={item} />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>

                        {/* Don'ts Column */}
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" sx={{ mb: 2, color: theme.palette.error.main }}>
                                {t('CV Don\'ts')}
                            </Typography>
                            <List>
                                {[
                                    t('Include personal information like age or marital status'),
                                    t('Use an unprofessional email address'),
                                    t('Include salary information or references'),
                                    t('Use generic phrases like "team player" without evidence'),
                                    t('Include a photo (unless specifically requested)'),
                                    t('Use fancy fonts or excessive formatting'),
                                    t('Include irrelevant work experience'),
                                    t('Lie or exaggerate your qualifications'),
                                    t('Use the same CV for every application'),
                                    t('Leave unexplained gaps in your work history'),
                                ].map((item) => (
                                    <ListItem key={item} disablePadding sx={{ mb: 1 }}>
                                        <ListItemIcon sx={{ minWidth: 32 }}>
                                            <CloseIcon sx={{ color: 'red' }} />
                                        </ListItemIcon>
                                        <ListItemText primary={item} />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Box>
                ) : (
                    // Best Practices Tab
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
                        {/* Format Tips Column */}
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" sx={{ mb: 2,}}>
                                {t('Format Tips')}
                            </Typography>
                            <List>
                                {[
                                    t('Use consistent formatting throughout the document'),
                                    t('Use bullet points for easy scanning'),
                                    t('Include plenty of white space'),
                                    t('Use a standard, readable font (Arial, Calibri, Helvetica)'),
                                    t('Font size between 10-12pt for body text'),
                                    t('Use bold for section headings'),
                                    t('Ensure margins are between 0.5-1 inch on all sides'),
                                    t('Save and send as a PDF unless otherwise specified'),
                                    t('Use clear section headings'),
                                    t('Ensure hyperlinks work correctly'),
                                ].map((item) => (
                                    <ListItem key={item} disablePadding sx={{ mb: 1 }}>
                                        <ListItemIcon sx={{ minWidth: 32 }}>
                                            <CheckIcon  />
                                        </ListItemIcon>
                                        <ListItemText primary={item} />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>

                        {/* Content Tips Column */}
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" sx={{ mb: 2, }}>
                                {t('Content Tips')}
                            </Typography>
                            <List>
                                {[
                                    t('Focus on achievements rather than responsibilities'),
                                    t('Use industry-specific keywords'),
                                    t('Include relevant skills section'),
                                    t('Customize your professional summary for each application'),
                                    t('Include certifications and professional development'),
                                    t('Highlight transferable skills for career changes'),
                                    t('Include volunteer work if relevant or if you have limited experience'),
                                    t('Mention language skills and proficiency levels'),
                                    t('Include relevant technical skills'),
                                    t('Highlight projects that demonstrate your capabilities'),
                                ].map((item) => (
                                    <ListItem key={item} disablePadding sx={{ mb: 1 }}>
                                        <ListItemIcon sx={{ minWidth: 32 }}>
                                            <CheckIcon  />
                                        </ListItemIcon>
                                        <ListItemText primary={item} />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Box>
                )}
            </Paper>
        </Box>
    );
};

export default CVTipsSection;