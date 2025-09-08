// AdminUpcomingCarProducts.jsx
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function AdminUpcomingCarProducts() {
  // ✅ Dummy upcoming car data
  const [upcomingCars, setUpcomingCars] = useState([
    { id: 1, name: "Tesla Model 3", releaseDate: "2025-03-01", status: "Active" },
    { id: 2, name: "Audi Q6 e-tron", releaseDate: "2025-06-15", status: "Inactive" },
    { id: 3, name: "BMW iX1", releaseDate: "2025-09-20", status: "Active" },
    { id: 4, name: "Hyundai Ioniq 7", releaseDate: "2025-12-05", status: "Inactive" },
    { id: 5, name: "Mahindra XUV EV", releaseDate: "2026-02-10", status: "Active" },
  ]);

  const [search, setSearch] = useState("");

  // ✅ Toggle Active/Inactive
  const toggleStatus = (id) => {
    setUpcomingCars(
      upcomingCars.map((car) =>
        car.id === id ? { ...car, status: car.status === "Active" ? "Inactive" : "Active" } : car
      )
    );
  };

  // ✅ Delete car
  const deleteCar = (id) => {
    setUpcomingCars(upcomingCars.filter((car) => car.id !== id));
  };

  // ✅ Search filter
  const filteredCars = upcomingCars.filter((car) =>
    car.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mt-4" style={{ width: "100%", maxWidth: "100%" }}>
      <h1 className="mb-4">Upcoming Car Products</h1>

      {/* Top controls */}
      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-primary">+ Add Upcoming Car</button>
        <div className="d-flex">
          <button className="btn btn-success me-2">Export</button>
          <input
            type="text"
            className="form-control me-2"
            placeholder="Search upcoming cars..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-info">Search</button>
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Car Name</th>
              <th>Release Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCars.map((car) => (
              <tr key={car.id}>
                <td>{car.id}</td>
                <td>{car.name}</td>
                <td>{car.releaseDate}</td>
                <td>
                  <span
                    className={`badge ${
                      car.status === "Active" ? "bg-success" : "bg-secondary"
                    }`}
                  >
                    {car.status}
                  </span>
                </td>
                <td>
                  <button className="btn btn-sm btn-warning me-2">Edit</button>
                  <button
                    className="btn btn-sm btn-danger me-2"
                    onClick={() => deleteCar(car.id)}
                  >
                    Delete
                  </button>
                  <button
                    className={`btn btn-sm ${
                      car.status === "Active" ? "btn-secondary" : "btn-success"
                    }`}
                    onClick={() => toggleStatus(car.id)}
                  >
                    {car.status === "Active" ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredCars.length === 0 && (
          <p className="text-center text-muted">No upcoming cars found.</p>
        )}
      </div>
    </div>
  );
}

export default AdminUpcomingCarProducts;
