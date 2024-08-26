import React, { useState } from 'react';
import './SanalKlavye.css';

const SanalKlavye = ({ onClose, onKeyPress }) => {
  const [inputValue, setInputValue] = useState('');

  const klavyeDuzeni = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '?', '*', '-'],
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'ı', 'o', 'p', 'ğ', 'ü'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ş', 'i', ';'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm', 'ö', 'ç', '_', '.', ':'],
    ['<', '>', '       ', '@', '/']
  ];

  const handleKeyPress = (key) => {
    if (key === 'Sil') {
      setInputValue(prev => prev.slice(0, -1));
      onKeyPress('Sil');
    } else if (key === 'Giriş') {
      onKeyPress('\n');
    } else {
      setInputValue(prev => prev + key);
      onKeyPress(key);
    }
  };

  return (
    <div className="sanal-klavye">
      <div className="input-row">
        <input type="text" className="klavye-input" value={inputValue} readOnly />
        <button className="sil-button" onClick={() => handleKeyPress('Sil')}>Sil</button>
      </div>
      <div className="klavye">
        {klavyeDuzeni.map((row, index) => (
          <div key={index} className="klavye-row">
            {row.map((key, idx) => (
              <button
                key={idx}
                className="klavye-key"
                onClick={() => handleKeyPress(key)}
              >
                {key}
              </button>
            ))}
          </div>
        ))}
        <div className="klavye-row">
          <button className="klavye-key geri-button" onClick={() => window.history.back()}>Geri</button>
          <button className="klavye-key sil-button" onClick={() => handleKeyPress('Sil')}>Sil</button>
          <button className="klavye-key vazgec-button" onClick={() => { setInputValue(''); onClose(); }}>Vazgeç</button>
          <button className="klavye-key giris-button" onClick={() => handleKeyPress('Giriş')}>Giriş</button>
        </div>
      </div>
    </div>
  );
};

export default SanalKlavye;
