import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
} from '@mui/material';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/Auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Settings = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const API_URL = import.meta.env.MODE === "development" 
    ? import.meta.env.VITE_API_URL_LOCAL 
    : import.meta.env.VITE_API_URL_PRODUCTION;

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (newPassword !== confirmPassword) {
      setError(t('Passwords do not match'));
      return;
    }

    try {
      const response = await axios.post(  
        `${API_URL}/auth/update-password`,
        {
          userId: user?._id, 
          oldPassword,
          newPassword,
        },
        { withCredentials: true }
      );

      if (response.data) {
        setSuccess(t('Password updated successfully'));
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        
        setTimeout(async () => {
            await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
            Cookies.remove('token');
            logout();
            navigate('/login');
          } , 2000);
      }
      
    } catch (err: any) {
      console.error('Error:', err);
      setError(err.response?.data?.message || t('Failed to update password'));
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4, borderRadius: 2 }}>
        <Typography 
          variant="h5" 
          gutterBottom 
          sx={{ 
            background: "linear-gradient(to right, rgb(107, 36, 155), rgb(224, 139, 12), rgb(233, 84, 196))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textFillColor: "transparent",
            fontWeight: "bold",
            textAlign:'center',
          }}
        >
          {t('Account Settings')}
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <form onSubmit={handlePasswordUpdate}>
          <TextField
            fullWidth
            type="password"
            label={t('Old Password')}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            margin="normal"
            required
          />
          
          <TextField
            fullWidth
            type="password"
            label={t('New Password')}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            margin="normal"
            required
          />
          
          <TextField
            fullWidth
            type="password"
            label={t('Confirm New Password')}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            margin="normal"
            required
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
          >
            {t('Update Password')}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Settings;