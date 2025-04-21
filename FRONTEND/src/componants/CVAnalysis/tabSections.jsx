import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, Tab, Tabs, Typography } from '@mui/material';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`custom-tabpanel-${index}`}
      aria-labelledby={`custom-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `custom-tab-${index}`,
    'aria-controls': `custom-tabpanel-${index}`,
  };
}

export default function FullWidthTabs() {
  const [value, setValue] = React.useState(0); 

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabStyle = {
    textTransform: 'none',
    fontWeight: 'bold',
    fontSize: '14px',
    color: '#6b7280', 
    borderRadius: '8px',
    mx: 1,
    minHeight: '36px',
    '&.Mui-selected': {
      backgroundColor: 'white',
      color: 'black',
      boxShadow: 1,
    },
  };

  return (
    <Box sx={{ bgcolor: '#f8f9fa', p: 1, borderRadius: '8px' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        TabIndicatorProps={{ style: { display: 'none' } }}
        sx={{ minHeight: '36px' }}
      >
        <Tab label="Feedback" {...a11yProps(0)} sx={tabStyle} />
        <Tab label="Suggestions" {...a11yProps(1)} sx={tabStyle} />
        <Tab label="Keywords" {...a11yProps(2)} sx={tabStyle} />
      </Tabs>

      <TabPanel value={value} index={0}>
        Feedback Content
      </TabPanel>
      <TabPanel value={value} index={1}>
        Suggestions Content
      </TabPanel>
      <TabPanel value={value} index={2}>
        Keywords Content
      </TabPanel>
    </Box>
  );
}
