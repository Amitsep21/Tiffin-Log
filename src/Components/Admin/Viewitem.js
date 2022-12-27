import React from "react";
import { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { Button } from 'react-bootstrap';
import NoteContext from "../../useContext/NoteContext.js";

function ViewItem(props) {
  const [breakfast, setBreakfast] = useState([]);
  const [lunch, setLunch] = useState([]);
  const [dinner, setDinner] = useState([]);
  const [name,setName]= useState('');
  const valueContext = useContext(NoteContext);

  useEffect(() => {
    if (props.name === '') {
      return
    }
    else if (props.name != null) {
      var url = `http://localhost:4700/viewibreak/${props.name}`;
      console.log(url);
      Axios.get(url).then((res) => {
        setBreakfast(res.data);
      });
      var lnch = `http://localhost:4700/viewlunch/${props.name}`;
      console.log(lnch);
      Axios.get(lnch)
        .then((res) => {
          setLunch(res.data);
        });
      var dinr = `http://localhost:4700/viewdinner/${props.name}`
      console.log(dinr);
      Axios.get(dinr)
        .then((res) => {
          setDinner(res.data);
        })
    }
  }, [props.name]);

  const addCart = async (e) => {
    e.preventDefault();
    const id = e.target.id;
    setName(localStorage.getItem('username'));

    console.log(id);
    let x = await Axios.get(`http://localhost:4700/addcart/${id}`)
    if (x.data !== '')
      valueContext.setCount(valueContext.count + 1);

  }

  return (
    <div className="card-group ">
      {props.name ?
      <>
        <div className="card">
          <table stripped='col justify-items '>

            <tbody>
              <div class="card h-100 w-40 ms-4">

                <div className=" menu-item ">

                  {breakfast.map((item, index) => {
                    return (
                      <ul key={index} className="row-lg-4 menu-item img-design ">
                        <li><span className="subheading">Breakfast</span></li>
                        <li><img src={item.item_image} style={{ width: 200, height: 200 }} alt='breakfast' /></li>
                        <span>{item.item_name}</span>
                        <li>{item.id}</li>
                        <li className='ingredients'>{item.item_details}</li>
                        <li className='ingredients'>{item.item_category}</li>
                        <li className='price'>${item.item_price}</li>
                        <br />
                        <li><Button onClick={addCart} id={item.id} value={item.id} size="Medium" className="btn-book-a-table">Add to Cart</Button></li>

                      </ul>
                    );
                  })}
                </div>
              </div>
            </tbody>
          </table>
        </div><div className="card">

            <table stripped='col justify-items'>


              <tbody>
                <div class="card h-100">

                  <div className=" menu-item ">

                    {lunch.map((item, index) => {
                      return (
                        <ul key={index} className="row-lg-4 menu-item img-design ">
                          <li><span className="subheading">Lunch</span></li>
                          <li><img src={item.item_image} style={{ width: 200, height: 200 }} alt='breakfast' /></li>
                          <span>{item.item_name}</span>
                          <li>{item.id}</li>
                          <li className='ingredients'>{item.item_details}</li>
                          <li className='ingredients'>{item.item_category}</li>
                          <li className='price'>${item.item_price}</li>
                          <br />
                          <li><Button onClick={addCart} id={item.id} value={item.id} size="Medium" className="btn-book-a-table">Add to Cart</Button></li>

                        </ul>

                      );
                    })}
                  </div>
                </div>
              </tbody>
            </table>
          </div><div className="card">

            <table stripped='col justify-items'>

              <tbody>
                <div class="card h-100">

                  <div className=" menu-item ">

                    {dinner.map((item, index) => {
                      return (
                        <ul key={index} className="row-lg-4 menu-item img-design ">
                          <li><span className="subheading">Dinner</span></li>
                          <li><img src={item.item_image} style={{ width: 200, height: 200 }} alt='breakfast' /></li>
                          <span>{item.item_name}</span>
                          <li>{item.id}</li>
                          <li className='ingredients'>{item.item_details}</li>
                          <li className='ingredients'>{item.item_category}</li>
                          <li className='price'>${item.item_price}</li>
                          <br />
                          <li><Button onClick={addCart} id={item.id} value={item.id} size="Medium" className="btn-book-a-table">Add to Cart</Button></li>

                        </ul>

                      );
                    })}
                  </div>
                </div>
              </tbody>
            </table>
          </div>
        </>

        :
        ""
      }
    </div>


  )
}
export default ViewItem;
