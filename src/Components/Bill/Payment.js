import React, { useState, useEffect } from 'react';
import Axios from "axios";
import { NavLink as Link } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import Header1 from '../Layout/Header1.js';
import Footer1 from '../Layout/Footer1.js';


export default function Payment() {
    const [customername, setCustomername] = useState('');
    const [cardno, setCardno] = useState();
    const [password, setPassword] = useState('');
    const [amount, setAmount] = useState('');

    function handleChange(e) {
        e.preventDefault();
        setCustomername(e.target.value);
    };

    function handleChange1(e) {
        e.preventDefault();
        setCardno(e.target.value);
    };

    function handleChange2(e) {
        e.preventDefault();
        setPassword(e.target.value);
    };

    function mysubmit() {
        const data = { "cname": customername, "cardno": cardno, "amount": amount, "products": JSON.parse(localStorage.getItem('items')) };
        console.log(data);
        Axios.post("http://localhost:4700/payment", data).then(
            res => console.log("payment done"));
        setCardno();
        setPassword('');
        window.alert("payment done");

    }


    useEffect(() => {
        setAmount(localStorage.getItem("gross"));
        setCustomername(localStorage.getItem("cname"));
    }, []);



    return (
        <div>
            <Header1 />
            <br /><br /><br />
            <br/><br/>
            <Container>

                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Customer Name</Form.Label>
                        <Form.Control type="text" value={customername}
                            onChange={handleChange}

                        />

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Card No</Form.Label>
                        <Form.Control type="text" value={cardno}
                            onChange={handleChange1}

                        />

                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"
                            value={password}
                            onChange={handleChange2}
                        />
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control type="text" placeholder="Amount"
                            value={amount}

                        />
                    </Form.Group>

                    <Button variant="primary" type="button" onClick={mysubmit}>
                        Submit
                    </Button>
                </Form>

                <Link className='button4' text-decoration='none' to='/bill'>Bill Generate</Link>

            </Container>
            <br /><br />
            <Footer1 />
        </div>


    );
}

