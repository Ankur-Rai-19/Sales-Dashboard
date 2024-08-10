import React, { useState, useEffect } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import { AgGridReact } from 'ag-grid-react';
import { fetchTodaySales } from '../utils/api';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

// Register components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

const Dashboard1 = () => {
  const [data, setData] = useState({ products: [], categories: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTodaySales()
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const productData = {
    labels: data.products.map(p => p.name),
    datasets: [{
      label: 'Sales Amount',
      data: data.products.map(p => p.salesAmount),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  };

  const categoryData = {
    labels: data.categories.map(c => c.category),
    datasets: [{
      data: data.categories.map(c => c.salesAmount),
      backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)']
    }]
  };

  const columns = [
    { headerName: 'Product Name', field: 'name' },
    { headerName: 'Category', field: 'category' },
    { headerName: 'Quantity Sold', field: 'quantitySold' },
    { headerName: 'Sales Amount', field: 'salesAmount' }
  ];

  return (
    <div>
      <h1>Today's Sales</h1>
      <div>
        <Line data={productData} />
      </div>
      <div>
        <Pie data={categoryData} />
      </div>
      <div style={{ height: 400, width: '100%' }}>
        <AgGridReact
          rowData={data.products}
          columnDefs={columns}
          pagination={true}
          paginationPageSize={10}
        />
      </div>
    </div>
  );
};

export default Dashboard1;
