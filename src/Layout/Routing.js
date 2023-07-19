import React from "react";
import "./layout.css";
import { Routes, Route } from "react-router-dom";
import Home from "../Admin/Home/Home";

import Users from "../Admin/Users/Users";
import Category from "../Admin/Category/Category";

import AddUser from "../Admin/Users/AddUser";
import AddCategory from "../Admin/Category/Add";
import Login from "../Admin/Login/Login";
import EditCategory from "../Admin/Category/Edit";
import EditUser from "../Admin/Users/EditUser";
import ProtectedRoutes from "../Admin/ProtectedRoutes/ProtectedRoutes";

import Products from "../Admin/Products/Products";
import Vendors from "../Admin/Vendors/Vendors";
import Dashboard from "../Admin/Dashboard/Dashboard";
import AddVendor from "../Admin/Vendors/Add";
import EditVendor from "../Admin/Vendors/Edit";
import AddProduct from "../Admin/Products/Add";
import EditProduct from "../Admin/Products/Edit";
import Banners from "../Admin/Banners/Banners";
import AddBanner from "../Admin/Banners/Add";
import EditBanner from "../Admin/Banners/Edit";
import Restaurants from "../Admin/Restaurants/Restaurants";
import AddRestaurant from "../Admin/Restaurants/Add";
import EditRestaurant from "../Admin/Restaurants/Edit";
import PageNotFound from "../Admin/PageNotFound/PageNotFound";
import Dishes from "../Admin/Restaurants/Menu/Dishes";
import AddDish from "../Admin/Restaurants/Menu/Add";
import EditDish from "../Admin/Restaurants/Menu/Edit";




const Routing = () => {
  return (
    <>
      {/* auth routes */}
      <Routes>
        <Route exact={true} path="/login" element={<Login />} />
        <Route exact={true} path="*" element={<PageNotFound />} />

        {/* protected routes */}
        <Route
          exact
          path="/dashboard"
          element={<ProtectedRoutes Component={Dashboard} />}
        />
        {/* user routes */}
        <Route
          exact
          path="/users"
          element={<ProtectedRoutes Component={Users} />}
        />
        <Route
          exact={true}
          path="/users/Add"
          element={<ProtectedRoutes Component={AddUser} />}
        />
        <Route
          exact={true}
          path="/users/Edit"
          element={<ProtectedRoutes Component={EditUser} />}
        />

        <Route
          exact={true}
          path="/"
          element={<ProtectedRoutes Component={Home} />}
        />
        {/* category routes */}
        <Route
          exact={true}
          path="/category"
          element={<ProtectedRoutes Component={Category} />}
        />
        <Route
          exact={true}
          path="/category/Add"
          element={<ProtectedRoutes Component={AddCategory} />}
        />
        <Route
          exact={true}
          path="/category/edit"
          element={<ProtectedRoutes Component={EditCategory} />}
        />
        {/* products routes */}
        <Route
          exact={true}
          path="/products"
          element={<ProtectedRoutes Component={Products} />}
        />
      <Route
          exact={true}
          path="/product/Add"
          element={<ProtectedRoutes Component={AddProduct} />}
        />
        <Route
          exact={true}
          path="/product/edit"
          element={<ProtectedRoutes Component={EditProduct} />}
        />
        {/* vendors routes */}
        <Route
          exact={true}
          path="/vendors"
          element={<ProtectedRoutes Component={Vendors} />}
        />
          <Route
          exact={true}
          path="/vendor/Add"
          element={<ProtectedRoutes Component={AddVendor} />}
        />
        <Route
          exact={true}
          path="/vendor/edit"
          element={<ProtectedRoutes Component={EditVendor} />}
        />
          {/* banners routes */}
          <Route
          exact={true}
          path="/banners"
          element={<ProtectedRoutes Component={Banners} />}
        />
          <Route
          exact={true}
          path="/banner/Add"
          element={<ProtectedRoutes Component={AddBanner} />}
        />
        <Route
          exact={true}
          path="/banner/edit"
          element={<ProtectedRoutes Component={EditBanner} />}
        />
          {/* Restaurants routes */}
          <Route
          exact={true}
          path="/restaurants"
          element={<ProtectedRoutes Component={Restaurants} />}
        />
          <Route
          exact={true}
          path="/restaurant/Add"
          element={<ProtectedRoutes Component={AddRestaurant} />}
        />
        <Route
          exact={true}
          path="/restaurant/edit"
          element={<ProtectedRoutes Component={EditRestaurant} />}
        />
            {/* Restaurants menu routes */}
            <Route
          exact={true}
          path="/menu"
          element={<ProtectedRoutes Component={Dishes} />}
        />
          <Route
          exact={true}
          path="/dish/Add"
          element={<ProtectedRoutes Component={AddDish} />}
        />
        <Route
          exact={true}
          path="/dish/edit"
          element={<ProtectedRoutes Component={EditDish} />}
        />
      </Routes>
    </>
  );
};
export default Routing;
