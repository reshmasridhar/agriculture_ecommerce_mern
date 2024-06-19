import React from 'react';

const AboutUs = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>About Agro Traders</h1>
      <p style={styles.paragraph}>
        Agro Traders is committed to providing high-quality agricultural products to customers
        worldwide. With years of experience in the industry, we have established ourselves as a
        trusted source for fresh produce and agricultural supplies.
      </p>
      <p style={styles.paragraph}>
        Our mission is to bridge the gap between farmers and consumers by offering a convenient
        platform for buying and selling agricultural goods. We strive to promote sustainable
        farming practices and support local growers.
      </p>
      <p style={styles.paragraph}>
        At Agro Traders, we believe in transparency, integrity, and customer satisfaction. We work
        closely with our suppliers to ensure that our products meet the highest standards of
        quality and freshness.
      </p>
      <p style={styles.paragraph}>
        Whether you are a small-scale farmer or a large distributor, Agro Traders is here to meet
        your agricultural needs. Join us in our mission to create a more sustainable and
        prosperous agricultural industry for generations to come.
      </p>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
  },
  heading: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center',
  },
  paragraph: {
    fontSize: '1.1rem',
    lineHeight: '1.6',
    marginBottom: '20px',
  },
};

export default AboutUs;
