// src/giriş-ekranı/Login.js

import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Grid, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import axios from 'axios';
import auth from '../firebase';
import './Login.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import SanalKlavye from '../sanal klavye/sanalklavye'; 

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [systemVersion, setSystemVersion] = useState('');
  const [sanalKlavyeAcik, setSanalKlavyeAcik] = useState(false); 
  const navigate = useNavigate(); 

  const fetchSystemVersion = () => {
    axios.get('http://localhost:5000/api/version')
      .then(response => {
        setSystemVersion(response.data.version);
      })
      .catch(error => {
        console.error('Sistem sürümü alınamadı!', error);
      });
  };

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
      
      console.log('Kullanıcı giriş yaptı:', userCredential.user);
      alert('Giriş başarılı!');
      navigate('/anasayfa/home.js');
    } catch (error) {
     
      alert('Kullanıcı adı veya şifre hatalı.');
      console.error('Giriş hatası:', error.code, error.message);
    }
  };

  const toggleSanalKlavye = () => {
    setSanalKlavyeAcik(!sanalKlavyeAcik);
  };


  const handleSanalKlavyeKeyPress = (key) => {
    if (key === 'Sil') {
      setUsername(username.slice(0, -1));
    } else if (key === '\n') {
      handleLogin(); 
    } else {
      setUsername(username + key); 
    }
  };

  useEffect(() => {
    fetchSystemVersion();
  }, []);

  return (
    <Container className="login-container">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} className="login-left">
          <img src="logo.png" alt="Logo" className="login-logo" />
          <Typography variant="body2" className="system-version">Sürüm: {systemVersion}</Typography>
        </Grid>
        <Grid item xs={12} md={6} className="login-right">
          <Typography variant="h4">Giriş Yap</Typography>
          <Typography variant="body1" className="welcome-text">Hoşgeldiniz</Typography>
          <Typography variant="body2" className="instruction-text">Lütfen kullanıcı kodu ve şifrenizi giriniz.</Typography>
          <TextField
            label="Kullanıcı Adı"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputProps={{
              startAdornment: (
                <PersonIcon fontSize="small" />
              ),
            }}
          />
          <TextField
            label="Şifre"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <LockIcon fontSize="small" />
              ),
            }}
          />
          <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
            Giriş
          </Button>
          <Button variant="contained" color="secondary" fullWidth onClick={toggleSanalKlavye}>
            Sanal Klavyeyi Aç
          </Button>
        </Grid>
      </Grid>
      {sanalKlavyeAcik && (
        <SanalKlavye
          onClose={toggleSanalKlavye}
          onKeyPress={handleSanalKlavyeKeyPress}
        />
      )}
    </Container>
  );
};

export default Login;
