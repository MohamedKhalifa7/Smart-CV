import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import SpellcheckOutlinedIcon from '@mui/icons-material/SpellcheckOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';

import { theme } from "../theme"
import { useNavigate } from 'react-router-dom';
import CVAnalysisResult from "../CVAnalysis/CVAnalysisResult";
import { useState, useRef } from "react";
import { useFile } from "../../context/fileContext";
import { useAuth } from "../../context/Auth/AuthContext";
import ProWarning from "../proWarning";
import { useTranslation } from 'react-i18next';

const GetStarted = () => {
    const muiTheme = useTheme();
    const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
    const { t } = useTranslation();
    const navigat = useNavigate()

    const { uploadedFile, setUploadedFile } = useFile();
    const fileInputRef = useRef();

    const { user } = useAuth();
        const isPro = user.role === 'pro user';
    const [openPaymentDialog, setOpenPaymentDialog] = useState(false); // State to handle the payment dialog

      const handleCheckGrammer = () => {
        if (isPro) {
            navigat("/grammarCheck")
        } else {
            setOpenPaymentDialog(true); 
        }
      }


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
            <Box sx={{ bgcolor: "background.gray", width: "100%", height: "200px" }}>
                <Typography variant="h4"
                    sx={{ textAlign: "center", paddingTop: "50px", color: muiTheme.customStyles.gradientText }}>
                    {t("Let's Create Your Perfect CV!")}
                </Typography>
                <Typography variant="body1" sx={{ textAlign: "center", paddingTop: "10px" }}>
                    {t("getstarted.subtitle")}
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
                    maxWidth: 270, height: isMobile?"92%":"85%", mt: "40px", display: "flex", my: "10px",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    border: `2px solid ${theme.palette.background.gray}`,
                    boxShadow: "0px 4px 8px rgba(0,0,0,0.1)"
                }}>
                    <CardActionArea>

                        <FileUploadOutlinedIcon sx={{ fontSize: "70px", marginLeft: "100px", marginTop: "20px", color: "primary.main" }} />
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="div" align="center">
                                {t("Upload Existing CV")}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: "center" }}>
                       {t("upload.subtitle")}
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
                            {t("Upload CV")}
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
                                {t("Create New CV ")}                           </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: "center" }}>
                               {t("create.subtitle")}
                                                           </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions sx={{ justifyContent: "center" }}>
                        <Button
                            onClick={() => navigat("/builder")}
                            sx={{ width: "80%", alignSelf: "end", mb: "15px" }}
                            align="center"
                            variant="contained"
                        >
                            {t("Start New CV")}
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
                                {t("Grammar Checker")}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: "center" }}>
                            {t("grammar_checker.subtitle")}                       
                                     </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions sx={{ justifyContent: "center" }}>
                        <Button
                            sx={{ width: "80%", alignSelf: "end", mb: "15px" }}
                            align="center"
                            variant="contained"
                            onClick={handleCheckGrammer}
                        >
                            {t("Check Grammar")}
                        </Button>
                    </CardActions>
                </Card>


              

            </Box>
            {uploadedFile && (
                <Box sx={{ m: 6, border: `2px solid ${theme.palette.background.gray}`, borderRadius: "10px", p: 3 }}>
                    <CVAnalysisResult ></CVAnalysisResult>

                </Box>
            )}

<ProWarning
                    openPaymentDialog={openPaymentDialog}
                    setOpenPaymentDialog={setOpenPaymentDialog}
                    onClose={() => setOpenPaymentDialog(false)}
                
                ></ProWarning>
        </>
    )
}
export default GetStarted;