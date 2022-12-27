import React from 'react';
import './App.css';
import { useEffect, useState, useContext } from 'react';
import Axios from 'axios';
import Footer from './Components/Layout/Footer.js';
import { NavLink as Link, Route, Routes, useNavigate } from 'react-router-dom';
import Body from './Components/Layout/Body';
import NoteContext from "./useContext/NoteContext.js";
import Search from './Components/Search.js';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import Badge from '@mui/material/Badge';
import SearchIcon from '@mui/icons-material/Search.js';
import Tiffintype from './Components/Tiffindescription';
import SignUp from './Components/Signup';
import Front from './Home';
import AdminViews from './Components/Admin/AdminView';
import View_cart from './Components/Shopping';
import LoginPayment from './Components/LoginPayment';
import Bill from './Components/Bill/Bill';
import Payment from './Components/Bill/Payment';
import LoginJwt from './Components/LoginWithJwt';
import Login from './Components/Login';
import Viewitem from './Components/Admin/Viewitem';
import Contact from './Components/Layout/Contact';
import About from './Components/Layout/About';
import Menu from './Components/Menu/Menu';

export default function Main() {
  const [id, setId] = useState("");
  const [city, setCity] = useState([]);
  const [srch, setSrch] = useState('pop');
  const [text, setText] = useState('');
  const [proceed,setProceed]=useState(false);
  const navigate=useNavigate();
  const auth = localStorage.getItem('username');


  const valueContext = useContext(NoteContext);

  // useEffect(() => {
  //   window.scrollTo(0, 0)

  // }, []);


  useEffect(() => {
    Axios.get("http://localhost:4700/viewcount").then
      (
        res => {
          valueContext.setCount(res.data[0].count)
          console.log(valueContext);

        })
  }, [valueContext]);

  function handleSearch() {
    setSrch(text);
  }

  function handleText(e) {
    e.preventDefault();
    setText(e.target.value);
  }

  function handleid(e) {
    e.preventDefault();
    setId(e.target.value);
  }

  function handleCity(e) {
    e.preventDefault();
    setCity(e.target.value);
  }


  const logOut = () => {
    localStorage.clear();
    navigate("/");
  }

  return (
    <>
      {/* <Header /> */}
      {/* <!-- ======= Header ======= --> */}
      <header
        id="header"
        className="header fixed-top d-flex align-items-center"
      >
        <div className="container d-flex align-items-center justify-content-between">
          <Link
            to="/"
            className="logo d-flex align-items-center me-auto me-lg-0"
          >
            {/* Uncomment the line below if you also wish to use an image logo */}
            {/* <img src="assets/img/logo.png" alt=""> */}
            <h1>
              Techno<span>Service</span>
            </h1>
          </Link>
        
          {/* <div className='searchmain'>
            <input type='text' value={text} className="" placeholder='enter your city' onChange={handleText} required />
            <SearchIcon fontSize="large" onClick={handleSearch} className=''>
            </SearchIcon>

          </div> */}
          <nav id="navbar" className="navbar nav-link">
            <ul>
              <li>

                <a href="/">Home</a>

              </li>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/menu">Menu</a>
              </li>

              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </nav>
          {
            auth ? <Link onClick={logOut}  to="/login" className="btn-book-a-table">LogOut</Link> :
              <>
                <br />
                <Link to="/login" className="btn-book-a-table"> Login</Link>
              </>
          }
          
          <Link to="/cart">
            <Badge badgeContent={valueContext.count} color='error'>
              <ShoppingCartCheckoutIcon />
            </Badge>
          </Link>
          <i className="mobile-nav-toggle mobile-nav-show bi bi-list" />
          <i className="mobile-nav-toggle mobile-nav-hide d-none bi bi-x" />
        </div>
      </header>

      <div>
      <div>
        <Routes>
          <Route exact path="/" element={<Front/>} />
          <Route exact path="/home" element={<Front />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/tiffindescription" element={<Tiffintype />} />
          <Route exact path="/viewitem" element={<Viewitem />}  target='blank'/>
          <Route exact path="/adminview" element={<AdminViews />} />
          <Route exact path="/cart" element={<View_cart />} />
          <Route exact path="/loginpayment" element={<LoginPayment/>} />
          <Route exact path="/loginpayment1" element={<LoginJwt />} />
          <Route exact path="/payment" element={<Payment />} />
          <Route exact path="/bill" element={<Bill />} />
          <Route exact path="/menu" element={<Menu />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/about" element={<About />} />

        </Routes>
      </div>
      </div>
      <div>
        {/* <Search find={srch} /> */}
      </div>
      <div>
        <Footer />
      </div>
    </>
  )
}
