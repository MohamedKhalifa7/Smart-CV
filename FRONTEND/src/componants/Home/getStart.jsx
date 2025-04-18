import { Box, Typography } from "@mui/material";
import { ThemeProvider, useTheme } from '@mui/material/styles';

const GetStarted = () => {
    const muiTheme=useTheme();
    return (
      <>
     
     <Box sx={{bgcolor:"background.gray",width:"100%",height:"200px"}}>
        <Typography variant="h4" 
        sx={{textAlign:"center",paddingTop:"50px",color:muiTheme.customStyles.gradientText}}>
          Let's Create Your Perfect CV
        </Typography>
        <Typography variant="body1" sx={{textAlign:"center",paddingTop:"10px"}}>
        Choose how you'd like to get started with your CV
        </Typography>

     </Box>
      
      </>
    )
}
export default GetStarted;