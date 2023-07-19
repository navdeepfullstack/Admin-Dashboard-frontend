import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ProductSchema, UserAddSchema } from "../../validations";
import Sidebar from "../../common/Sidebar";
import StringArrayInput from "../../Custom/StringArrayInput";
export default function Add() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [enteredHashTags, setEnteredHashTags] = useState([""]);
  const [enteredColors, setEnteredColors] = useState([""]);
  const [coords, setCoords] = useState({
    latitude: "",
    longitude: "",
  });

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    categoryOptions();
  }, []);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCoords({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }, []);
  // console.log("coords", coords.latitude, coords.longitude);
  const location = useLocation();

  const [files, setFiles] = useState([]);

  const [state, setState] = useState({
    name: location.state.name,
    city: location.state.city,
    address:location.state.address,
    openTime: location.state.openTime,
    closeTime: location.state.closeTime,
    pincode: location.state.pincode,
  });

  const handleEditRestro = async (data) => {
    try {

       
      const editRestro = await axios.post(
        `${process.env.REACT_APP_API_URL_LOCAL}/restaurant/addEdit`,
        data
      );
      console.log("asddddddddd",editRestro);
      if (editRestro.status === 200) {
        toast.success(editRestro.data.message);
        navigate("/restaurants");
      }

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
        location: {
          type: "Point",
          coordinates: [coords.latitude, coords.longitude],
        },
        _id:location.state._id
      };
      console.log(data);
      await handleEditRestro(data);
      return;
    },
  });
  const categoryOptions = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL_LOCAL}/category/list`
      );

      setCategories(response.data.body.data);
      console.log("asdhhhhhjudash", response.data.body.data);
    } catch (error) {
      console.log(error);
    }
  };
  const arrayOfTime = ["09", "10", "11", "12"];
  // console.log(categories);
  return (
    <div>
      <Sidebar />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Add Restaurant</h3>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label>Restaurant Name:</Form.Label>
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
              <Form.Label>City:</Form.Label>
              <Form.Control
                placeholder="City"
                value={formik.values.city}
                onChange={formik.handleChange}
                name="city"
              />
              {formik.errors.city && formik.touched.city && (
                <div style={{ color: "red" }} className="validation">
                  {formik.errors.city}
                </div>
              )}
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label>Address:</Form.Label>
              <Form.Control
                placeholder="Address"
                value={formik.values.address}
                onChange={formik.handleChange}
                name="address"
              />
              {formik.errors.address && formik.touched.address && (
                <div style={{ color: "red" }} className="validation">
                  {formik.errors.address}
                </div>
              )}
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label>Pincode:</Form.Label>
              <Form.Control
                value={formik.values.pincode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="pincode"
                placeholder="Pincode"
              />

              {formik.errors.pincode && formik.touched.pincode && (
                <div style={{ color: "red" }} className="validation">
                  {formik.errors.pincode}
                </div>
              )}
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label>Open Time:</Form.Label>
              <Form.Select
                value={formik.values.openTime}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="openTime"
              >
                <option value={""} disabled>
                  Select
                </option>
                {arrayOfTime.map((item) => {
                  return (
                    <>
                      <option value={`${item} AM`}>{`${item} AM`}</option>
                    </>
                  );
                })}
              </Form.Select>
              {formik.errors.openTime && formik.touched.openTime && (
                <div style={{ color: "red" }} className="validation">
                  {formik.errors.openTime}
                </div>
              )}
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label>Close Time:</Form.Label>
              <Form.Select
                value={formik.values.closeTime}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="closeTime"
              >
                <option value={""} disabled>
                  Select
                </option>
                {arrayOfTime.map((item) => {
                  return (
                    <>
                      <option value={`${item} PM`}>{`${item} PM`}</option>
                    </>
                  );
                })}
              </Form.Select>
              {formik.errors.closeTime && formik.touched.closeTime && (
                <div style={{ color: "red" }} className="validation">
                  {formik.errors.closeTime}
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
