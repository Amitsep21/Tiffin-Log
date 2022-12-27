//tiffin provider view for admin
import { useState, useEffect} from "react";
import {Button} from 'react-bootstrap';
import Table from 'react-bootstrap/table';
import Viewitem from './Viewitem.js'
import Axios from "axios";


function AdminPanel() {
  const [provider, setProvider] = useState([]);
  const [id, setId] = useState("");
  const [name,setName]=useState('');

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
    .then((res) =>setProvider(res.data)
    );
    console.log(provider);
  }, []);

  const search=()=>{
    let a=false;
    if(id==''){
        alert("Kindly enter the ID number");
        a=true;
    }
    if(a){
        return;
    }
    else{
    const data={'name':name,'id':id};
    Axios.post('http://localhost:4700/searchprovider',data)
    .then(res=>setProvider(res.data));
    console.log(provider);
    }
  }

  const viewitem=(e)=>{
    const myvalue=e.target.value;
    const myname={"myvalue":myvalue}
    console.log(myname);
    Axios.post("http://localhost/viewitem",myname)
    .then(res=>setProvider(res.data));
    console.log(provider);
  }

  const deleteuser=(e)=>{
    const id=e.target.value;
    console.log(id);
    Axios.post(`http://localhost:4700/deleteprovider/${id}`)
    .then((res)=>setProvider(res.data));
  }

  return (
    <div>

      {/* <input type='text' value={name} placeholder='enter the text' onChange={handlename} required/> */}
      <input type='text' value={id} placeholder='enter the id' onChange={handleid} required/>
      <Button variant="primary" type="button" onClick={search}><span>Search</span></Button>
           
               {/* <div className='container'> */}
               <div>
                   <Table striped bordered hover size="sm">
                     <thead>
                       <tr>
                         <th>Id</th>
                         <th>Username</th>
                         <th>Contact information</th>
                         <th>Email</th>
                         <th>View items</th>
                         <th>Delete User</th>
                       </tr>
                     </thead>
                     <tbody>
                      {provider.map((item, index) => {
                      return (
                       <tr key={index}>
                       <td>{item.id}</td>
                       <td>{item.username}</td>
                       <td>{item.mobileno}</td>
                       <td>{item.email}</td>
                        <td><Button variant="primary" value={item.email} id={item.id} onClick={handlename}>view item</Button></td>
                        <td><Button variant="danger" value={item.email} id={item.id} onClick={deleteuser}>Delete</Button></td>
                        </tr> );
                         })}
                     </tbody>
                   </Table>
                   <div><Viewitem name={name}/></div>
                   </div>
        
    </div>
  );
}

export default AdminPanel;


