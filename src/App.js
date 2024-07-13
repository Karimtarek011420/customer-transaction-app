import React, { useState } from 'react';
import CustomerTable from './components/CustomerTable';
import TransactionGraph from './components/TransactionGraph';
import { getTransactions } from './services/api';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [transactions, setTransactions] = useState([]);

  const handleSelectCustomer = async customer => {
    setSelectedCustomer(customer);
    try {
      const transactionsResponse = await getTransactions();
      setTransactions(
        transactionsResponse.filter(
          transaction => transaction.customer_id === customer.id
        )
      );
    } catch (error) {
      console.error('Failed to fetch transactions', error);
    }
  };

  return (
    <div className="container mt-5">
      <CustomerTable onSelectCustomer={handleSelectCustomer} />
      {selectedCustomer && (
        <TransactionGraph transactions={transactions} />
      )}
    </div>
  );
};

export default App;
