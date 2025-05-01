import {
    Box, Button, TextField, Typography, useMediaQuery, useTheme, CircularProgress, Alert,
    Tabs, Tab, Card, CardContent, Chip
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";

const GrammarCheck = () => {
    const { t } = useTranslation();
    const [grammarText, setGrammarText] = useState("");
    const [grammarResult, setGrammarResult] = useState("");
    const [selectedTab, setSelectedTab] = useState("All");
    const [issues, setIssues] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [isButtonVisible, setIsButtonVisible] = useState(false);
    const navigat = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleContentChange = (event) => {
        setGrammarText(event.target.value);
        setIsButtonVisible(event.target.value.trim() !== "");
    };

    const handleClear = () => {
        setGrammarText("");
        setIsButtonVisible(false);
        setError("");
    };

    const handleCheckGrammar = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post(
                "http://localhost:3001/api/ai/grammarcheck",
                { grammarText: grammarText },
                { withCredentials: true }
            );

            if (response.status === 200) {
                setGrammarResult(response.data);
                setError("");
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    setError(t("pleaseLogin"));
                    setGrammarResult("");
                } else if (error.response.status === 403) {
                    setError(t("proRequired"));
                    setGrammarResult("");
                } else {
                    setGrammarResult("");
                }
            } else if (error.request) {
                if (error.code === 'ERR_NETWORK') {
                    setError(t("networkError"));
                    setGrammarResult("");
                } else {
                    setGrammarResult("");
                }
            } else {
                setError("Error: " + error.message);
                setGrammarResult("");
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (grammarResult) {
            const categories = {
                Grammar: grammarResult?.Grammar || [],
                Spelling: grammarResult?.Spelling || [],
                Punctuation: grammarResult?.Punctuation || [],
                Style: grammarResult?.Style || [],
            };

            const allIssues = Object.entries(categories)
                .flatMap(([type, issues]) =>
                    issues.map((item, idx) => ({
                        id: `${type}-${idx}`,
                        type,
                        severity: type === "Grammar" ? "high" : type === "Punctuation" ? "low" : "medium",
                        suggestion: item,
                    }))
                );

            setIssues(allIssues);
        }
    }, [grammarResult]);

    const filteredIssues = selectedTab === "All"
        ? issues
        : issues.filter((issue) => issue.type === selectedTab);

    const handleFix = (errorText, correctText, issueId) => {
        const updatedText = grammarText.replace(errorText, correctText);
        setGrammarText(updatedText);

        const updatedIssues = issues.filter((issue) => issue.id !== issueId);
        setIssues(updatedIssues);
    };

    return (
        <>
            {/* Header Section */}
            <Box sx={{ display: "flex", height: "20vh", width: "70vw", alignSelf: "center", justifyContent: "center", flexDirection: "column", m: "auto", mt: 3 }}>
                <Button
                    variant="text"
                    sx={{ display: "flex", alignSelf: "start", mt: "12px", color: "gray" }}
                    onClick={() => navigat("/getStart")}
                    startIcon={<ArrowBackIcon />}
                >
                    {t("backToStart")}
                </Button>
                <Typography sx={{
                    margin: "auto", fontSize: "35px", fontWeight: "bold", background:
                        "linear-gradient(to right, rgba(107, 36, 155, 0.84), rgb(241, 110, 209), rgba(233, 155, 38, 0.76))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                }}>
                    {t("grammarCheckerTitle")}
                </Typography>
                {!isMobile && (
                    <Typography sx={{ margin: "auto", fontSize: "16px", color: "gray" }}>
                        {t("grammarCheckerSubtitle")}
                    </Typography>
                )}
            </Box>

            {/* Main Content Section */}
            <Box sx={{
                display: "flex", minHeight: "60vh", width: "70vw", alignSelf: "center",
                flexDirection: isMobile ? "column" : "row", m: "auto", mt: 5, gap: 2, justifyContent: "space-between",
            }}>
                <Box sx={{ width: isMobile ? "90%" : "60%" }}>
                    <TextField
                        multiline
                        rows={12}
                        sx={{ width: "100%" }}
                        placeholder={t("inputPlaceholder")}
                        value={grammarText}
                        onChange={handleContentChange}
                    />
                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                        <Button variant="outlined" color="secondary" onClick={handleClear}>
                            {t("clear")}
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleCheckGrammar}
                            disabled={isLoading || !isButtonVisible}
                        >
                            {t("checkGrammar")}
                        </Button>
                    </Box>
                </Box>

                <Box sx={{ width: isMobile ? "90%" : "35%", alignSelf: "flex-start", minHeight: "150px", bgcolor: "#f5f5f5", borderRadius: "10px" }}>
                    {error && (
                        <Alert severity="error" sx={{ fontSize: "14px", mt: 1 }}>
                            {error}
                        </Alert>
                    )}
                    <Typography sx={{ fontSize: "16px", fontWeight: "bold", p: 1.5 }}>
                        {t("resultTitle")}
                    </Typography>

                    {!grammarResult && !isLoading && (
                        <Typography sx={{ fontSize: "14px", p: 1.5 }}>
                            {t("promptToCheck")}
                        </Typography>
                    )}

                    {isLoading && (
                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "150px" }}>
                            <CircularProgress />
                        </Box>
                    )}

                    {grammarResult && (
                        <>
                            <Tabs
                                value={selectedTab}
                                onChange={(e, newValue) => setSelectedTab(newValue)}
                                variant="standard"
                                sx={{
                                    px: 1,
                                    minHeight: "30px",
                                    "& .MuiTabs-flexContainer": { justifyContent: "space-between" },
                                    "& .MuiTab-root": {
                                        minHeight: "30px",
                                        minWidth: "auto",
                                        fontSize: "11px",
                                        px: 0,
                                        mx: 0.5,
                                    },
                                }}
                            >
                                <Tab label={`All (${issues.length})`} value="All" />
                                <Tab label={t("grammar")} value="Grammar" />
                                <Tab label={t("spelling")} value="Spelling" />
                                <Tab label={t("punctuation")} value="Punctuation" />
                                <Tab label={t("style")} value="Style" />
                            </Tabs>

                            <Box sx={{ p: 1.5 }}>
                                {filteredIssues.length === 0 ? (
                                    <Typography sx={{ fontSize: "12px" }}>
                                        {t("noIssuesFound")}
                                    </Typography>
                                ) : (
                                    filteredIssues.map((issue) => {
                                        const [wrong, correct] = issue.suggestion.split("→").map(str => str.trim());

                                        return (
                                            <Card key={issue.id} sx={{ mb: 1, p: 1, backgroundColor: "#f9f9f9" }}>
                                                <CardContent sx={{ display: "flex", flexDirection: "column", gap: 0.5, p: 1 }}>
                                                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                        <Chip
                                                            label={t(issue.type.toLowerCase())}
                                                            size="small"
                                                            sx={{
                                                                fontSize: "13px",
                                                                fontWeight: "bold",
                                                                backgroundColor:
                                                                    issue.type === "Grammar"
                                                                        ? "#fdecea"
                                                                        : issue.type === "Punctuation"
                                                                            ? "#e8f4fd"
                                                                            : issue.type === "Spelling"
                                                                                ? "#fff3e0"
                                                                                : "#e9f7ef",
                                                                color:
                                                                    issue.type === "Grammar"
                                                                        ? "#b71c1c"
                                                                        : issue.type === "Punctuation"
                                                                            ? "#0d47a1"
                                                                            : issue.type === "Spelling"
                                                                                ? "#e65100"
                                                                                : "#1b5e20",
                                                            }}
                                                        />
                                                        <Button
                                                            size="small"
                                                            variant="outlined"
                                                            sx={{ fontSize: "10px", px: 1, py: 0.5 }}
                                                            onClick={() => handleFix(wrong, correct, issue.id)}
                                                        >
                                                            {t("fix")}
                                                        </Button>
                                                    </Box>

                                                    <Typography sx={{ fontSize: "14px" }}>
                                                        <span style={{ textDecoration: 'line-through' }}>{wrong}</span> → {correct}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        );
                                    })
                                )}
                            </Box>
                        </>
                    )}
                </Box>
            </Box>
        </>
    );
};

export default GrammarCheck;
