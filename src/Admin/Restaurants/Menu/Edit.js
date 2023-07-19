import React, { useEffect, useState } from "react";
import Sidebar from "../../../common/Sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, Form } from "react-bootstrap";

export default function Add() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);
  const [state, setState] = useState({
    name: location.state.name,
    des: location.state.des,
    price: location.state.price,
    type: location.state.type,
    _id:location.state._id
  });

  const handleEditDish = async (data) => {
    try {
      const addRestro = await axios.post(
        `${process.env.REACT_APP_API_URL_LOCAL}/dish/addEdit`,
        data
      );

      if (addRestro.status === 200) {
        toast.success("Restaurant Updated");
      }

      navigate("/menu");
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: state,
    // validationSchema: ProductSchema,
    onSubmit: async (values) => {
      let data = {
        ...values,
        restaurant_id: location.state._id,
      };
      // console.log(data);
      await handleEditDish(data);
      return;
    },
  });
  console.log("location====>", location);
  return (
    <div>
      <Sidebar />

      <h1>Edit Dish</h1>

      <form onSubmit={formik.handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label>Dish Name:</Form.Label>
              <Form.Control
                placeholder="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                name="name"
              />
              {formik.errors.name && formik.touched.name && (
                <div style={{ color: "red" }} className="validation">
                  {formik.errors.name}
                </div>
              )}
            </Form.Group>
          </div>

          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label>Price:</Form.Label>
              <Form.Control
                placeholder="Price"
                value={formik.values.price}
                onChange={formik.handleChange}
                name="price"
              />
              {formik.errors.price && formik.touched.price && (
                <div style={{ color: "red" }} className="validation">
                  {formik.errors.price}
                </div>
              )}
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label>Veg/Non-Veg:</Form.Label>
              <Form.Select
                value={formik.values.type}
                onChange={formik.handleChange}
                name="type"
              >
                <option value={""} disabled>
                  Select
                </option>
                <option value={"veg"}>Veg</option>
                <option value={"non-veg"}>Non-Veg</option>
              </Form.Select>
              {formik.errors.type && formik.touched.type && (
                <div style={{ color: "red" }} className="validation">
                  {formik.errors.type}
                </div>
              )}
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label>Description:</Form.Label>
              <Form.Control
                value={formik.values.des}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="des"
                placeholder="Description"
                as="textarea"
               
              />

              {formik.errors.des && formik.touched.des && (
                <div style={{ color: "red" }} className="validation">
                  {formik.errors.des}
                </div>
              )}
            </Form.Group>
          </div>

          <div className="col-md-12 mt-4">
            <Button variant="secondary" type="submit">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
