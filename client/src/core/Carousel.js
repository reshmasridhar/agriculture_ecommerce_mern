import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './Carousel.css'; // Import custom CSS for carousel styling
import home1 from "../asserts/home1.png";
import home2 from "../asserts/home2.png";
import home3 from "../asserts/home3.png";
import home4 from "../asserts/home4.png";
import home5 from "../asserts/home5.png";
import home6 from "../asserts/home6.png";
const Carousel = () => {
  return (
    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={home3} className="d-block w-100" alt="Slide 1" style={{ height: '400px' }} />
          <div className="carousel-caption d-none d-md-block">
           
            <h5  style={{ fontSize: '48px' }}>Crops to Clicks: Your One-Stop Agro Shop</h5>
            
            
          </div>
        </div>
        <div className="carousel-item">
          <img src={home1} className="d-block w-100" alt="Slide 2" style={{ height: '00px' }}/>
        </div>
        <div className="carousel-item">
          <img src="https://via.placeholder.com/800x400" className="d-block w-100" alt="Slide 3" />
        </div>
      </div>
      {/* <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button> */}
    </div>
  );
};

export default Carousel;