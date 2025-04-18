import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

function TemplateCard(props) {

  const { title, img , disc, pro} = props;
  return (
    <Card sx={{ maxWidth: 200 , border:'solid #6a11cb 3px'}} >
      
        <Box sx={{ position: 'relative' }}>
          {/* Overlay Content */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              color: 'white',
              px: 1,
              py: 0.5,
              zIndex: 1,
                display: 'flex',
                justifyContent: 'space-between',
              
            }}
          >
            <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                <CheckCircleOutlineIcon sx={{ mr: 0.5 ,mt:0.5, color:"green"}} />
            </Typography>
            {(pro) &&
                <Typography variant='caption' 
                sx={{background:'#6a11cb',px:'8px',py:'4px',mx: 2,mt:0.5, borderRadius:'5px',fontWeight: 'bold'}}>
                    Pro
                    </Typography>}
        
          </Box>

          {/* Image */}
          <CardMedia
            component="img"
            height="300"
            image={img}
            alt="template image"
          />
        </Box>

        {/* Text Below Image */}
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {disc}
          </Typography>
        </CardContent>
      

      <CardActions>
        <Button size="small" color="primary" variant='contained' fullWidth>
          Select
        </Button>
      </CardActions>
    </Card>
  )
}

export default TemplateCard
