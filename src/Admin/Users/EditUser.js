import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserAddSchema, UserEditSchema } from "../../validations";
import Sidebar from "../../common/Sidebar";
export default function EditUser() {
  const navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);
  const location = useLocation();
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    country: "",
    phone: "",
  });
  useEffect(() => {
    if (
      location &&
      location.state &&
      Object.entries(location.state).length > 0
    ) {
      setState({
        name: location.state.name,
        email: location.state.email,
        password: "",
        country: location.state.country,
        phone: location.state.phone,
        _id: location.state._id,
      });
    }
  }, []);

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: state.name,
      email: state.email,
      // password: "",
      country: state.country,
      phone: state.phone,
      _id: state._id,
    },
    validationSchema: UserEditSchema,
    onSubmit: async (values) => {
      console.log(values);

      try {
        const editUser = await axios.put(
          `${process.env.REACT_APP_API_URL_LOCAL}/users/editUser`,
          values
        );
        if (editUser.status == 200) {
          toast.success(editUser.data.message);
        }
        navigate("/users");
        console.log("values==>", editUser);
      } catch (error) {
        if (error.response.status) {
          toast.error(error.response.data.message);
        }
        console.log(error);
      }
    },
  });
  console.log(formik.errors);
  return (
    <div>
      <Sidebar />
      <h3>Edit User</h3>
      <Form onSubmit={formik.handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                placeholder="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                name="name"
              />
              {formik.errors.name && formik.touched.name && (
                <div style={{ color: "red" }}>{formik.errors.name}</div>
              )}
            </Form.Group>
          </div>

          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                name="email"
              />
              {formik.errors.email && formik.touched.email && (
                <div style={{ color: "red" }}>{formik.errors.email}</div>
              )}
            </Form.Group>
          </div>
          {/* <Form.Group className="mb-3">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            placeholder="Password"
            value={formik.values.password}
            type="password"
            onChange={formik.handleChange}
            name="password"
          />
          {formik.errors.name && formik.touched.name && (
            <div>{formik.errors.name}</div>
          )}
        </Form.Group> */}
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label>Phone:</Form.Label>
              <Form.Control
                placeholder="Phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                name="phone"
              />
              {formik.errors.name && formik.touched.name && (
                <div style={{ color: "red" }}>{formik.errors.name}</div>
              )}
            </Form.Group>
          </div>

          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label>Country:</Form.Label>
              <Form.Select
                name="country"
                value={formik.values.country}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">select</option>
                <option value="India">India</option>
                <option value="UK">UK</option>
                <option value="USA">USA</option>
                <option value="China">China</option>
              </Form.Select>
              {formik.errors.country && formik.touched.country && (
                <div style={{ color: "red" }}>{formik.errors.country}</div>
              )}
            </Form.Group>
          </div>

          <div className="col-md-12 mt-3">
            
              <Button variant="secondary" className="px-4" type="submit">
                Submit
              </Button>
          
          </div>
        </div>
      </Form>
    </div>
  );
}
