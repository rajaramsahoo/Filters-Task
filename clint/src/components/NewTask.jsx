import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io"; // Search icon
import { FaSort } from "react-icons/fa"; // Sorting icons

const NewTask = () => {
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

  const [openModal, setOpenModal] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

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
      (!filters.minPrice ||
        parseFloat(row.price) >= parseFloat(filters.minPrice)) &&
      (!filters.maxPrice ||
        parseFloat(row.price) <= parseFloat(filters.maxPrice));

    return isDateInRange && isTimeInRange && isPriceInRange;
  });

  // Sort the data
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig.key) return 0;
    if (sortConfig.key === "price") {
      return (
        (parseFloat(a[sortConfig.key]) - parseFloat(b[sortConfig.key])) *
        (sortConfig.direction === "asc" ? 1 : -1)
      );
    } else {
      return (
        a[sortConfig.key].localeCompare(b[sortConfig.key]) *
        (sortConfig.direction === "asc" ? 1 : -1)
      );
    }
  });

  // Handle sorting
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const openColumnModal = (column) => {
    setOpenModal(column);
  };

  const closeModal = () => {
    setOpenModal("");
  };

  const resetButton = () => {
    setFilters({
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      minPrice: "",
      maxPrice: "",
    });
  };

  return (
    <div>
      <div
        style={{
          padding: "15px",
          fontFamily: "Arial, sans-serif",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h2 style={{ textAlign: "center", marginTop: "0", paddingTop: "0" }}>
          Filterable and Sortable Table
        </h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "0",
            border: "1px solid #ddd",
            textAlign: "center",
            padding: "0",
            position: "relative",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f4f4f4" }}>
              <th
                style={{
                  padding: "8px",
                  position: "relative",
                  cursor: "pointer",
                }}
                onClick={() => handleSort("date")}
              >
                Date
                <FaSort style={{ marginRight: "10px" }} />
                <span onClick={() => openColumnModal("date")}>
                  <IoIosSearch />
                </span>
                {openModal === "date" && (
                  <div
                    style={{
                      position: "absolute",
                      top: "30px",
                      left: "0",
                      width: "150px",
                      backgroundColor: "white",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      padding: "10px",
                      borderRadius: "8px",
                      zIndex: "10",
                      border: "1px solid #ddd",
                    }}
                  >
                    <form>
                      <div>
                        <input
                          type="date"
                          name="startDate"
                          value={filters.startDate}
                          onChange={handleFilterChange}
                          style={{
                            marginBottom: "5px",
                            padding: "5px",
                            width: "80%",
                          }}
                        />
                        <input
                          type="date"
                          name="endDate"
                          value={filters.endDate}
                          onChange={handleFilterChange}
                          style={{
                            marginLeft: "5px",
                            padding: "5px",
                            width: "80%",
                            marginBottom: "10px",
                          }}
                        />
                      </div>
                      <div
                        className=""
                        style={{
                          display: "flex",
                          gap: "10px",
                        }}
                      >
                        <button
                          type="button"
                          onClick={closeModal}
                          style={{
                            backgroundColor: "#007bff",
                            color: "white",
                            padding: "5px 10px",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            width: "100%",
                          }}
                        >
                          Filters
                        </button>
                        <button
                          type="button"
                          onClick={resetButton}
                          style={{
                            backgroundColor: "#007bff",
                            color: "white",
                            padding: "5px 10px",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            width: "100%",
                          }}
                        >
                          Reset
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </th>
              <th
                style={{
                  padding: "8px",
                  position: "relative",
                  cursor: "pointer",
                }}
                onClick={() => handleSort("time")}
              >
                Time
                <FaSort style={{ marginRight: "10px" }} />
                <span onClick={() => openColumnModal("time")}>
                  <IoIosSearch />
                </span>
                {openModal === "time" && (
                  <div
                    style={{
                      position: "absolute",
                      top: "30px",
                      left: "0",
                      width: "150px",
                      backgroundColor: "white",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      padding: "10px",
                      borderRadius: "8px",
                      zIndex: "10",
                      border: "1px solid #ddd",
                    }}
                  >
                    <form>
                      <div>
                        <input
                          type="time"
                          name="startTime"
                          value={filters.startTime}
                          onChange={handleFilterChange}
                          style={{
                            marginBottom: "5px",
                            padding: "5px",
                            width: "80%",
                          }}
                        />
                        <input
                          type="time"
                          name="endTime"
                          value={filters.endTime}
                          onChange={handleFilterChange}
                          style={{
                            marginLeft: "5px",
                            padding: "5px",
                            width: "80%",
                            marginBottom: "10px",
                          }}
                        />
                      </div>
                      <div
                        className=""
                        style={{
                          display: "flex",
                          gap: "10px",
                        }}
                      >
                        <button
                          type="button"
                          onClick={closeModal}
                          style={{
                            backgroundColor: "#007bff",
                            color: "white",
                            padding: "5px 10px",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            width: "100%",
                          }}
                        >
                          Filters
                        </button>
                        <button
                          type="button"
                          onClick={resetButton}
                          style={{
                            backgroundColor: "#007bff",
                            color: "white",
                            padding: "5px 10px",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            width: "100%",
                          }}
                        >
                          Reset
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </th>
              <th
                style={{
                  padding: "8px",
                  position: "relative",
                  cursor: "pointer",
                }}
                onClick={() => handleSort("price")}
              >
                Price
                <FaSort style={{ marginRight: "10px" }} />
                <span onClick={() => openColumnModal("price")}>
                  <IoIosSearch />
                </span>
                {openModal === "price" && (
                  <div
                    style={{
                      position: "absolute",
                      top: "30px",
                      left: "0",
                      width: "150px",
                      backgroundColor: "white",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      padding: "10px",
                      borderRadius: "8px",
                      zIndex: "10",
                      border: "1px solid #ddd",
                    }}
                  >
                    <form>
                      <div>
                        <input
                          type="number"
                          name="minPrice"
                          value={filters.minPrice}
                          onChange={handleFilterChange}
                          style={{
                            marginBottom: "5px",
                            padding: "5px",
                            width: "80%",
                          }}
                        />
                        <input
                          type="number"
                          name="maxPrice"
                          value={filters.maxPrice}
                          onChange={handleFilterChange}
                          style={{
                            marginLeft: "5px",
                            padding: "5px",
                            width: "80%",
                            marginBottom: "10px",
                          }}
                        />
                      </div>
                      <div
                        className=""
                        style={{
                          display: "flex",
                          gap: "10px",
                        }}
                      >
                        <button
                          type="button"
                          onClick={closeModal}
                          style={{
                            backgroundColor: "#007bff",
                            color: "white",
                            padding: "5px 10px",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            width: "100%",
                          }}
                        >
                          Filters
                        </button>
                        <button
                          type="button"
                          onClick={resetButton}
                          style={{
                            backgroundColor: "#007bff",
                            color: "white",
                            padding: "5px 10px",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            width: "100%",
                          }}
                        >
                          Reset
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, index) => (
              <tr key={index}>
                <td>{row.date}</td>
                <td>{row.time}</td>
                <td>{row.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewTask;
