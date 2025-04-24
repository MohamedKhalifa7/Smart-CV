import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import SpellcheckOutlinedIcon from '@mui/icons-material/SpellcheckOutlined';

import { theme } from "../theme"
import { useNavigate } from 'react-router-dom';
import CVAnalysisResualt from "../CVAnalysis/CVAnalysisResualt";
import { useState, useRef } from "react";
import { useFile } from "../../context/fileContext";

const GetStarted = () => {
    const muiTheme = useTheme();
    const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));

    const navigat = useNavigate()

    const {uploadedFile, setUploadedFile} = useFile();
    const fileInputRef = useRef();

    const handleButtonClick = () => {
        fileInputRef.current.click(); // open file picker
      };
    
      const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          setUploadedFile(file); // store the uploaded file
          console.log('File uploaded:', file);
        }
      };

    return (
        <>
            {/* Header Section */}
            <Box sx={{ bgcolor: "background.gray", width: "100%", height: "200px"}}>
                <Typography variant="h4"
                    sx={{ textAlign: "center", paddingTop: "50px", color: muiTheme.customStyles.gradientText }}>
                    Let's Create Your Perfect CV
                </Typography>
                <Typography variant="body1" sx={{ textAlign: "center", paddingTop: "10px" }}>
                    Choose how you'd like to get started with your CV
                </Typography>

            </Box>
            {/* Card Section */}
            <Box sx={{
                display: "flex", justifyContent: "center", alignItems: "center",
                height: isMobile ? "1000px" : "400px", gap: "50px", px: 2,
                my: 2,
                flexDirection: isMobile ? "column" : "row"
            }}>

                <Card sx={{
                    maxWidth: 270, height: "85%", mt: "40px", display: "flex", my: "10px",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    border: `2px solid ${theme.palette.background.gray}`,
                    boxShadow: "0px 4px 8px rgba(0,0,0,0.1)"
                }}>
                    <CardActionArea>

                        <FileUploadOutlinedIcon sx={{ fontSize: "70px", marginLeft: "100px", marginTop: "20px", color: "primary.main" }} />
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="div" align="center">
                                Upload Existing CV
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: "center" }}>
                                Upload your current CV in PDF or Word format for analysis and improvement
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions sx={{ justifyContent: "center" }}>
                        <Button
                            sx={{ width: "80%", alignSelf: "end", mb: "15px" }}
                            align="center"
                            variant="contained"
                            onClick={handleButtonClick}
                        >
                            Upload CV
                        </Button>
                        <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
                    </CardActions>
                </Card>

                <Card sx={{
                    maxWidth: 270, height: "85%", mt: "40px", display: "flex", my: "10px",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    border: `2px solid ${theme.palette.background.gray}`,
                    boxShadow: "0px 4px 8px rgba(0,0,0,0.1)"
                }}>
                    <CardActionArea>

                        <DescriptionOutlinedIcon sx={{ fontSize: "60px", marginLeft: "100px", marginTop: "20px", color: "primary.main" }} />
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="div" align="center">
                                Create New CV                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: "center" }}>
                                Start from scratch with our guided CV builder and customizable templates                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions sx={{ justifyContent: "center" }}>
                        <Button
                            onClick={() => navigat("/builder")}
                            sx={{ width: "80%", alignSelf: "end", mb: "15px" }}
                            align="center"
                            variant="contained"
                        >
                            Start New CV
                        </Button>
                    </CardActions>
                </Card>
                <Card sx={{
                    maxWidth: 270, height: "85%", mt: "40px", display: "flex", my: "10px",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    border: `2px solid ${theme.palette.background.gray}`, boxShadow: "0px 4px 8px rgba(0,0,0,0.1)"
                }}>
                    <CardActionArea>

                        <SpellcheckOutlinedIcon sx={{ fontSize: "70px", marginLeft: "100px", marginTop: "20px", color: "primary.main" }} />
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="div" align="center">
                                Grammar Check
                                </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: "center" }}>
                                Check your CV for grammar, spelling, and style improvements                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions sx={{ justifyContent: "center" }}>
                        <Button
                            sx={{ width: "80%", alignSelf: "end", mb: "15px" }}
                            align="center"
                            variant="contained"
                            onClick={() => navigat("/grammarCheck")}
                        >
                            Check Grammar
                        </Button>
                    </CardActions>
                </Card>


            </Box>
            {uploadedFile && (
                <Box sx={{ m: 6, border: `2px solid ${theme.palette.background.gray}`, borderRadius: "10px", p: 3 }}>
                <CVAnalysisResualt ></CVAnalysisResualt>

            </Box>
            )}

            
        </>
    )
}
export default GetStarted;