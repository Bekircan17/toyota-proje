import React, { useState, useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import './SalesScreen.css';
import products from '../Product.json';

const SalesScreen = () => {
  const [barcode, setBarcode] = useState('');
  const [view, setView] = useState('categories');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0.0);
  const [isOnline, setIsOnline] = useState(true);
  const [randomCode, setRandomCode] = useState('');

  useEffect(() => {
    const generateRandomCode = () => {
      const randomNumbers = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join('');
      const randomCode = `${randomNumbers.slice(0, 4)}/${randomNumbers.slice(4, 5)}/${randomNumbers.slice(5, 6)}.${randomNumbers.slice(6, 7)}.${randomNumbers.slice(7)}`;
      setRandomCode(randomCode);
    };
    generateRandomCode();
  }, []);

  const handleBarcodeInput = (event) => {
    setBarcode(event.target.value);
  };

  const handleBarcodeSubmit = () => {
  };

  const handleBackClick = () => {
  };

  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = selectedProducts.reduce((sum, product) => sum + product.price, 0);
      setTotalPrice(total);
    };
    calculateTotalPrice();
  }, [selectedProducts]);

  const handleInputChange = (value) => {
    setBarcode(prevBarcode => prevBarcode + value);
  };

  const handleClearInput = () => {
    setBarcode('');
  };

  const handleDeleteLastInput = () => {
    setBarcode(prevBarcode => prevBarcode.slice(0, -1));
  };

  return (
    <div className="sales-screen">
      <header className="header">
        <button onClick={handleBackClick} className="back-button">
          <ArrowBackIcon />
        </button>
        <h1 className="title">SATIŞ BELGESİ</h1>
        <button className="price-button">
          <VisibilityIcon /> Fiyat Gör
        </button>
      </header>

      <div className="main">
        <div className="left-panel">
          <div className="barcode-input">
            <input
              type="text"
              placeholder="Klavyeden Barkod Girişi"
              value={barcode}
              onChange={handleBarcodeInput}
            />
            <button onClick={handleBarcodeSubmit}>✓</button>
          </div>
          <div className="category-buttons">
            {view === 'categories' && (
              <div className="categories">
                <button onClick={() => setView('subcategories')}>Kategoriler</button>
                <button onClick={() => setView('products')}>Alt Kategoriler</button>
                <button onClick={() => setFilteredProducts(products)}>Ürünler</button>
              </div>
            )}
            {view === 'products' && filteredProducts.map((product, index) => (
              <div key={index} className="product-card" onClick={() => setSelectedProduct(product)}>
                <img src={product.image} alt={product.name} />
              </div>
            ))}
          </div>
        </div>
        
        <div className="center-panel">
          <div className="selected-products">
            {selectedProducts.map((product, index) => (
              <div key={index} className="product-item">
                <p>{product.barcode}</p>
                <p>{product.price} TL</p>
              </div>
            ))}
          </div>
          <div className="total-section">
            <div className="subtotal">Ara Toplam: {selectedProduct ? `${selectedProduct.price} TL` : '0 TL'}</div>
            <div className="total">Toplam Tutar: {totalPrice.toFixed(2)} TL</div>
          </div>
        </div>

        <div className="right-panel">
          <div className="button-group">
            <div className="upper-buttons">
              <button className="button">İsimden Ara</button>
              <button className="button">Satıcı</button>
              <button className="button">A101 Hadi</button>
              <button className="button">Taksitli</button>
              <button className="button">Belge İptal</button>
              <button className="button">Satır İptal</button>
              <button className="button">Taksitli</button>
            </div>
            <div className="input-section">
              <input type="text" value={barcode} readOnly />
              <button className="button clear-button" onClick={handleClearInput}><CloseIcon /></button>
              <button className="button delete-button" onClick={handleDeleteLastInput}>-</button>
            </div>
            <div className="numpad">
              <button className="button" onClick={() => handleInputChange('7')}>7</button>
              <button className="button" onClick={() => handleInputChange('8')}>8</button>
              <button className="button" onClick={() => handleInputChange('9')}>9</button>
              <button className="button" onClick={() => handleInputChange('00')}>00</button>
              <button className="button clear-button"><DeleteIcon /></button>
              <button className="button" onClick={() => handleInputChange('4')}>4</button>
              <button className="button" onClick={() => handleInputChange('5')}>5</button>
              <button className="button" onClick={() => handleInputChange('6')}>6</button>
              <button className="button large-button">Ara Toplam</button>
              <button className="button" onClick={() => handleInputChange('1')}>1</button>
              <button className="button" onClick={() => handleInputChange('2')}>2</button>
              <button className="button" onClick={() => handleInputChange('3')}>3</button>
              <button className="button large-button">Miktar</button>
              <button className="button" onClick={() => handleInputChange('0')}>0</button>
              <button className="button" onClick={() => handleInputChange('.')}>.</button>
              <button className="button enter-button">Giriş</button>
              <button className="button large-button">Kampanya Listesi</button>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="left-footer">
          Satıcı/Müşteri
        </div>
        <div className="center-footer">
          SATIŞ BELGESİ: {randomCode}
        </div>
        <div className="right-footer">
          <div className={`status-indicator ${isOnline ? 'online' : 'offline'}`} />
        </div>
      </footer>
    </div>
  );
};

export default SalesScreen;
