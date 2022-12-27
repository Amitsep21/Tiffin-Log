import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Viewitem from './Admin/Viewitem';


function Search(props) {
    const [provider, setProvider] = useState([]);
    const [name, setName] = useState('');
    const [id, setId] = useState("");

    
    function handleid(e) {
        e.preventDefault();
        setId(e.target.value);
    }

    function handlename(e) {
        e.preventDefault();
        setName(e.target.value);
    }

    useEffect(() => {

        if (props.find !== null) {
         
            console.log(props.find);
            var url = `http://localhost:4700/searchprovider/${props.find}`
            console.log(url)
            Axios.post(url)
                .then(res => {
                    setProvider(res.data)
                    console.log(res.data)
                })
            
        }
    }, [props.find]
    );

    return (
        <>
            {<div id="#chefs">
                {/* <!-- ======= Chefs Section ======= --> */}
                <section className="chefs section-bg ">


                    {/* <div className="container" data-aos="fade-up"> */}

                        {/* <div className="section-header">
                            <h2>Chefs</h2>
                            <p>Our <span>Professional</span> Providers</p>
                        </div> */}
            
                        <div className="card-group">

                            {provider.map((item, index) => {

                                return (
                                    <div className="col ms-4" key={index}>
                                        <div className="card">
                                            <div className="row gy-4">

                                                <div className="chef-member">
                                                    <ul className="row-lg-4 img-design ">
                                                        <ul className="member-img">
                                                            <img src="assets/img/chefs/chefs-1.jpg" className="img-fluid" alt="" />
                                                            <ul className="social">
                                                                <a href=""><i className="bi bi-twitter"></i></a>
                                                                <a href=""><i className="bi bi-facebook"></i></a>
                                                                <a href=""><i className="bi bi-instagram"></i></a>
                                                                <a href=""><i className="bi bi-linkedin"></i></a>
                                                            </ul>
                                                        </ul>
                                                        <li><span className="subheading">Provider</span></li>
                                                        {/* <li><img src={item.item_image} style={{ width: 200, height: 200 }} alt='breakfast' /></li> */}
                                                        <span>{item.username}</span>
                                                        <li>{item.id}</li>
                                                        <li className='ingredients'>{item.mobileno}</li>
                                                        <li className='ingredients'>{item.email}</li>
                                                        <li className='ingredients'>{item.city}</li>
                                                        <br />
                                                        <li>
                                                            <a href='/viewitem' target='blank'>
                                                            <Button variant="primary" value={item.email} id={item.id} onClick={handlename}>view item</Button>
                                                            </a>
                                                            </li>

                                                    </ul>
                                                </div>
                                            </div>



                                        </div>

                                    </div>


                                );

                            })}
                            &ensp;&ensp;&ensp;&ensp;
                        </div>



                    {/* </div> */}
                 </section>
                <div className="member-info">

                    <div><Viewitem name={name} /></div>
                </div>
            </div>
            }
        </>
    );
}

export default Search;

