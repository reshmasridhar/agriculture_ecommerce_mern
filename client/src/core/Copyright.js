import React from 'react';
import Typography from '@material-ui/core/Typography';
import PhoneIcon from '@material-ui/icons/Phone';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EmailIcon from '@material-ui/icons/Email';
import logo from "../asserts/whitelogo.png";

const Copyright = () => {
  return (
    <footer className='d-flex flex-column flex-sm-row justify-content-between page-container p-5' style={{backgroundColor: '#4CAF50'}}>
      <div className="footer-left pt-2">
        <footer className="footer-section">
          <style>
            {/* Your CSS styles */}
          </style>
          <div className="container">
            <div className="footer-cta pt-5 pb-5 text-center">
              <div className="row">
                <div className="col-md-4 mb-30 mx-auto text-end"> {/* Adjusted the alignment to the right */}
                  <div className="single-cta">
                    <i className="fas fa-map-marker-alt"></i>
                    <div className="cta-text">
                      <h4><LocationOnIcon/> Find us</h4>
                      <span>1/302 Modhur,</span>
                      <span>Vaniputhur,</span>
                      <span>Erode 638506</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-30 mx-auto text-end"> {/* Adjusted the alignment to the right */}
                  <div className="single-cta">
                    <i className="fas fa-phone"></i>
                    <div className="cta-text">
                      <h4><PhoneIcon/> Call us</h4>
                      <span>+91 8754109940</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-30 mx-auto text-end"> {/* Adjusted the alignment to the right */}
                  <div className="single-cta">
                    <i className="far fa-envelope-open"></i>
                    <div className="cta-text">
                      <h4><EmailIcon/> Mail us</h4>
                      <span>bannariammaagrotraders@gmail.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr></hr>
            {/* Your second segment */}
            <div className="footer-content pt-5 pb-5">
              <div className="row">
                <div className="col-md-4 mb-50 text-end">
                  <div className="footer-widget text-center">
                    <div className="footer-social-icon">
                      <span>SRI BANNARI AGRO TRADERS</span>
                    </div>
                    <div className="footer-text">
                      <p>Your trusted partner for all agricultural needs. From seeds to equipment, we've got you covered!</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-50 text-end">
                  <img src={logo} alt="Logo" style={{ width:'200px',height:'200px',marginBottom:'10px',marginTop: '-75px' }} />
                </div>
                <div className="col-md-4 mb-50 text-end">
                  <div className="footer-text ">
                    <p>Thank you for visiting us!</p>
                    <p>Hope you had a great shopping experience</p>
                    <p>All rights reserved 2024.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
      <div className="footer-right pt-2">
        <span className='pe-1 text-white'></span>
        <span className='fw-bold' style={{ color: "#78909c", cursor: "pointer" }} onClick={() => { window.open("https://github.com") }}></span>
      </div>
    </footer>
  )
}

export default Copyright;
