import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { AgGridReact } from 'ag-grid-react';
import { fetchSalesComparison } from '../utils/api';
import DatePicker from './DatePicker';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js';

// Register components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

const Dashboard2 = () => {
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');
  const [data, setData] = useState({ products: [], categories: [] });

  useEffect(() => {
    if (date1 && date2) {
      fetchSalesComparison(date1, date2).then(setData);
    }
  }, [date1, date2]);

  const productData = {
    labels: data.products.map(p => p.name),
    datasets: [
      {
        label: 'Date 1 Sales',
        data: data.products.map(p => p.date1Sales),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      },
      {
        label: 'Date 2 Sales',
        data: data.products.map(p => p.date2Sales),
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1
      }
    ]
  };

  const categoryData = {
    labels: data.categories.map(c => c.category),
    datasets: [
      {
        label: 'Date 1 Sales',
        data: data.categories.map(c => c.date1Sales),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      },
      {
        label: 'Date 2 Sales',
        data: data.categories.map(c => c.date2Sales),
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1
      }
    ]
  };

  const columns = [
    { headerName: 'Product Name', field: 'name' },
    { headerName: 'Category', field: 'category' },
    { headerName: 'Date 1 Sales Amount', field: 'date1Sales' },
    { headerName: 'Date 2 Sales Amount', field: 'date2Sales' },
    { headerName: 'Difference', field: 'difference', valueGetter: params => params.data.date2Sales - params.data.date1Sales }
  ];

  return (
    <div>
      <h1>Sales Comparison Between Two Dates</h1>
      <DatePicker label="Date 1" selectedDate={date1} onDateChange={setDate1} />
      <DatePicker label="Date 2" selectedDate={date2} onDateChange={setDate2} />
      <div>
        <Bar data={productData} />
      </div>
      <div>
        <Bar data={categoryData} />
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

export default Dashboard2;
