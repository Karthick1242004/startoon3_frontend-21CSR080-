import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import Go from './Graph.module.css';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

function Graph() {
  const [data, setData] = useState({ labels: [], values: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3300/graph/monthly-counts');
        const result = await response.json();
        const labels = result.map(item => item.month);
        const values = result.map(item => item.count);
        setData({ labels, values });
      } catch (error) {
        console.error('Error fetching graph data:', error);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Counts per Month',
        data: data.values,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw}`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Months',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Counts',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className={Go.container}>
      <h1 className={Go.title}>Monthly Counts</h1>
      <div className={Go.graph}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}

export default Graph;
