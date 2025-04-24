import { Box, Button, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Tabs, Tab, Card, CardContent, Chip } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const GrammarCheck = () => {
    const [grammarText, setGrammarText] = useState("");
    const [grammarResult, setGrammarResult] = useState("");
    const [selectedTab, setSelectedTab] = useState("All");
    const [issues, setIssues] = useState([]);

    const navigat = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleContentChange = (event) => {
        setGrammarText(event.target.value);
    };

    const handleClear = () => {
        setGrammarText("");
    };

    const handleCheckGrammar = async () => {
        const response = await axios.post("http://localhost:3001/api/ai/grammarcheck", { grammarText: grammarText }, { withCredentials: true });
        if (response.status === 200) {
            setGrammarResult(response.data);
            console.log("Grammar check result:", response.data);
        } else {
            console.error("Error checking grammar:", response.statusText);
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

            setIssues(allIssues); // Store issues after result
        }
    }, [grammarResult]);

    const filteredIssues = selectedTab === "All"
        ? issues
        : issues.filter((issue) => issue.type === selectedTab);

    // Function to fix and remove the card
    const handleFix = (errorText, correctText, issueId) => {
        // Apply the fix
        const updatedText = grammarText.replace(errorText, correctText);
        setGrammarText(updatedText);

        // Remove the fixed issue from the issues list
        const updatedIssues = issues.filter((issue) => issue.id !== issueId);
        setIssues(updatedIssues);
    };

    return (
        <>
            {/* Header Section */}
            <Box sx={{ display: "flex", height: "20vh", width: "70vw", alignSelf: "center", justifyContent: "center", flexDirection: "column", m: "auto", mt: 3 }}>
                <Button variant="text" sx={{ display: "flex", alignSelf: "start", mt: "12px", color: "gray" }} onClick={() => navigat("/getStart")} startIcon={<ArrowBackIcon />}>
                    Back to Get Started
                </Button>
                <Typography sx={{
                    margin: "auto", fontSize: "35px", fontWeight: "bold", background:
                        "linear-gradient(to right, rgba(107, 36, 155, 0.84), rgb(241, 110, 209), rgba(233, 155, 38, 0.76))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                }}>
                    Grammar & Style Checker
                </Typography>
                {!isMobile && (<Typography sx={{ margin: "auto", fontSize: "16px", color: "gray" }}>
                    Perfect your CV content with our advanced grammar and style checker
                </Typography>)}
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
                        placeholder="Paste your CV content here for grammar and style checking"
                        value={grammarText}
                        onChange={handleContentChange}
                    />
                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                        <Button variant="outlined" color="secondary" onClick={handleClear}>
                            Clear
                        </Button>
                        <Button variant="contained" onClick={handleCheckGrammar}>
                            Check Grammar
                        </Button>
                    </Box>
                </Box>

                <Box sx={{ width: isMobile ? "90%" : "35%", alignSelf: "flex-start", minHeight: "150px", bgcolor: "#f5f5f5", borderRadius: "10px" }}>
                    <Typography sx={{ fontSize: "16px", fontWeight: "bold", p: 1.5 }}>
                        Grammar Check Result
                    </Typography>

                    {!grammarResult && (
                        <Typography sx={{ fontSize: "14px", p: 1.5 }}>
                            Paste your CV content and click "Check Grammar" to get started.
                        </Typography>
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
                                <Tab label="Grammar" value="Grammar" />
                                <Tab label="Spelling" value="Spelling" />
                                <Tab label="Punctuation" value="Punctuation" />
                                <Tab label="Style" value="Style" />
                            </Tabs>

                            <Box sx={{ p: 1.5 }}>
                                {filteredIssues.length === 0 ? (
                                    <Typography sx={{ fontSize: "12px" }}>
                                        No issues found in this category.
                                    </Typography>
                                ) : (
                                    filteredIssues.map((issue) => {
                                        const [wrong, correct] = issue.suggestion.split("→").map(str => str.trim());

                                        return (
                                            <Card key={issue.id} sx={{ mb: 1, p: 1, backgroundColor: "#f9f9f9" }}>
                                                <CardContent sx={{ display: "flex", flexDirection: "column", gap: 0.5, p: 1 }}>
                                                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                        <Chip
                                                            label={issue.type}
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
                                                            Fix
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
