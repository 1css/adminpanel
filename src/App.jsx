import React, { useState } from "react";
import {
  Admin,
  CustomRoutes,
  Layout,
  Menu,
  AppBar,
  UserMenu,
} from "react-admin";
import { Route, Navigate, useNavigate } from "react-router";
import jsonServerProvider from "ra-data-json-server";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Card,
} from "react-bootstrap";
import {
  FaCar,
  FaPlus,
  FaEdit,
  FaList,
  FaStar,
  FaClock,
  FaSignOutAlt,
  FaUserEdit,
  FaAngleDown,
  FaAngleRight,
  FaBars,
} from "react-icons/fa";

// ✅ Import custom screens
import BrandTable from "./screens/BrandTable";
import AddBrand from "./components/AddBrand";
import EditBrand from "./components/EditBrand";
import AdminCarProducts from "./screens/AdminCarProducts";
import AddCarProduct from "./components/AddCarProduct";
import EditCarProduct from "./components/EditCarProduct";
import ReviewProduct from "./screens/ReviewProduct";
import AdminUpcomingCarProducts from "./screens/AdminUpcomingCarProducts";
import EditProfile from "./screens/EditProfile"; // ✅ Create/Edit profile screen

// ✅ Dummy Data Provider
const dataProvider = jsonServerProvider(
  "https://jsonplaceholder.typicode.com"
);

// ✅ Dummy Users
const USERS = [
  { email: "janedoe@example.com", password: "12345", role: "admin" },
  { email: "subadmin@example.com", password: "12345", role: "subadmin" },
];

// ✅ Custom Menu with Collapsible Sections
const CustomMenu = ({ user, ...props }) => {
  const [brandsOpen, setBrandsOpen] = useState(false);
  const [carsOpen, setCarsOpen] = useState(false);

  return (
    <Menu
      {...props}
      sx={{
        borderRight: "1px solid #ccc",
        minHeight: "100vh",
        width: props.dense ? 60 : 200,
        transition: "width 0.3s",
      }}
    >
      {/* Brands Section */}
      <div
        onClick={() => setBrandsOpen(!brandsOpen)}
        style={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          padding: "0.5rem 1rem",
        }}
      >
        <FaList />
        {!props.dense && (
          <span style={{ marginLeft: "10px", flexGrow: 1 }}>Brands</span>
        )}
        {brandsOpen ? <FaAngleDown /> : <FaAngleRight />}
      </div>
      {brandsOpen && (
        <div style={{ paddingLeft: props.dense ? "0.5rem" : "1.5rem" }}>
          {user?.role === "admin" && (
            <>
              <Menu.Item
                to="/brands/add"
                primaryText={!props.dense ? "Add Brand" : null}
                leftIcon={<FaPlus />}
              />
              <Menu.Item
                to="/brands/edit"
                primaryText={!props.dense ? "Edit Brand" : null}
                leftIcon={<FaEdit />}
              />
            </>
          )}
          <Menu.Item
            to="/brands"
            primaryText={!props.dense ? "All Brands" : null}
            leftIcon={<FaList />}
          />
        </div>
      )}

      {/* Cars Section (only admin) */}
      {user?.role === "admin" && (
        <>
          <div
            onClick={() => setCarsOpen(!carsOpen)}
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              padding: "0.5rem 1rem",
            }}
          >
            <FaCar />
            {!props.dense && (
              <span style={{ marginLeft: "10px", flexGrow: 1 }}>
                Car Products
              </span>
            )}
            {carsOpen ? <FaAngleDown /> : <FaAngleRight />}
          </div>
          {carsOpen && (
            <div style={{ paddingLeft: props.dense ? "0.5rem" : "1.5rem" }}>
              <Menu.Item
                to="/cars/add"
                primaryText={!props.dense ? "Add Car Product" : null}
                leftIcon={<FaPlus />}
              />
              <Menu.Item
                to="/cars/edit"
                primaryText={!props.dense ? "Edit Car Product" : null}
                leftIcon={<FaEdit />}
              />
              <Menu.Item
                to="/cars"
                primaryText={!props.dense ? "All Cars" : null}
                leftIcon={<FaCar />}
              />
            </div>
          )}
        </>
      )}

      {/* Common Sections */}
      <Menu.Item
        to="/reviews"
        primaryText={!props.dense ? "Review Product" : null}
        leftIcon={<FaStar />}
      />
      <Menu.Item
        to="/upcoming"
        primaryText={!props.dense ? "Upcoming Cars" : null}
        leftIcon={<FaClock />}
      />
    </Menu>
  );
};

