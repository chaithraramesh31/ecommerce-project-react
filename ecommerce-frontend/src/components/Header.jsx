import { NavLink, useNavigate, useSearchParams } from 'react-router';
import { useState } from 'react';
import './Header.css';
import LogoWhite from '../assets/images/logo-white.png';
import MobileLogo from '../assets/images/mobile-logo.png';
import SearchIcon from '../assets/images/icons/search-icon.png';
import CartIcon from '../assets/images/icons/cart-icon.png';

function Header({ cart }) {
  const [searchParam] = useSearchParams();
  const search = searchParam.get('search');
  const [searchTerm, setSearchTerm] = useState(search || '');
  const navigate = useNavigate();

  let totalQuantity = 0;

  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });
  return (
    <div className="header">
      <div className="left-section">
        <NavLink to="/" className="header-link">
          <img className="logo"
            src={LogoWhite} />
          <img className="mobile-logo"
            src={MobileLogo} />
        </NavLink>
      </div>

      <div className="middle-section">
        <input className="search-bar" value={searchTerm} onChange={(event) => {setSearchTerm(event.target.value)}} onKeyDown={(event) => {if(event.key === 'Enter') {navigate(`/?search=${searchTerm}`)}}} type="text" placeholder="Search" />

        <button className="search-button" onClick={() => {navigate(`/?search=${searchTerm}`)}}>
          <img className="search-icon" src={SearchIcon} />
        </button>

        <button className='close-button' onClick={() => {navigate('/'); setSearchTerm('');}}>Clear</button>
      </div>

      <div className="right-section">
        <NavLink className="orders-link header-link" to="/orders">

          <span className="orders-text">Orders</span>
        </NavLink>

        <NavLink className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src={CartIcon} />
          <div className="cart-quantity">{totalQuantity}</div>
          <div className="cart-text">Cart</div>
        </NavLink>
      </div>
    </div>
  );
}

export default Header;