import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function BrandTable() {
  const [brands, setBrands] = useState([
    { id: 1, name: "Toyota", country: "Japan", founded: 1937, active: true },
    { id: 2, name: "Ford", country: "USA", founded: 1903, active: true },
    { id: 3, name: "BMW", country: "Germany", founded: 1916, active: false },
    { id: 4, name: "Hyundai", country: "South Korea", founded: 1967, active: true },
    { id: 5, name: "Tata Motors", country: "India", founded: 1945, active: true },
  ]);

  const [search, setSearch] = useState("");

  // ✅ Delete Brand
  const handleDelete = (id) => {
    setBrands(brands.filter((brand) => brand.id !== id));
  };

  // ✅ Toggle Active/Inactive
  const toggleActive = (id) => {
    setBrands(
      brands.map((brand) =>
        brand.id === id ? { ...brand, active: !brand.active } : brand
      )
    );
  };

  // ✅ Filter brands by search text
  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ width: "100%", padding: "20px" }}>
      <h1 className="mb-4">Car Brands</h1>

      {/* Buttons + Search */}
      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-primary">Add Brand</button>
        <div className="d-flex">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Search Brand"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-success me-2">Export</button>
        </div>
      </div>

      {/* ✅ Responsive full-width table */}
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Brand Name</th>
              <th>Country</th>
              <th>Founded</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBrands.length > 0 ? (
              filteredBrands.map((brand) => (
                <tr key={brand.id}>
                  <td>{brand.id}</td>
                  <td>{brand.name}</td>
                  <td>{brand.country}</td>
                  <td>{brand.founded}</td>
                  <td>
                    <span
                      className={`badge ${
                        brand.active ? "bg-success" : "bg-secondary"
                      }`}
                    >
                      {brand.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-warning btn-sm me-2">Edit</button>
                    <button
                      className="btn btn-danger btn-sm me-2"
                      onClick={() => handleDelete(brand.id)}
                    >
                      Delete
                    </button>
                    <button
                      className={`btn btn-sm ${
                        brand.active ? "btn-secondary" : "btn-success"
                      }`}
                      onClick={() => toggleActive(brand.id)}
                    >
                      {brand.active ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No brands found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BrandTable;
