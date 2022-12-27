import React from 'react';
import { useState, useEffect, useCallback, useContext, useRef } from "react";
import { Button } from 'react-bootstrap';
import Viewitem from '../Admin/Viewitem'
import Axios from "axios";
import NoteContext from "../../useContext/NoteContext";
import Search from '../../Components/Search';
import SearchIcon from '@mui/icons-material/Search';

function Menu() {
  const [name, setName] = useState('');
  const [id, setId] = useState("");
  const [city, setCity] = useState([]);
  const [srch, setSrch] = useState('pop');
  const [text, setText] = useState('');


  function handleid(e) {
    e.preventDefault();
    setId(e.target.value);
  }

  function handlename(e) {
    e.preventDefault();
    setName(e.target.value);
  }
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


  return (
    <div>
        <br/>
        <br/>
        <br/>
        <br/>
        <div className='searchmain'>
          <input type='text' value={text} placeholder='enter your city' onChange={handleText} required />
          <SearchIcon fontSize="large" onClick={handleSearch}>
            {/* <Button type="button" className='searchIcon' onClick={handleSearch} variant='danger'>Search</Button> */}
          </SearchIcon>
        </div>
      
        <div>
          <Search find={srch} />
        </div>
  
    </div>
    
      );
}

export default Menu;