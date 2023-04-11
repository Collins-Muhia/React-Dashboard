import React, { useState, useEffect } from "react";
import DashboardHeader from "../../components/DashboardHeader";

import { calculateRange, sliceData } from "../../utils/table-pagination";

import "../Orders2/styles.css";

function Orders2() {
  const [search, setSearch] = useState("");
  const [orders2, setOrders2] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState([]);

  useEffect(() => {
    fetch("http://10.153.1.85:8081/api/directors")
      .then((response) => response.json())
      .then((json) => {
        setOrders2(json.content);
        setPagination(calculateRange(json.totalPages));
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  // Search
  const handleSearch = (event) => {
    const value = event.target.value;
    setSearch(value);
    if (value) {
      const searchResults = orders2.filter(
        (order2) =>
          order2.pinNo.toLowerCase().includes(value.toLowerCase()) ||
          order2.taxPayerName.toLowerCase().includes(value.toLowerCase()) ||
          order2.associatedEntityPin.toLowerCase().includes(value.toLowerCase()) ||
          order2.associatedEntityType.toLowerCase().includes(value.toLowerCase())
      );
      setOrders2(searchResults);
      setPage(1);
      setPagination(calculateRange(searchResults.length));
    } else {
      setPage(1);
      setOrders2(sliceData(orders2, 1, 15));
      setPagination(calculateRange(orders2.length, 15));
    }
  };

  // Change Page
  const handleChangePage = (newPage) => {
    setPage(newPage);
    setOrders2(sliceData(orders2, newPage, 15));
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      setOrders2(sliceData(orders2, page - 1, 15));
    }
  };
  
  const handleNextPage = () => {
    if (page < pagination.length) {
      setPage(page + 1);
      setOrders2(sliceData(orders2, page + 1, 15));
    }
  };
  

  return (
    <div className="dashboard-content">
      <DashboardHeader btnText="refresh" btnText1="log out" />

      <div className="dashboard-content-container">
        <div className="dashboard-content-header">
          <h2>DIRECTORS</h2>
          <div className="dashboard-content-search">
            <input
              type="text"
              value={search}
              placeholder="Search..."
              className="dashboard-content-input"
              onChange={handleSearch}
            />
          </div>
        </div>

        {orders2.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>NO</th>
                <th>TAXPAYER PIN</th>
                <th>TAXPAYER NAME </th>
                <th>ASSOCIATED ENTITY PIN</th>
                <th>ASSOCIATED ENTITY TYPE</th>
              </tr>
            </thead>
            <tbody>
              {orders2.map((order2) => (
                <tr key={order2.id}>
                  <td>{order2.id}</td>
                  <td>{order2.pinNo}</td>
                  <td>{order2.taxPayerName}</td>
                  <td>{order2.associatedEntityPin}</td>
                  <td>{order2.associatedEntityType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="dashboard-content-footer">
            <span className="empty-table">No data</span>
          </div>
        )}

{orders2.length > 0 && (
  <div className="dashboard-content-footer">
    <span className="pagination-btn" onClick={handlePrevPage}>Previous</span>
    {pagination.map((pageNumber) => (
      <span
        key={pageNumber}
        className={
          pageNumber === page ? "active-pagination" : "pagination"
        }
        onClick={() => handleChangePage(pageNumber)}
      >
        {pageNumber}
      </span>
    ))}
    <span className="pagination-btn" onClick={handleNextPage}>Next</span>
  </div>
)}

      </div>
    </div>
  );
}

export default Orders2;