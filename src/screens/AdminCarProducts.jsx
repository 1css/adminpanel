// AdminCarProducts.jsx
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function AdminCarProducts() {
  // ✅ Dummy car products data
  const [products, setProducts] = useState([
    { id: 1, name: "Toyota Corolla", price: 20000, status: "Active" },
    { id: 2, name: "Ford Mustang", price: 35000, status: "Inactive" },
    { id: 3, name: "BMW X5", price: 60000, status: "Active" },
    { id: 4, name: "Hyundai i20", price: 15000, status: "Active" },
    { id: 5, name: "Tata Nexon EV", price: 18000, status: "Inactive" },
  ]);

  const [search, setSearch] = useState("");

  // ✅ Toggle Active/Inactive
  const toggleStatus = (id) => {
    setProducts(
      products.map((p) =>
        p.id === id ? { ...p, status: p.status === "Active" ? "Inactive" : "Active" } : p
      )
    );
  };

  // ✅ Delete Product
  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  // ✅ Search Filter
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mt-4" style={{ width: "100%", maxWidth: "100%" }}>
      <h1 className="mb-4">Admin Car Products</h1>

      {/* Top controls */}
      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-primary">+ Add Product</button>
        <div className="d-flex">
          <button className="btn btn-success me-2">Export</button>
          <input
            type="text"
            className="form-control me-2"
            placeholder="Search products..."
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
              <th>Price ($)</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>
                  <span
                    className={`badge ${
                      product.status === "Active" ? "bg-success" : "bg-secondary"
                    }`}
                  >
                    {product.status}
                  </span>
                </td>
                <td>
                  <button className="btn btn-sm btn-warning me-2">Edit</button>
                  <button
                    className="btn btn-sm btn-danger me-2"
                    onClick={() => deleteProduct(product.id)}
                  >
                    Delete
                  </button>
                  <button
                    className={`btn btn-sm ${
                      product.status === "Active" ? "btn-secondary" : "btn-success"
                    }`}
                    onClick={() => toggleStatus(product.id)}
                  >
                    {product.status === "Active" ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredProducts.length === 0 && (
          <p className="text-center text-muted">No products found.</p>
        )}
      </div>
    </div>
  );
}

export default AdminCarProducts;
