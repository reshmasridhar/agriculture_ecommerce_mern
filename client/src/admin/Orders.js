import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { listOrders, getStatusValues, updateOrderStatus } from './apiAdmin';
import moment from 'moment';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [statusValues, setStatusValues] = useState([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const { user, token } = isAuthenticated();

  const loadOrders = () => {
    listOrders(user._id, token).then((data) => {
      if (!data) {
        console.log('No orders data found');
        return;
      }
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };

  const loadStatusValues = () => {
    getStatusValues(user._id, token).then((data) => {
      if (!data) {
        console.log('No status values data found');
        return;
      }
      if (data.error) {
        console.log(data.error);
      } else {
        setStatusValues(data);
      }
    });
  };

  useEffect(() => {
    loadOrders();
    loadStatusValues();
  }, []);

  const handleFromDateChange = (e) => {
    setFromDate(e.target.value);
  };

  const handleToDateChange = (e) => {
    setToDate(e.target.value);
  };

  const filterOrdersByDateRange = () => {
    if (!fromDate || !toDate) return orders;

    if (moment(fromDate).isSame(toDate, 'day')) {
      return orders.filter(order => moment(order.createdAt).isSame(moment(fromDate), 'day'));
    }

    const filteredOrders = orders.filter(order => moment(order.createdAt).isBetween(moment(fromDate), moment(toDate), undefined, '[]'));
    return filteredOrders;
  };

  const handleStatusChange = (e, orderId) => {
    updateOrderStatus(user._id, token, orderId, e.target.value).then((data) => {
      if (data.error) {
        console.log('Status update failed');
      } else {
        loadOrders();
      }
    });
  };

  const showStatus = (o) => (
    <div className='form-group'>
      <h3 className='mark mb-4'>Status: {o.status}</h3>
      <select
        className='form-control'
        onChange={(e) => handleStatusChange(e, o._id)}
      >
        <option>Update Status</option>
        {statusValues.map((status, index) => (
          <option key={index} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );
  const getTotalOrders = () => {
    return filterOrdersByDateRange().length;
  };

  return (
    <Layout
      title='Orders'
      description={`Hey ${user.name}, you can manage all the orders here`}
    >
      <div className='row'>
        <div className='col-md-8 offset-md-2'>
          <div className="form-group">
            <label htmlFor="fromDate">From Date:</label>
            <input
              type="date"
              id="fromDate"
              className="form-control"
              value={fromDate}
              onChange={handleFromDateChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="toDate">To Date:</label>
            <input
              type="date"
              id="toDate"
              className="form-control"
              value={toDate}
              onChange={handleToDateChange}
            />
          </div>
          <h1 className='text-danger display-2'>Total orders: {getTotalOrders()}</h1>
          {/* Show orders */}
          {filterOrdersByDateRange().map((o, oIndex) => (
            <div
              className='mt-5'
              key={oIndex}
              style={{ borderBottom: '5px solid indigo' }}
            >
              <h2 className='mb-5'>
                <span className='bg-primary'>Order ID: {o._id}</span>
              </h2>

              <ul className='list-group mb-2'>
                <li className='list-group-item'>{showStatus(o)}</li>
                <li className='list-group-item'>
                  Transaction ID: {o.transaction_id}
                </li>
                <li className='list-group-item'>Amount:₹ {o.amount}</li>
                <li className='list-group-item'>Ordered by: {o.user.name}</li>
                <li className='list-group-item'>
                  Ordered on: {moment(o.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                </li>
                <li className='list-group-item'>
                  Delivery address: {o.address}
                </li>
              </ul>

              <h3 className='mt-4 mb-4 font-italic'>
                Total products in the order: {o.products.length}
              </h3>

              {o.products.map((p, pIndex) => (
                <div
                  className='mb-4'
                  key={pIndex}
                  style={{ padding: '20px', border: '1px solid indigo' }}
                >
                  {showInput('Product name', p.name)}
                  {showInput('Product price', p.price)}
                  {showInput('Product total', p.count)}
                  {showInput('Product Id', p._id)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

const showInput = (key, value) => (
  <div className='input-group mb-2 mr-sm-2'>
    <div className='input-group-prepend'>
      <div className='input-group-text'>{key}</div>
    </div>
    <input type='text' value={value} className='form-control' readOnly />
  </div>
);

export default Orders;
