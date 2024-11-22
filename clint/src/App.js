import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
function App() {
  const initialData = [
    { date: "2024-11-20", time: "10:00", price: "15.99" },
    { date: "2024-11-21", time: "12:30", price: "20.50" },
    { date: "2024-11-22", time: "09:45", price: "30.00" },
    { date: "2024-11-22", time: "14:15", price: "25.00" },
    { date: "2024-11-23", time: "16:00", price: "18.75" },
  ];

  const [data, setData] = useState(initialData);
  const [filters, setFilters] = useState({ date: "", time: "", price: "" });

  // Handle filter change
  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
  })
   
  };

  // Apply filters to the data
  const filteredData = data.filter((row) => {
    return (
      (filters.date === "" || row.date.includes(filters.date)) &&
      (filters.time === "" || row.time.includes(filters.time)) &&
      (filters.price === "" || row.price.includes(filters.price))
    );
  });
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
    <h2>Filterable Table with Individual Column Filters</h2>

    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "20px",
        border: "1px solid #ddd",
      }}
    >
      <thead>
        <tr style={{ backgroundColor: "#f4f4f4", textAlign: "left" }}>
          <th style={{ padding: "8px" }}>
            Date
            <br />
            <input
              type="date"
              name="date"
              value={filters.date}
              onChange={handleFilterChange}
              style={{
                marginTop: "5px",
                padding: "4px",
                width: "95%",
                boxSizing: "border-box",
              }}
            />
          </th>
          <th style={{ padding: "8px" }}>
            Time
            <br />
            <input
              type="time"
              name="time"
              value={filters.time}
              onChange={handleFilterChange}
              style={{
                marginTop: "5px",
                padding: "4px",
                width: "95%",
                boxSizing: "border-box",
              }}
            />
          </th>
          <th style={{ padding: "8px" }}>
            Price
            <br />
            <input
              type="text"
              name="price"
              placeholder="Filter Price"
              value={filters.price}
              onChange={handleFilterChange}
              style={{
                marginTop: "5px",
                padding: "4px",
                width: "95%",
                boxSizing: "border-box",
              }}
            />
          </th>
        </tr>
      </thead>
      <tbody>
        {filteredData.length > 0 ? (
          filteredData.map((row, index) => (
            <tr key={index}>
              <td style={{ padding: "8px" }}>{row.date}</td>
              <td style={{ padding: "8px" }}>{row.time}</td>
              <td style={{ padding: "8px" }}>₹{parseFloat(row.price).toFixed(2)}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3" style={{ padding: "8px", textAlign: "center" }}>
              No matching data
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
  );
}

export default App;