// ✅ Custom User Menu in Navbar
const MyUserMenu = ({ onLogout }) => {
  const navigate = useNavigate();
  return (
    <UserMenu>
      <Button
        variant="light"
        className="d-flex align-items-center w-100"
        onClick={() => navigate("/edit-profile")}
      >
        <FaUserEdit className="me-2" /> Edit Profile
      </Button>
      <Button
        variant="danger"
        className="d-flex align-items-center w-100 mt-2"
        onClick={onLogout}
      >
        <FaSignOutAlt className="me-2" /> Logout
      </Button>
    </UserMenu>
  );
};

// ✅ Custom AppBar
const MyAppBar = (props) => {
  const { user, onLogout } = props;
  return (
    <AppBar
      {...props}
      userMenu={<MyUserMenu onLogout={onLogout} />}
      title={`Welcome, ${user?.email || "Guest"}`}
    />
  );
};

// ✅ Custom Layout
const CustomLayout = (props) => {
  const { user, onLogout } = props;
  return (
    <Layout
      {...props}
      menu={(menuProps) => <CustomMenu {...menuProps} user={user} />}
      appBar={(appBarProps) => (
        <MyAppBar {...appBarProps} user={user} onLogout={onLogout} />
      )}
    />
  );
};

// ✅ Main App Component
export default function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const foundUser = USERS.find(
      (u) => u.email === email && u.password === password
    );
    if (foundUser) {
      setUser(foundUser);
      setError("");
    } else {
      setError("Invalid email or password");
    }
  };

  const handleLogout = () => {
    setUser(null);
    setEmail("");
    setPassword("");
  };

  if (!user) {
    return (
      <Container
        fluid
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh", width: "100vw" }}
      >
        <Row>
          <Col>
            <Card className="p-4 shadow rounded" style={{ width: "400px" }}>
              <h3 className="text-center mb-3">Login</h3>
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                {error && <Alert variant="danger">{error}</Alert>}
                <Button type="submit" variant="primary" className="w-100 mt-2">
                  Login
                </Button>
              </Form>
              <p className="text-center mt-3 mb-0">
                <b>Admin:</b> janedoe@example.com / 12345 <br />
                <b>SubAdmin:</b> subadmin@example.com / 12345
              </p>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Admin
      dataProvider={dataProvider}
      layout={(props) => (
        <CustomLayout {...props} user={user} onLogout={handleLogout} />
      )}
      // ✅ Default route after login → /brands
      dashboard={() => <Navigate to="/brands" replace />}
    >
      <CustomRoutes>
        <Route path="/brands" element={<BrandTable />} />
        <Route path="/brands/add" element={<AddBrand />} />
        <Route path="/brands/edit" element={<EditBrand />} />
        <Route path="/cars" element={<AdminCarProducts />} />
        <Route path="/cars/add" element={<AddCarProduct />} />
        <Route path="/cars/edit" element={<EditCarProduct />} />
        <Route path="/reviews" element={<ReviewProduct />} />
        <Route path="/upcoming" element={<AdminUpcomingCarProducts />} />
        <Route
          path="/edit-profile"
          element={<EditProfile user={user} setUser={setUser} />}
        />
      </CustomRoutes>
    </Admin>
  );
}
