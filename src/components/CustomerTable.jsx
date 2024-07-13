import React, { useState, useEffect } from "react";
import { getCustomers, getTransactions } from "../services/api";
import { Table, Form, Pagination } from "react-bootstrap";
import './CustomerTable.css'

const CustomerTable = ({ onSelectCustomer }) => {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customersResponse = await getCustomers();
        const transactionsResponse = await getTransactions();
        setCustomers(customersResponse);
        setTransactions(transactionsResponse);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };
    fetchData();
  }, []);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(filter.toLowerCase())
  );

  const getTransactionAmount = (customerId) =>
    transactions
      .filter((transaction) => transaction.customer_id === customerId)
      .reduce((sum, transaction) => sum + transaction.amount, 0);

  return (
    <div className="container text-center">
      <h1 className="text-info mb-4 text-center">customer-transaction-app</h1>
      <Form.Group className="mb-3 fliterBtn">
        <input
          type="text"
          className="form-control"
          placeholder="Filter by name"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </Form.Group>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="text-info">Name</th>
            <th className="text-info">Total Transaction Amount</th>
          </tr>
        </thead>
        <tbody >
          {filteredCustomers
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((customer) => (
              <tr 
                key={customer.id}
                onClick={() => onSelectCustomer(customer)}
                style={{ cursor: "pointer" }}
              >
                <td className="text-info">{customer.name}</td>
                <td className="text-info">{getTransactionAmount(customer.id)}</td>
              </tr>
            ))}
        </tbody>
      </Table>

    </div>
  );
};

export default CustomerTable;
