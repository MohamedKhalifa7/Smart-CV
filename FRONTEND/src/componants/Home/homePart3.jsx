import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import DoneIcon from '@mui/icons-material/Done';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useNavigate } from 'react-router-dom';
import ProPaymentForm from '../payment/payment'
function HomePart3() {

    const navigate = useNavigate();
        const muiTheme = useTheme();
    
    const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));


    const handleClickPro = () => {
        navigate("/payment-check")
    }

    const handleClickFree = () => {
        navigate("/getStart")
    }

    const availFree = ['CV Analysis ',
        '2 CV Templates',
        ' Export to PDF',
        ' Store up to 2 CVs',
        'ATS Compatibility Check',
        ];

    const notFree = [
      'Grammar & Spelling Check',
        'Auto-correction',
      
        'AI Content Generator',
        'AI Open Chat Assistant',
        'Unlimited CVs',];

    const availPro = ['CV Analysis',
        'All CV Templates',
       'Export to PDF & Word',
        'Unlimited CV Storage',
         'ATS Compatibility Check',
        'Grammar & Spelling Check',
        'Auto-correction',
        'AI Content Generator',
        'AI Open Chat Assistant',
        'Unlimited CVs',]
    return (
        <Box>
            <Box className="header" sx={{
                display: "flex",
                flexDirection: "column", alignItems: "center", justifyContent: "center", py: 6, px: 1
            }}>
                <Typography variant='h4'
                    sx={{
                        background:
                            "linear-gradient(to right, rgb(107, 36, 155), rgb(233, 155, 38), rgb(241, 123, 212))",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        my: 2,
                    }}>
                    Choose Your Plan
                </Typography>
                <Typography variant='body1'
                    sx={{
                        color: "text.secondary", fontSize: "20px", my: 1,

                    }}>
                    Flexible options to match your CV needs

                </Typography>
            </Box>

            <Box className="plans " sx={{ display: "flex",flexDirection:isMobile?"column":"row", justifyContent: "space-evenly", alignItems: "center", px: 2 }}>
                
            <Box className='free' sx={{ border: "1px solid #ccc",mt:6, borderRadius: "10px", width:isMobile?"90%": "38%" }}>
  <Box className='planName' sx={{ px: "30px", pt: "50px", pb: "25px" }}>
    <Typography variant='h4'>
      Free
    </Typography>
    <Typography variant='h3' sx={{ fontWeight: "bold" }}>
      $0<span style={{ fontSize: "26px", fontWeight: "normal" }}>/month</span>
    </Typography>
    <Typography variant='body1' sx={{
      color: "text.secondary", fontSize: "20px", my: 1,
    }}>
      Essential CV tools for everyone
    </Typography>
  </Box>

  <Box className='features' sx={{ px: "30px", pb: "20px" }}>
    {availFree.map((item, index) => (
      <Box key={index} className='itemFree' sx={{ display: "flex", alignItems: "center", my: 2 }}>
        <DoneIcon sx={{ color: "green", fontSize: "28px" }} />
        <Typography variant='body1' sx={{
          fontSize: "18px", my: 1,
        }}>     {item}</Typography>
      </Box>
    ))}

    {notFree.map((item, index) => (
      <Box key={index} className='itemFree' sx={{ display: "flex", alignItems: "center", my: 2, color: "#bbb" }}>
        <CloseOutlinedIcon sx={{ fontSize: "28px" }} />
        <Typography variant='body1' sx={{
          fontSize: "18px", my: 1, color: "#bbb"
        }}>     {item}</Typography>
      </Box>
    ))}
  </Box>

  <Box sx={{ display: "flex", justifyContent: "center", mb: "26px" }}>
  <Button variant="outlined" sx={{ width: "75%" }}
  onClick={handleClickFree}>Get Started Free</Button>
</Box>

</Box>


                <Box className='pro' sx={{ border: `1px solid `,mt:6, borderColor:"primary.main", borderRadius: "10px" , width:isMobile?"90%": "38%" }}>
                    <Box className='planName' sx={{backgroundColor:"primary.main", color:"white" ,borderTopLeftRadius:"10px", borderTopRightRadius:"10px" ,px: "30px", pt: "50px", pb:"25px"}} >
                        <Typography variant='h4' sx={{color:"white"}}>
                            Pro
                        </Typography>
                        <Typography variant='h3' sx={{ fontWeight: "bold" }}>
                            $9.99<span style={{ fontSize: "26px", fontWeight: "normal" }}>/month</span>
                        </Typography>
                        <Typography variant='body1' sx={{
                            color: "white", fontSize: "20px", my: 1
                        }}>Advanced tools for serious job seekers
                        </Typography>
                    </Box>

                    <Box className='features' sx={{px: "30px",  pb:"20px"}}>
                    {availPro.map((item, index) => (
                        <Box key={index} className='itemFree' sx={{ display: "flex", alignItems: "center", my: 2 }}>
                            <DoneIcon sx={{color: "green",  fontSize: "28px" }} />
                            <Typography variant='body1' sx={{
                                fontSize: "18px", my: 1,
                            }}>     {item}</Typography>
                        </Box>
                    ))}
                    </Box>
                    
                    <Box sx={{ display: "flex", justifyContent: "center", mb: "26px" }}>
  <Button variant="contained" sx={{ width: "75%" }}
  onClick={handleClickPro}>Upgrade to Pro</Button>
</Box>
                </Box>
            </Box>

        </Box>
    )
}

export default HomePart3
