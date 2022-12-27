import React from 'react';
import {NavLink as Link } from 'react-router-dom';

function About(props) {
    return (
        <div>
            
        {/* ======= About Section ======= */}
        <section id="about" className="about">
          <div className="container" data-aos="fade-up">
            <div className="section-header">
              <h2>About Us</h2>
              <p>Learn More <span>About Us</span></p>
            </div>
            <div className="row gy-4">
              <div className="col-lg-7 position-relative about-img" style={{ backgroundImage: 'url(assets/img/about.jpg)' }} data-aos="fade-up" data-aos-delay={150}>
                <div className="call-us position-absolute">
                  <h4>Book a Table</h4>
                  <p>+95015-48486</p>
                </div>
              </div>
              <div className="col-lg-5 d-flex align-items-end" data-aos="fade-up" data-aos-delay={300}>
                <div className="content ps-0 ps-lg-5">
                  <p className="fst-italic">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                    magna aliqua.
                  </p>
                  <ul>
                    <li><i className="bi bi-check2-all" /> Ullamco laboris nisi ut aliquip ex ea commodo consequat.</li>
                    <li><i className="bi bi-check2-all" /> Duis aute irure dolor in reprehenderit in voluptate velit.</li>
                    <li><i className="bi bi-check2-all" /> Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate trideta storacalaperda mastiro dolore eu fugiat nulla pariatur.</li>
                  </ul>
                  <p>
                    Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                    velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident
                  </p>
                  <div className="position-relative mt-4">
                    <img src="assets/img/about-2.jpg" className="img-fluid" alt='fluid' />
                    <Link to="https://www.youtube.com/watch?v=LXb3EKWsInQ" className="glightbox play-btn" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>{/* End About Section */}

        </div>
    );
}

export default About;