import React from 'react';
import { Line } from 'react-chartjs-2';
import { Container } from 'react-bootstrap';
import { Chart, registerables } from 'chart.js';

// Register the necessary chart.js components
Chart.register(...registerables);

const TransactionGraph = ({ transactions }) => {
  const data = {
    labels: transactions.map(transaction => transaction.date),
    datasets: [
      {
        label: 'Transaction Amount',
        data: transactions.map(transaction => transaction.amount),
        fill: false,
        backgroundColor: 'blue',
        borderColor: 'blue',
      },
    ],
  };

  return (
    <Container className="my-5">
      <h2 className='text-center mb-3 text-info'>Transaction Graph</h2>
      <Line data={data} />
    </Container>
  );
};

export default TransactionGraph;
