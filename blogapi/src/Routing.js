import React, { useMemo, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import App from "./App";
import Login from "./components/authentification/Login";
import SignUp from "./components/authentification/Register";
import SignOut from "./components/authentification/Logout";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Post from "./components/singlePost";
import Admin from "./components/userManagement/admin";
import Create from "./components/userManagement/create";
import Edit from "./components/userManagement/edit";
import Delete from "./components/userManagement/delete";
import Orders from "./components/userManagement/orders";
import OrdersFrom from "./components/userManagement/ordersFromMe";
import CreateOrder from "./components/userManagement/createOrder";
import Messaging from "./components/userManagement/messaging";
import { UserProvider } from "./UserContext";

function Routing() {
  //const providerValue = useMemo(() => (user, setUser), [user, setUser]);

  return (
    <Router>
      <UserProvider>
        <Header />
        <Routes>
          <Route exact path="/" element={<App />} />
          <Route exact path="/register" element={<SignUp />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/logout" element={<SignOut />} />
          <Route path="post">
            <Route exact path=":id" element={<Post />} />
          </Route>
          <Route exact path="/admin" element={<Admin />} />
          <Route exact path="/admin/orders" element={<Orders />} />
          <Route exact path="/admin/ordersFrom" element={<OrdersFrom />} />
          <Route exact path="/admin/order/:id" element={<CreateOrder />} />
          <Route
            exact
            path="/admin/order/messages/:id"
            element={<Messaging />}
          />
          <Route exact path="/admin/create" element={<Create />} />
          <Route exact path="/admin/edit/:id" element={<Edit />} />
          <Route exact path="/admin/delete/:id" element={<Delete />} />
        </Routes>
      </UserProvider>
      <Footer />
    </Router>
  );
}

export default Routing;
