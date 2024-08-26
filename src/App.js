import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './giriş-ekranı/Login';
import Home from './anasayfa/home'; // 'home.js' dosyasını 'Home' olarak düşündüm
import SalesScreen from './satiş-ekrani/SalesScreen';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/main" element={<h1>Ana Sayfa</h1>} />
        <Route path="/" element={<Login />} />
        <Route path="/anasayfa/home.js" element={<Home />} />
        <Route path="/sales" element={<SalesScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
