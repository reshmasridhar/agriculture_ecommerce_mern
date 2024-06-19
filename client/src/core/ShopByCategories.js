import React from 'react';

const ShopByCategories = () => {
  return (
    // <div className="container mt-5">
    //   <h2 className="mb-4">Shop By Categories</h2>
    //   <div className="row">
    //     <div className="col-md-4 mb-4">
    //       <div className="card">
    //         <img src="https://via.placeholder.com/300x200" className="card-img-top" alt="Category 1" />
    //         <div className="card-body">
    //           <h5 className="card-title">Category 1</h5>
    //           <p className="card-text">Description of category 1.</p>
    //           <a href="#" className="btn btn-primary">Explore</a>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="col-md-4 mb-4">
    //       <div className="card">
    //         <img src="https://via.placeholder.com/300x200" className="card-img-top" alt="Category 2" />
    //         <div className="card-body">
    //           <h5 className="card-title">Category 2</h5>
    //           <p className="card-text">Description of category 2.</p>
    //           <a href="#" className="btn btn-primary">Explore</a>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="col-md-4 mb-4">
    //       <div className="card">
    //         <img src="https://via.placeholder.com/300x200" className="card-img-top" alt="Category 3" />
    //         <div className="card-body">
    //           <h5 className="card-title">Category 3</h5>
    //           <p className="card-text">Description of category 3.</p>
    //           <a href="#" className="btn btn-primary">Explore</a>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div style={styles.container}>
    <h1 style={styles.heading}>About Us</h1>
    <div style={styles.content}>
      <p style={styles.paragraph}>
        Sri Bannari Agro Traders is committed to providing high-quality agricultural products to customers
        . With years of experience in the industry, we have established ourselves as a
        trusted source for fresh produce and agricultural supplies.
      </p>
      <div style={styles.section}>
        <h2 style={styles.subHeading}>Our Mission</h2>
        <ul style={styles.list}>
          <li>
            <p style={styles.paragraph}>
              <strong>Promote Sustainability:</strong> We are dedicated to promoting sustainable
              farming practices to protect the environment and ensure the long-term viability of
              agriculture.
            </p>
          </li>
          <li>
            <p style={styles.paragraph}>
              <strong>Support Local Growers:</strong> We believe in supporting local farmers and
              growers by providing them with fair opportunities to sell their produce and
              contributing to the growth of rural communities.
            </p>
          </li>
          <li>
            <p style={styles.paragraph}>
              <strong>Ensure Quality:</strong> We work closely with our suppliers to ensure that
              our products meet the highest standards of quality and freshness, providing our
              customers with the best possible agricultural goods.
            </p>
          </li>
          <li>
            <p style={styles.paragraph}>
              <strong>Customer Satisfaction:</strong> We prioritize customer satisfaction by
              offering excellent service, timely delivery, and a seamless shopping experience on
              our platform.
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
);
};

const styles = {
container: {
  maxWidth: '800px',
  margin: '0 auto',
  padding: '20px',
  backgroundColor: '#f9f9f9',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
},
heading: {
  fontSize: '2.5rem',
  fontWeight: 'bold',
  marginBottom: '20px',
  textAlign: 'center',
  color: '#333',
  textTransform: 'uppercase',
},
content: {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
},
section: {
  marginBottom: '30px',
},
subHeading: {
  fontSize: '1.8rem',
  fontWeight: 'bold',
  marginBottom: '15px',
  color: '#555',
},
list: {
  listStyleType: 'none',
  padding: 0,
},
paragraph: {
  fontSize: '1.1rem',
  lineHeight: '1.6',
  marginBottom: '15px',
  color: '#555',
},
};

export default ShopByCategories;

