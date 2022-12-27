import React, { useState, useEffect, useContext } from "react";
import { Form, Button, Navbar, Nav, Container, Carousel, Table } from 'react-bootstrap';
import NoteContext from '../useContext/NoteContext';
import { Link } from "react-router-dom";
import Axios from "axios";

function View_cart() {
  const [product, setProducts] = useState([]);
  const [gross, setGross] = useState(0);
  const [user,setUser]= useState('');
  const valueContext = useContext(NoteContext);


  useEffect(() => {

    Axios.get("http://localhost:4700/viewcart")
      .then(
        res => {
          setProducts(res.data);

          localStorage.setItem('items', JSON.stringify(res.data));

          let g = 0;

          if (res.data.length > 0)
            for (let i = 0; i < res.data.length; i++) {
              g += res.data[i].item_price * res.data[i].qty;
            }
          setGross(g);
          localStorage.setItem("gross", g);

        })

  }, []);


  const incQty = (e) => {
    e.preventDefault();
    const id = e.target.id;
    console.log(id);
    Axios.get(`http://localhost:4700/incqty/${id}`)
      .then(res => {
        setProducts(res.data);
        localStorage.setItem('items', JSON.stringify(res.data));

        let g = 0;
        console.log(res.data);
        if (res.data.length > 0)
          for (let i = 0; i < res.data.length; i++) {
            g += res.data[i].item_price * res.data[i].qty;
          }
        setGross(g);
        localStorage.setItem("gross", g);

      })
  }

  const decQty = (e) => {
    e.preventDefault();
    const id = e.target.id;
    console.log(id);
    Axios.get(`http://localhost:4700/decqty/${id}`)
      .then(res => {
        setProducts(res.data);
        localStorage.setItem('items', JSON.stringify(res.data));

        let g = 0;
        console.log(res.data);
        if (res.data.length > 0)
          for (let i = 0; i < res.data.length; i++) {
            g += res.data[i].item_price * res.data[i].qty;
          }
        setGross(g);
        localStorage.setItem("gross", g);

      })
  }

  const delCart = (e) => {
    e.preventDefault();
    const id = e.target.id;
    console.log(id);
    Axios.get(`http://localhost:4700/delcart/${id}`)
      .then(res => {
        setProducts(res.data);
        localStorage.setItem('items', JSON.stringify(res.data));
        valueContext.setCount(valueContext.count - 1)
        let g = 0;
        console.log(res.data);
        if (res.data.length > 0)
          for (let i = 0; i < res.data.length; i++) {
            g += res.data[i].item_price * res.data[i].qty;
          }
        setGross(g);
        localStorage.setItem("gross", g);

      })
  }


  useEffect(() => {
    Axios.get('http://localhost:4200/showcart').then(res => setProducts(res.data));
    setUser(localStorage.getItem('username'));
  }, [])


  function onDelete(e) {
    const id = e.target.id;
    Axios.get(`http://localhost:4200/productdeletecart/${id}`).then(res => setProducts(res.data));
  }

  
  return (
    <>
      {/* ======= Header ======= */}
      <header id="header" className="header fixed-top d-flex align-items-center">
        <div className="container d-flex align-items-center justify-content-between">
          <a href="index.html" className="logo d-flex align-items-center me-auto me-lg-0">
            {/* Uncomment the line below if you also wish to use an image logo */}
            {/* <img src="assets/img/logo.png" alt=""> */}
            <h1>Techno <span>service</span></h1>
          </a>
        <span>{user}</span>

          <i className="mobile-nav-toggle mobile-nav-show bi bi-list" />
          <i className="mobile-nav-toggle mobile-nav-hide d-none bi bi-x" />
        </div>
      </header>{/* End Header */}

      <div>
        <hr/>
        <hr/>
        <hr/>
        <div>
        <h1 align="center">Customer Cart</h1>
        </div>
        <hr />
        <Table striped bordered hover>
          <thead>
            <th>Product Id</th>
            <th>Product Image</th>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Product Quantity</th>
          </thead>
          <tbody>
            {product.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td><img src={item.item_image} width="100" height="100" /></td>
                  <td>{item.item_name}</td>
                  <td>{item.item_price}</td>
                  <td>{item.item_details}</td>
                  <td>
                    <Button variant="danger" onClick={incQty} id={item.id}
                      value={item.id} > + </Button>
                    &nbsp;&nbsp;
                    {item.qty}
                    &nbsp;&nbsp;
                    <Button variant="danger" onClick={decQty} id={item.id}
                      value={item.id} > - </Button>

                  </td>
                  <td><Button variant="danger" id={item.id} onClick={delCart}>Delete</Button></td>
                </tr>
              )
            })}


          </tbody>
        
        </Table>
              <div className="checkout">
                  <h4 class="Subtotal">Total Payable Amount: ₹{gross}</h4>

            </div>
            <br/>
            <Link to='/loginpayment' className="buy">
                  <Button >Buy Now</Button> </Link>
            {/* {proceed ? <Link to='/loginpayment' className="buy">
                  <Button >Buy Now</Button> </Link> : 
                  <Link to='/contact' className="buy">
                  <Button >Buy Now</Button>
            </Link>} */}
            
            <br/><br/>
      </div>
    </>
  )
}
export default View_cart;
