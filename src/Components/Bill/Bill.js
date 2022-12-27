import React, { useState } from 'react';
import { Button, Container, Form, Table } from 'react-bootstrap'
import Axios from 'axios';
import Header1 from '../Layout/Header1.js';
import Footer1 from '../Layout/Footer1.js';


export default function Bill() {
  const [mylist, setList] = useState([]);
  const [gross, setGross] = useState('');
  const [billno, setBillno] = useState('');
  const items = JSON.parse(localStorage.getItem('items'));


  async function mysubmit() {
    const data = { 'cname': localStorage.getItem("cname") };


    const result = await Axios.post("http://localhost:4700/bill")
    setList(result.data)
    console.log(result.data)
    console.log(billno);
    console.log(items)
    setBillno(result.data[0].billno)
    setGross(result.data[0].amount)

  }


  return (
    <div>
      <Header1 />
      <br /><br /><br />
      <br /><br />
      <Container>

        <Form>
          <Button variant="primary" type="button" onClick={mysubmit}>
            Generate Bill
          </Button>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th colSpan="6">
                  <h1 align="center">INVOICE</h1>
                  <h3 align="center">Oops Info Solutions Pvt Ltd</h3>
                  <h3 align="center">Chandigarh,Sector-34A</h3>
                  <h3 align="center">Phone:0172-5009244</h3>
                  <hr></hr>
                  <h4>Invoice No:  {billno}           Invoice Date: {new Date().toDateString()}</h4>

                  Customer Name : Raman<br />
                  Shipment Address : #121
                </th>
              </tr>
            </thead>
            <br />
            <br />
            <tbody>
              <tr>
                <th> Product Id</th><th>Product Name</th><th>Individual Price </th><th>Product Quantity</th> <th>Amount</th>

              </tr>

              {mylist.map((item, index) => {
                console.log(item);
                return (
                  <tr key={index}>

                    <td>{item.id}</td>
                    <td>{item.item_name}</td>
                    <td>{item.purchase_price}</td>
                    <td>{item.purchase_qty}</td>

                    <td>{item.purchase_price * item.purchase_qty}</td>

                  </tr>
                );
              })}
              <tr>
                <td colSpan="4" align="right"><h6>Gross Payable Amount</h6></td>{gross} </tr>

            </tbody>



          </Table>
        </Form>

      </Container>
      <Footer1 />
    </div>


  );
}

