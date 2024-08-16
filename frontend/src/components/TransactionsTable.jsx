import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../src/Transactionstable.css';

const TransactionsTable = ({ selectedMonth, searchQuery, page, perPage, setPage }) => {
  const [transactions, setTransactions] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const params = {
          page,
          perPage,
        };

        if (selectedMonth) params.month = selectedMonth;
        if (searchQuery) params.search = searchQuery;

        const response = await axios.get('http://localhost:1234/api/allorders', { params });

        setTransactions(response.data.orders);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, [selectedMonth, searchQuery, page, perPage]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="transactions-table-container">
      <table className="transactions-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Date of Sale</th>
            <th>Category</th>
            <th>Sold</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction._id}>
              <td><img src={transaction.image} alt={transaction.title} className="transaction-image" /></td>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td>{transaction.price.toFixed(2)} Rs</td>
              <td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
              <td>{transaction.category}</td>
              <td>{transaction.sold ? 'Sold' : 'Available'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-controls">
        <button onClick={handlePreviousPage} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionsTable;
