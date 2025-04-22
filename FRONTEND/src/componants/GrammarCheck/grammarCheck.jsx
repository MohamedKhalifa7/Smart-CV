import { Box, Button, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const GrammarCheck = () => {
    const [content, setContent] = useState("")
    const navigat = useNavigate();
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))
    const handleContentChange = (event) => {
        setContent(event.target.value);
    }
    const handleClear = () => {
        setContent("");
    };
    return (
        <>
            {/* Header Section */}
            <Box sx={{ display: "flex", height: "20vh", width: "70vw", alignSelf: "center", justifyContent: "center", flexDirection: "column", m: "auto", mt: 3, }}>
                <Button variant="text" sx={{ display: "flex", alignSelf: "start", mt: "12px", color: "gray" }} onClick={() => navigat("/getStart")}
                    startIcon={<ArrowBackIcon></ArrowBackIcon>}>
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
                    Perfect your CV content with our advanced grammar and style checker</Typography>)}
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
                        value={content}
                        onChange={handleContentChange}
                    />
                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                        <Button variant="outlined" color="secondary" onClick={handleClear}>
                            Clear
                        </Button>
                        <Button variant="contained">
                            Check Grammar
                        </Button>
                    </Box>
                </Box>
                <Box sx={{ width: isMobile ? "90%" : "35%", alignSelf: "flex-start", minHeight: "150px", bgcolor: "background.gray", borderRadius: "10px" }}>
                    <Typography sx={{ fontSize: "16px", fontWeight: "bold", p: 2 }}>
                        Grammar Check Result
                    </Typography>
                    {!content && (
                        <Typography sx={{ fontSize: "14px", p: 2 }}>
                            Paste your CV content and click "Check Grammar" to get started.                            </Typography>
                    )}
                </Box>
            </Box>
        </>
    )
}
export default GrammarCheck;