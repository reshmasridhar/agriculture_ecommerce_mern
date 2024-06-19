import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { listOrders, getStatusValues, updateOrderStatus } from '../admin/apiAdmin';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Chart from 'chart.js/auto';
const AdminDashboard = () => {
  const { user, token } = isAuthenticated();
  const {
    user: { _id, name, email, role },
  } = isAuthenticated();

  const [orders, setOrders] = useState([]);
  const [statusValues, setStatusValues] = useState([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [productsSoldData, setProductsSoldData] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    loadOrders();
    loadStatusValues();
  }, []);
  
  useEffect(() => {
    const filteredProducts = filterProductsByDateRange();
    generateProductsSoldData(filteredProducts);
  }, [fromDate, toDate]);

  const loadOrders = () => {
    listOrders(_id, token).then((data) => {
      if (data &&data.error) {
        console.log(data.error);
      } else {
        setOrders(data|| []);
      }
    }).catch(error => {
      console.log("Error loading orders:", error);
    });
  };

  const loadStatusValues = () => {
    getStatusValues(_id, token).then((data) => {
      if (data &&data.error) {
        console.log(data.error);
      } else {
        setStatusValues(data|| []);
      }
    }).catch(error => {
      console.log("Error loading status values:", error);
    });
  };

  const handleFromDateChange = (e) => {
    setFromDate(e.target.value);
  };

  const handleToDateChange = (e) => {
    setToDate(e.target.value);
  };

  const filterProductsByDateRange = () => {
    if (!fromDate || !toDate) return [];

    const products = [];
    orders.forEach(order => {
      if (moment(order.createdAt).isBetween(moment(fromDate), moment(toDate), undefined, '[]')) {
        order.products.forEach(product => {
          products.push({
            name: product.name,
            orderedDate: moment(order.createdAt).format('MMMM Do YYYY')
          });
        });
      }
    });
    return products;
  };
  const generateProductsSoldData = (filteredProducts) => {
    const productsSoldMap = {};
    filteredProducts.forEach(product => {
      const date = product.orderedDate;
      if (productsSoldMap[date]) {
        productsSoldMap[date].push(product.name);
      } else {
        productsSoldMap[date] = [product.name];
      }
    });

    const dates = Object.keys(productsSoldMap);
    const data = Object.values(productsSoldMap);


    setProductsSoldData(data);
    setSelectedProducts(dates);
  };
  useEffect(() => {
    const ctx = document.getElementById('productsSoldChart');
    let chartInstance = Chart.getChart(ctx);
  
    if (chartInstance) {
      // If the chart already exists, destroy it
      chartInstance.destroy();
    }
  
    // Render the new chart
    chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: selectedProducts,
        datasets: [{
          label: 'Products Sold',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          data: productsSoldData.map(products => products.length),
        }]
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Date'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Number of Products Sold'
            },
            beginAtZero: true
          }
        }
      }
    });
  
    // Cleanup function to destroy the chart on unmount
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [productsSoldData, selectedProducts]);
  
  useEffect(() => {
    selectedProducts.forEach(date => {
      const products = productsSoldData[selectedProducts.indexOf(date)];
      const ctx = document.getElementById(`productsSoldPieChart-${date}`);
      const existingChart = Chart.getChart(ctx);
      
      // Destroy existing chart instance if it exists
      if (existingChart) {
        existingChart.destroy();
      }
  
      // Create new chart instance
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: products,
          datasets: [{
            label: 'Products Sold',
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,
            data: products.map(product => orders.filter(order => moment(order.createdAt).format('MMMM Do YYYY') === date && order.products.map(product => product.name).includes(product)).length)
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: `Products Sold on ${date}`
            }
          },
          layout: {
            padding: {
              left: 10,
              right: 10,
              top: 10,
              bottom: 10
            }
          },
          elements: {
            arc: {
              // Adjust radius here
              radius: '50%'
            }
          }
        }
      });
    });
  }, [selectedProducts, productsSoldData, orders]);
  
  const calculateTotalTurnover = () => {
    // Calculate total turnover between the date range
    let totalTurnover = 0;
    orders.forEach(order => {
      if (moment(order.createdAt).isBetween(moment(fromDate), moment(toDate), undefined, '[]')) {
        totalTurnover += order.amount;
      }
    });
    return totalTurnover.toFixed(2);
  };

  const calculateTopProducts = () => {
    // Calculate top 5 products sold in high quantity
    const productsSold = {};
    orders.forEach(order => {
      if (moment(order.createdAt).isBetween(moment(fromDate), moment(toDate), undefined, '[]')) {
        order.products.forEach(product => {
          if (productsSold[product.name]) {
            productsSold[product.name] += product.quantity;
          } else {
            productsSold[product.name] = product.quantity;
          }
        });
      }
    });

    const sortedProducts = Object.entries(productsSold).sort((a, b) => b[1] - a[1]);
    return sortedProducts.slice(0, 5);
  };
  
  


  return (
    <Layout
      title='Dashboard'
      description={`Welcome back, ${name}!`}
      className='container-fluid'
    >
      <div className='row'>
        <div className='col-md-3'>
          {/* Admin links */}
          <div className='card'>
        <h4 className='card-header'>Admin Links</h4>
        <ul className='list-group'>
          <li className='list-group-item'>
            <Link className='nav-link' to='/admin/categories'>
              Category List
            </Link>
          </li>
          <li className='list-group-item'>
            <Link className='nav-link' to='/create/category'>
              Add Category
            </Link>
          </li>
          <li className='list-group-item'>
            <Link className='nav-link' to='/create/product'>
              Add Product
            </Link>
          </li>
          <li className='list-group-item'>
            <Link className='nav-link' to='/admin/orders'>
              View Orders
            </Link>
          </li>
          <li className='list-group-item'>
            <Link className='nav-link' to='/admin/products'>
              Manage Products
            </Link>
          </li>
        </ul>
      </div>
        </div>
        <div className='col-md-9'>
          {/* User information */}
          <div className='card mb-5'>
            {/* User info content */}
            <h3 className='card-header'>User information</h3>
        <ul className='list-group'>
          <li className='list-group-item'>{name}</li>
          <li className='list-group-item'>{email}</li>
          <li className='list-group-item'>
            {role === 1 ? 'Admin' : 'Registered user'}
          </li>
        </ul>
          </div>
          <div className='card mb-5'>
            <h4 className='card-header'>Products Sold Between Date Range</h4>
            <div className='card-body'>
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
              <div className="mt-3">
                <ul className="list-group">
                  {filterProductsByDateRange().map((product, index) => (
                    <li key={index} className="list-group-item">
                      <span className="font-weight-bold">Product Name:</span> {product.name}<br />
                      <span className="font-weight-bold">Ordered Date:</span> {product.orderedDate}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-3">
                <canvas id="productsSoldChart"></canvas>
              </div>
              {/* <div className="mt-3">
                <h5>Products Sold:</h5>
                <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                  <canvas id="productsSoldPieChart"></canvas>
                </div>
              </div> */}

              <div className="mt-3">
                <h5>Products Sold:</h5>
                {selectedProducts.map((date, index) => (
                  <div key={index}>
                    <h6>{date}</h6>
                    <div style={{ width: '500px', height: '500px' }}>
  <canvas id={`productsSoldPieChart-${date}`}></canvas>
</div>
                  </div>
                ))}
              </div>
              <div className="mt-3">
                <h5>Overall Report:</h5>
                <p>Total Turnover:₹ {calculateTotalTurnover()}</p>
                <p>Top 5 Products Sold:</p>
                <ul>
                  {calculateTopProducts().map((product, index) => (
                    <li key={index}>
                      {product[0]}  {product[1]}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-3">
                <h5>Products Sold:</h5>
                <ul>
                  {selectedProducts.map((date, index) => (
                    <li key={index}>
                      <h6>{date}</h6>
                      <ul>
                        {orders
                          .filter(order => moment(order.createdAt).format('MMMM Do YYYY') === date)
                          .map((order, index) => (
                            <li key={index}>
                              <p>{order.products.map(product => product.name).join(', ')}</p>
                            </li>
                          ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
