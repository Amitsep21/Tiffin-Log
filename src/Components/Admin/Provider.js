//tiffin provider view for admin
import { useState, useEffect, useCallback, useContext, useRef } from "react";
import { Button } from 'react-bootstrap';
import Viewitem from './Viewitem.js'
import Axios from "axios";
import NoteContext from "../../useContext/NoteContext";



function Provider() {
    const [provider, setProvider] = useState([]);
    const [name, setName] = useState('');
    const [id, setId] = useState("");
   

    const valueContext = useContext(NoteContext);


    function handleid(e) {
        e.preventDefault();
        setId(e.target.value);
    }

    function handlename(e) {
        e.preventDefault();
        setName(e.target.value);
    }

    useEffect(() => {
        Axios.get("http://localhost:4700/provider")
            .then((res) => {
                setProvider(res.data)

                console.log(provider)
            })
    }, []);

    const viewitem = (e) => {
        const myvalue = e.target.value;
        const myname = { "myvalue": myvalue }
        console.log(myname);
        Axios.post("http://localhost:4700/viewitem", myname)
            .then(res => setProvider(res.data));
        console.log(provider);
    }


    const addCart = async (e) => {
        e.preventDefault();
        const id = e.target.id;

        console.log(id);
        let x = await Axios.get(`http://localhost:4700/addcart/${id}`)
        if (x.data !== '')
            valueContext.setCount(valueContext.count + 1);

    }

    const deleteuser = (e) => {
        const id = e.target.value;
        console.log(id);
        Axios.post(`http://localhost:4700/deleteprovider/${id}`)
            .then((res) => setProvider(res.data));
    }

    return (
        <div id="#chefs">
            {/* <!-- ======= Chefs Section ======= --> */}
            <section className="chefs section-bg">
                <div className="container" data-aos="fade-up">

                    <div className="section-header">
                        <h2>Chefs</h2>
                        <p>Our <span>Professional</span> Providers</p>
                    </div>
        
                    <div>
                        <div className="card-group">
                            {provider.map((item, index) => {

                                return (
                                    <div className="col" key={index}>

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
                                                        <li><Button variant="primary" value={item.email} id={item.id} onClick={handlename}>view item</Button></li>

                                                    </ul>
                                                </div>
                                            </div>



                                        </div>

                                    </div>


                                );

                            })}
                            &ensp;&ensp;&ensp;&ensp;
                        </div>
                    </div>
                </div>
            </section>
            <div className="member-info">

                {/* ======= Stats Counter Section ======= */}
                <section id="stats-counter" className="stats-counter">
                    <div className="container" data-aos="zoom-out">


                    </div>
                </section>{/* End Stats Counter Section */}
                <div><Viewitem name={name} /></div>
            </div>
        </div>


    );
}

export default Provider;
