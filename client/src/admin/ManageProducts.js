import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { getProducts, deleteProduct } from './apiAdmin';
import moment from 'moment';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [outOfStockProducts, setOutOfStockProducts] = useState([]);
  const [expiredProducts, setExpiredProducts] = useState([]); // State to hold expired products
  const { user, token } = isAuthenticated();

  const loadProducts = () => {
    getProducts().then((data) => {
      if (!data || data.error) { // Added null check for data
        console.log(data ? data.error : 'No data returned');
      } else {
        setProducts(data);
        const outOfStock = data.filter((product) => product.quantity <= 0); // Filter out of stock products
        setOutOfStockProducts(outOfStock);

        // Filter expired products
        const today = moment().startOf('day'); // Get current date without time
        const expired = data.filter((product) => moment(product.expiry).isBefore(today));
        setExpiredProducts(expired);
      }
    });
  };
  

  const destroy = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (!data || data.error) { // Added null check for data
        console.log(data ? data.error : 'No data returned');
      } else {
        loadProducts();
      }
    });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Layout
      title='Manage Products'
      description='update products'
      className='container-fluid'
    >
       <div className='row'>
        <div className='col-12'>
          <h2 className='text-center'>Total {products.length} products</h2>
          <hr />
          <h3 className='text-center'>Expired Products</h3>
          <ul className='list-group'>
            {expiredProducts.map((product, index) => (
              <li
                key={index}
                className='list-group-item d-flex justify-content-between align-items-center'
              >
                <strong>{product.name}</strong>
                <div>
                  <Link to={`/admin/product/update/${product._id}`}>
                    <span className='badge badge-warning mr-2'>Update</span>
                  </Link>
                  <span
                    onClick={() => destroy(product._id)}
                    className='badge badge-danger cursor-pointer'
                  >
                    Delete
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <hr />
          <h3 className='text-center'>Out of Stock Products</h3>
          <ul className='list-group'>
            {outOfStockProducts.map((product, index) => (
              <li
                key={index}
                className='list-group-item d-flex justify-content-between align-items-center'
              >
                <strong>{product.name}</strong>
                <div>
                  <Link to={`/admin/product/update/${product._id}`}>
                    <span className='badge badge-warning mr-2'>Update</span>
                  </Link>
                  <span
                    onClick={() => destroy(product._id)}
                    className='badge badge-danger cursor-pointer'
                  >
                    Delete
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <hr />
          <h3 className='text-center'>All Products</h3>
          <ul className='list-group'>
            {products.map((p, i) => (
              <li
                key={i}
                className='list-group-item d-flex justify-content-between align-items-center'
              >
                <strong>{p.name}</strong>
                <Link to={`/admin/product/update/${p._id}`}>
                  <span className='badge badge-warning badge-pill'>Update</span>
                </Link>
                <Link>
                  <span
                    onClick={() => destroy(p._id)}
                    className='badge badge-danger badge-pill'
                  >
                    Delete
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default ManageProducts;
