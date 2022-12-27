import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useEffect, useState } from 'react';
import '../App.css';
import {NavLink as Link, useNavigate } from 'react-router-dom';
import { propTypes } from 'react-bootstrap/esm/Image';


function Login() {
    const [email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const navigate=useNavigate();

    const handleEmail=(e)=>{
        e.preventDefault();
        setEmail(e.target.value);
    }

    const handlepassword=(e)=>{
        e.preventDefault();
        setPassword(e.target.value);
    };

    useEffect(()=>{
       window.scrollTo(0, 0)
    },[]);

    async function onlogin(e){
        e.preventDefault();

        const data={'email':email,'password':password};
        const config={
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify(data)
        }
        console.log(config)
        const response=await fetch('http://localhost:4700/login',config)
        const json=await response.json();
        console.log(json);
        localStorage.setItem("username",JSON.stringify(json[0].username));

        // console.log(json[0].category);
        // alert("welcome");
        if(json.length===0)
        {
            alert("invalid user try again");
            
        }
        else if(json[0].category==="Provider")
        {
            alert("welcome Provider");
            localStorage.setItem("userid",email);
            navigate("/tiffindescription");
        }
        else if(json[0].category==="Customer")
        {    
            alert("welcome customer");
            navigate("/");
        }
        else if(json[0].category==="Admin")
        {    
            alert("welcome to admin panel");
            navigate("/adminview");
        }
        
    }
    

   
  return (
    <div>
            {/* ======= Header ======= */}
  <header id="header" className="header fixed-top d-flex align-items-center">
    <div className="container d-flex align-items-center justify-content-between">
      <a href="index.html" className="logo d-flex align-items-center me-auto me-lg-0">
        {/* Uncomment the line below if you also wish to use an image logo */}
        {/* <img src="assets/img/logo.png" alt=""> */}
        <h1>Techno <span>service</span></h1>
      </a>
      <nav id="navbar" className="navbar">
       
      </nav>
      
      <i className="mobile-nav-toggle mobile-nav-show bi bi-list" />
      <i className="mobile-nav-toggle mobile-nav-hide d-none bi bi-x" />
    </div>
  </header>{/* End Header */}
<br/>
<br/>
<br/>
<body className="bg-gradient-primary">

<div className="container">

    
    <div className="row justify-content-center">

        <div className="col-xl-10 col-lg-12 col-md-9">

            <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                    
                    <div className="row">
                        <div className="col-lg-6 d-none d-lg-block"><img src="login.jpeg" height="600px" width="500px" alt='login'></img></div>
                        <div className="col-lg-6">
                            <div className="p-5">
                                <div className="text-center">
                                    <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                </div>
                                <form className="user">
                                    <div className="form-group">
                                        <input type="text" className="form-control form-control-user"
                                            id="exampleInputEmail" aria-describedby="emailHelp"
                                            placeholder="Enter Username..." onChange={handleEmail}/>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control form-control-user"
                                            id="exampleInputPassword" placeholder="Password" onChange={handlepassword}/>
                                    </div>
                                    <button type='button' className="btn btn-primary btn-user btn-block" onClick={onlogin}>
                                        Login
                                    </button>
                                    <hr/>
                                </form>
                                
                                <div className="text-center">
                                    <Link className="small" to="forgot-password.html">Forgot Password?</Link>
                                </div>
                                <div className="text-center">
                                    <Link className="small" to="/signup">Create an Account!</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </div>
</div>
<script src="vendor/jquery/jquery.min.js"></script>
<script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="vendor/jquery-easing/jquery.easing.min.js"></script>
<script src="js/sb-admin-2.min.js"></script>

</body>
     {/* ======= Footer ======= */}
     <footer id="footer" className="footer">
    <div className="container">
      <div className="row gy-3">
        <div className="col-lg-3 col-md-6 d-flex">
          <i className="bi bi-geo-alt icon" />
          <div>
            <h4>Address</h4>
            <p>
              A108 Adam Street <br />
              New York, NY 535022 - US<br />
            </p>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 footer-links d-flex">
          <i className="bi bi-telephone icon" />
          <div>
            <h4>Reservations</h4>
            <p>
              <strong>Phone:</strong> +1 5589 55488 55<br />
              <strong>Email:</strong> info@example.com<br />
            </p>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 footer-links d-flex">
          <i className="bi bi-clock icon" />
          <div>
            <h4>Opening Hours</h4>
            <p>
              <strong>Mon-Sat: 11AM</strong> - 23PM<br />
              Sunday: Closed
            </p>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 footer-links">
          <h4>Follow Us</h4>
          <div className="social-links d-flex">
            <a href="#" className="twitter"><i className="bi bi-twitter" /></a>
            <a href="#" className="facebook"><i className="bi bi-facebook" /></a>
            <a href="#" className="instagram"><i className="bi bi-instagram" /></a>
            <a href="#" className="linkedin"><i className="bi bi-linkedin" /></a>
          </div>
        </div>
      </div>
    </div>
    <div className="container">
      <div className="copyright">
        © Copyright <strong><span>Techno service</span></strong>. All Rights Reserved
      </div>
      <div className="credits">
        {/* All the links in the footer should remain intact. */}
        {/* You can delete the links only if you purchased the pro version. */}
        {/* Licensing information: https://bootstrapmade.com/license/ */}
        {/* Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/Techno service-bootstrap-restaurant-website-template/ */}
        Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
      </div>
    </div>
  </footer>{/* End Footer */}
  {/* End Footer */}
</div>

  );
}

export default Login;
