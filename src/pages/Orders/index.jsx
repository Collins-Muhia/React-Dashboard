import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "../../components/DashboardHeader";

import { calculateRange, sliceData } from "../../utils/table-pagination";

import "../Orders/styles.css";

function Orders() {
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://10.153.1.85:8081/api/falseImports")
      .then((response) => response.json())
      .then((json) => {
        setOrders(json.content);
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
      const searchResults = orders.filter(
        (order) =>
          order.pinNo.toLowerCase().includes(value.toLowerCase()) ||
          order.taxPayerName.toLowerCase().includes(value.toLowerCase()) ||
          order.associatedEntityPin.toLowerCase().includes(value.toLowerCase()) ||
          order.associatedEntityType.toLowerCase().includes(value.toLowerCase())
      );
      setOrders(searchResults);
      setPage(1);
      setPagination(calculateRange(searchResults.length));
    } else {
      setPage(1);
      setOrders(sliceData(orders, 1, 15));
      setPagination(calculateRange(orders.length, 15));
    }
  };

  // Change Page
  const handleChangePage = (newPage) => {
    setPage(newPage);
    setOrders(sliceData(orders, newPage, 15));
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      setOrders(sliceData(orders, page - 1, 15));
    }
  };
  
  const handleNextPage = () => {
    if (page < pagination.length) {
      setPage(page + 1);
      setOrders(sliceData(orders, page + 1, 15));
    }
  };
  
  const handleLogout = () => {
    navigate("/loginforms");
  }

  return (
    <div className="dashboard-content">
      <DashboardHeader btnText="refresh" btnText1="log out" onBtnText1Click={handleLogout} />

      <div className="dashboard-content-container">
        <div className="dashboard-content-header">
          <h2>FALSE IMPORTS</h2>
          <div className="dashboard-content-search">
            <input
              type="text1"
              value={search}
              placeholder="Search..."
              className="dashboard-content-input"
              onChange={handleSearch}
            />
          </div>
        </div>
        {orders.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>N0</th>
                <th>TAXPAYER PIN</th>
                <th>TAXPAYER NAME </th>
                <th>SUPPLIERS NAME</th>
                {/* <th>suppliersPin</th> */}
                <th>AMOUNT</th>
                {/* <th>purchTotal</th> */}
                {/* <th>invoiceNo</th> */}
                {/* <th>invoiceDate</th> */}
                {/* <th>custEntryNo</th> */}
                <th>LOOKUPCODE</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.pinNo}</td>
                  <td>{order.taxpayerName}</td>
                  <td>{order.suppliersName}</td>
                  {/* <td>{order.suppliersPin}</td> */}
                  <td>{order.amntBeforeTax}</td>
                  {/* <td>{order.purchTotal}</td> */}
                  {/* <td>{order.invoiceNo}</td> */}
                  {/* <td>{order.invoiceDate}</td> */}
                  {/* <td>{order.custEntryNo}</td> */}
                  <td>{order.lookupCode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="dashboard-content-footer">
            <span className="empty-table">No data</span>
          </div>
        )}

{orders.length > 0 && (
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

export default Orders;






// import { useEffect, useState } from "react"
// import './style.css'


// function Employee() {
//   const [employees, setEmployees] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [filteredData, setFilteredData] = useState("")
  
//   useEffect(() => {
//     setLoading(true)
//     fetch("http://10.153.1.85:8081/api/directors")
//       .then(response => response.json())
//       .then(json => setEmployees(json.content))
//       .finally(() => {
//         setLoading(false)
//       })
//   }, [])

//   return (
//     <div>
//       <div className="search">
//           <span className="searchLabel">Search: </span>
//           <input
//             className="inputlabel"
//             type="text"
//             value={filteredData}
//             onChange={(e) => setFilteredData(e.target.value)}
//           />
//       </div>
//       <div className="App">
//         {loading ? (
//           <div>Loading...</div>
          
//         ) : (
//           <>
//             <h1>FALSE IMPORTS</h1>
//             <table border={1}>
//                 <tr>               
//                   <th>No</th>
//                   <th>KRA Pin</th>
//                   <th>Taxpayer Name</th>  
//                   <th>associatedEntityPin</th>                                
//                   <th>associatedEntityType</th>
//                 </tr>
//               {employees.map((employee) => (
//                  <tr key={employee.id}>
//                   <td>{employee.id}</td>
//                   <td>{employee.pinNo}</td>
//                   <td>{employee.taxPayerName}</td>
//                   <td>{employee.associatedEntityPin}</td>                                    
//                   <td>{employee.associatedEntityType}</td>                  
//                  </tr>
//               ))}
//             </table>
            
//           </>
//         )}
//       </div>
//     </div>
//   )

// }

// export default Employee