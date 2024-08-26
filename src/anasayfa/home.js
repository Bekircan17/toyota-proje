import React, { useState, useEffect } from 'react';
import { Button, Grid, Typography, Container, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ExitToApp, ShoppingCart, AssignmentReturn, Assessment, Input, PriceCheck, Payment, ListAlt, Web, Settings } from '@mui/icons-material';
import './home.css';

const Home = () => {
  const [storeInfo, setStoreInfo] = useState({});
  const [systemVersion, setSystemVersion] = useState('');
  const [isOnline, setIsOnline] = useState(navigator.onLine); 
  const navigate = useNavigate();

  const fetchStoreInfo = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/storeinfo');
      setStoreInfo(response.data);
    } catch (error) {
      console.error('Mağaza bilgileri alınamadı!', error);
    }
  };

  const fetchSystemVersion = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/version');
      setSystemVersion(response.data.version);
    } catch (error) {
      console.error('Sistem versiyonu alınamadı!', error);
    }
  };

  const handleLogout = () => {
    navigate('/');
  };

  useEffect(() => {
    fetchStoreInfo();
    fetchSystemVersion();

    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  return (
    <Container className="home-container">
      <div className="header">
        <div className="store-info">
          <Typography variant="body1">Mağaza No: {storeInfo.storeNumber}</Typography>
          <Typography variant="body1">Kasa No: {storeInfo.registerNumber}</Typography>
          <Typography variant="body1">Kasa IP: {storeInfo.registerIP}</Typography>
          <Typography variant="body1">Sistem Versiyonu: {systemVersion}</Typography>
        </div>
        <img src="logo.png" alt="Logo" className="logo" />
        <IconButton className="settings-button">
          <Settings />
        </IconButton>
      </div>
      <Grid container spacing={3} className="buttons-grid">
        <Grid item xs={12} md={6}>
          <Button
            className="custom-button aslanagzi"
            fullWidth
            sx={{
              bgcolor: '#fff',
              color: 'black'
            }}
          >
            <div className="icon-container"><ShoppingCart /></div>
            Satış
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button
            className="custom-button acik-lacivert"
            fullWidth
            sx={{
              bgcolor: '#fff',
              color: 'black'
            }}
          >
            <div className="icon-container"><PriceCheck /></div>
            Fiyat Gör
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button
            className="custom-button aslanagzi"
            fullWidth
            sx={{
              bgcolor: '#fff',
              color: 'black'
            }}
          >
            <div className="icon-container"><AssignmentReturn /></div>
            İade İşlemi
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button
            className="custom-button aslanagzi"
            fullWidth
            sx={{
              bgcolor: '#fff',
              color: 'black'
            }}
          >
            <div className="icon-container"><Payment /></div>
            Tahsilatlar
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button
            className="custom-button sari"
            fullWidth
            sx={{
              bgcolor: '#fff',
              color: 'black'
            }}
          >
            <div className="icon-container"><Assessment /></div>
            Raporlar
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button
            className="custom-button acik-mavi"
            fullWidth
            sx={{
              bgcolor: '#fff',
              color: 'black'
            }}
          >
            <div className="icon-container"><ListAlt /></div>
            Diğer İşlemler
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button
            className="custom-button mor"
            fullWidth
            sx={{
              bgcolor: '#fff',
              color: 'black'
            }}
          >
            <div className="icon-container"><Input /></div>
            Direkt Ürün Girişi
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button
            className="custom-button turkuaz"
            fullWidth
            sx={{
              bgcolor: '#fff',
              color: 'black'
            }}
          >
            <div className="icon-container"><Web /></div>
            WWW
          </Button>
        </Grid>
      </Grid>
      <div className="footer">
        <div className="status">
          <span
            className={`status-indicator ${isOnline ? 'online' : 'offline'}`}
          ></span>
          Mağaza Çevrimiçi
        </div>
        <Button
          className='exit-button'
          variant="contained"
          color="secondary"
          startIcon={<ExitToApp />}
          onClick={handleLogout}
        >
          Çıkış
        </Button>
      </div>
    </Container>
  );
};

export default Home;
