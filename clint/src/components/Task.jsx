import React, { useState } from "react";

const Task = () => {
    const initialData = [
        { date: "2024-11-20", time: "10:00", price: "15.99" },
        { date: "2024-11-21", time: "12:30", price: "20.50" },
        { date: "2024-11-22", time: "09:45", price: "30.00" },
        { date: "2024-11-22", time: "14:15", price: "25.00" },
        { date: "2024-11-23", time: "16:00", price: "18.75" },
      ];
    
      const [data] = useState(initialData);
      const [filters, setFilters] = useState({
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        minPrice: "",
        maxPrice: "",
      });
    
      // Handle filter change
      const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
      };
    
      // Apply filters to the data
      const filteredData = data.filter((row) => {
        const isDateInRange =
          (!filters.startDate || row.date >= filters.startDate) &&
          (!filters.endDate || row.date <= filters.endDate);
        const isTimeInRange =
          (!filters.startTime || row.time >= filters.startTime) &&
          (!filters.endTime || row.time <= filters.endTime);
        const isPriceInRange =
          (!filters.minPrice || parseFloat(row.price) >= parseFloat(filters.minPrice)) &&
          (!filters.maxPrice || parseFloat(row.price) <= parseFloat(filters.maxPrice));
    
        return isDateInRange && isTimeInRange && isPriceInRange;
      });
    
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
    <h2>Filterable Table with Range Filters</h2>

    {/* Filters */}
    <div style={{ marginBottom: "20px", display: "grid", gap: "10px" }}>
      {/* Date Range */}
      <div>
        <strong>Date Range:</strong>
        <div>
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleFilterChange}
            placeholder="Start Date"
            style={{ marginRight: "10px", padding: "8px" }}
          />
          to
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleFilterChange}
            placeholder="End Date"
            style={{ marginLeft: "10px", padding: "8px" }}
          />
        </div>
      </div>

      {/* Time Range */}
      <div>
        <strong>Time Range:</strong>
        <div>
          <input
            type="time"
            name="startTime"
            value={filters.startTime}
            onChange={handleFilterChange}
            placeholder="Start Time"
            style={{ marginRight: "10px", padding: "8px" }}
          />
          to
          <input
            type="time"
            name="endTime"
            value={filters.endTime}
            onChange={handleFilterChange}
            placeholder="End Time"
            style={{ marginLeft: "10px", padding: "8px" }}
          />
        </div>
      </div>

      {/* Price Range */}
      <div>
        <strong>Price Range:</strong>
        <div>
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleFilterChange}
            placeholder="Min Price"
            style={{ marginRight: "10px", padding: "8px" }}
          />
          to
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            placeholder="Max Price"
            style={{ marginLeft: "10px", padding: "8px" }}
          />
        </div>
      </div>
    </div>

    {/* Table */}
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
          <th style={{ padding: "8px" }}>Date</th>
          <th style={{ padding: "8px" }}>Time</th>
          <th style={{ padding: "8px" }}>Price</th>
        </tr>
      </thead>
      <tbody>
        {filteredData.length > 0 ? (
          filteredData.map((row, index) => (
            <tr key={index}>
              <td style={{ padding: "8px" }}>{row.date}</td>
              <td style={{ padding: "8px" }}>{row.time}</td>
              <td style={{ padding: "8px" }}>₹{row.price}</td>
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
  )
}

export default Task