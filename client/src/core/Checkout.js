import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { createOrder } from './apiCore';
import { emptyCart } from './cartHelpers';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';

const Checkout = ({ products, setRun = (f) => f, run = undefined }) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: '',
    address: '',
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const handleAddress = (event) => {
    setData({ ...data, address: event.target.value });
  };

  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const handleCashOnDelivery = () => {
    // Check if the address field is empty
    if (data.address.trim() === '') {
      setData({ ...data, error: 'Please fill in the delivery address.' });
      return;
    }

    setData({ loading: true });
    // For Cash on Delivery, directly create the order
    const createOrderData = {
      products: products,
      amount: getTotal(products),
      address: data.address,
      paymentMethod: 'Cash on Delivery',
    };

    createOrder(userId, token, createOrderData)
      .then((response) => {
        emptyCart(() => {
          setRun(!run); // run useEffect in parent Cart
          console.log('Order created successfully for Cash on Delivery');
          setData({
            loading: false,
            success: true,
          });
        });
      })
      .catch((error) => {
        console.log(error);
        setData({ loading: false });
      });
  };

  const showCheckout = () => {
    if (data.success) {
      return (
        <div>
          <div className='alert alert-info'>
            Thanks! Your order was successfully placed!
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className='gorm-group mb-3'>
          
            <label className='text-muted'>Delivery address:</label>
            <textarea
              onChange={handleAddress}
              className='form-control'
              value={data.address}
              placeholder='Type your delivery address here...'
              required
            />
          </div>
          For customer convinience we have enable Cash On Delivery Option
          <Button onClick={handleCashOnDelivery} variant='contained' color='primary'>
            Confrim Order
          </Button>
          
          {data.error && (
            <div className='alert alert-danger mt-2'>
              {data.error}
            </div>
          )}
        </div>
      );
    }
  };

  const showLoading = (loading) =>
    loading && <h2 className='text-danger'>Loading...</h2>;

  return (
    <div>
      <h2>Total: ₹{getTotal()}</h2>
      {showLoading(data.loading)}
      {showCheckout()}
    </div>
  );
};

export default Checkout;
