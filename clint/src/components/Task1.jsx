import React, { useState } from "react";
import { Input, Dropdown, Menu, Popover, DatePicker } from "antd";
import { FaCalendarAlt, FaClock, FaDollarSign } from "react-icons/fa"; // React Icons
import { IoIosArrowDown, IoIosArrowUp, IoIosSearch } from "react-icons/io"; // Sorting and Search icons
import moment from "moment";
const Task1 = () => {
  // Initial table data
  const initialData = [
    { date: "2024-11-20", time: "10:00", price: "15.99" },
    { date: "2024-11-21", time: "12:30", price: "20.50" },
    { date: "2024-11-22", time: "09:45", price: "30.00" },
    { date: "2024-11-22", time: "14:15", price: "25.00" },
    { date: "2024-11-23", time: "16:00", price: "18.75" },
  ];

  const [data, setData] = useState(initialData);
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    minPrice: "",
    maxPrice: "",
  });

  const [sortConfig, setSortConfig] = useState({
    date: null,
    time: null,
    price: null,
  });

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  // Handle date range selection
  const handleDateChange = (dates) => {
    if (dates) {
      setFilters({
        ...filters,
        startDate: dates[0].format("YYYY-MM-DD"),
        endDate: dates[1].format("YYYY-MM-DD"),
      });
    }
  };

  // Handle sorting change
  const handleSort = (column) => {
    const direction = sortConfig[column] === "ascend" ? "descend" : "ascend";
    setSortConfig((prevConfig) => ({ ...prevConfig, [column]: direction }));
  };

  // Apply filters to the data
  const filteredData = data
    .filter((row) => {
      const isDateInRange =
        (!filters.startDate || row.date >= filters.startDate) &&
        (!filters.endDate || row.date <= filters.endDate);
      const isTimeInRange =
        (!filters.startTime || row.time >= filters.startTime) &&
        (!filters.endTime || row.time <= filters.endTime);
      const isPriceInRange =
        (!filters.minPrice ||
          parseFloat(row.price) >= parseFloat(filters.minPrice)) &&
        (!filters.maxPrice ||
          parseFloat(row.price) <= parseFloat(filters.maxPrice));

      return isDateInRange && isTimeInRange && isPriceInRange;
    })
    .sort((a, b) => {
      const sortOrder = (column) => {
        if (sortConfig[column] === "ascend") {
          return a[column] > b[column] ? 1 : -1;
        } else if (sortConfig[column] === "descend") {
          return a[column] < b[column] ? 1 : -1;
        }
        return 0;
      };

      if (sortConfig.date) {
        return sortOrder("date");
      }
      if (sortConfig.time) {
        return sortOrder("time");
      }
      if (sortConfig.price) {
        return sortOrder("price");
      }

      return 0;
    });

  const menu = (column) => (
    <Menu>
      <Menu.Item onClick={() => handleSort(column)}>
        {sortConfig[column] === "ascend" ? (
          <>
            <IoIosArrowUp /> Ascending
          </>
        ) : (
          <>
            <IoIosArrowDown /> Descending
          </>
        )}
      </Menu.Item>
    </Menu>
  );

  const datePopoverContent = (
    <DatePicker.RangePicker
      format="YYYY-MM-DD"
      onChange={handleDateChange}
      value={[
        filters.startDate ? moment(filters.startDate) : null,
        filters.endDate ? moment(filters.endDate) : null,
      ]}
    />
  );

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Filterable Table with Column-Specific Filters and Sort</h2>

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
            {/* Date Column with Popover and Sorting */}
            <th style={{ padding: "8px" }}>
              Date
              <br />
              {/* Popover for Date Range Picker */}
              <Popover
                content={datePopoverContent}
                title="Select Date Range"
                trigger="click"
                placement="bottom"
              >
                <span
                  style={{
                    cursor: "pointer",
                    marginTop: "5px",
                    display: "inline-block",
                  }}
                >
                  <IoIosSearch />
                </span>
              </Popover>
              <Dropdown overlay={menu("date")} trigger={["click"]}>
                <span
                  style={{
                    cursor: "pointer",
                    marginTop: "5px",
                    display: "inline-block",
                  }}
                >
                  {sortConfig.date === "ascend" ? (
                    <IoIosArrowUp />
                  ) : (
                    <IoIosArrowDown />
                  )}
                </span>
              </Dropdown>
            </th>

            {/* Time Column with Dropdown Filter and Sorting */}
            <th style={{ padding: "8px" }}>
              Time
              <br />
              {/* Time Range Filter with Icon */}
              <Input
                type="time"
                name="startTime"
                value={filters.startTime}
                onChange={handleFilterChange}
                style={{ marginTop: "5px", padding: "4px", width: "95%" }}
                prefix={<FaClock />}
              />
              to
              <Input
                type="time"
                name="endTime"
                value={filters.endTime}
                onChange={handleFilterChange}
                style={{ marginTop: "5px", padding: "4px", width: "95%" }}
                prefix={<FaClock />}
              />
              <Dropdown overlay={menu("time")} trigger={["click"]}>
                <span
                  style={{
                    cursor: "pointer",
                    marginTop: "5px",
                    display: "inline-block",
                  }}
                >
                  {sortConfig.time === "ascend" ? (
                    <IoIosArrowUp />
                  ) : (
                    <IoIosArrowDown />
                  )}
                </span>
              </Dropdown>
            </th>

            {/* Price Column with Dropdown Filter and Sorting */}
            <th style={{ padding: "8px" }}>
              Price
              <br />
              {/* Price Range Filter with Icon */}
              <Input
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleFilterChange}
                placeholder="Min Price"
                style={{ marginTop: "5px", padding: "4px", width: "95%" }}
                prefix={<FaDollarSign />}
              />
              to
              <Input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                placeholder="Max Price"
                style={{ marginTop: "5px", padding: "4px", width: "95%" }}
                prefix={<FaDollarSign />}
              />
              <Dropdown overlay={menu("price")} trigger={["click"]}>
                <span
                  style={{
                    cursor: "pointer",
                    marginTop: "5px",
                    display: "inline-block",
                  }}
                >
                  {sortConfig.price === "ascend" ? (
                    <IoIosArrowUp />
                  ) : (
                    <IoIosArrowDown />
                  )}
                </span>
              </Dropdown>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((row, index) => (
              <tr key={index}>
                <td style={{ padding: "8px" }}>{row.date}</td>
                <td style={{ padding: "8px" }}>{row.time}</td>
                <td style={{ padding: "8px" }}>
                  ${parseFloat(row.price).toFixed(2)}
                </td>
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
};

export default Task1;
