import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CategorySchema, UserAddSchema } from "../../validations";
import Sidebar from "../../common/Sidebar";
export default function Edit() {
  const navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);
  const location = useLocation();

  const [file, setFile] = useState(null);
  const [state, setState] = useState({
    category_name: null,
    image: "",
    _id: null,
  });

  useEffect(() => {
    if (
      location &&
      location.state &&
      Object.entries(location.state).length > 0
    ) {
      console.log("location", location);
      setState({
        category_name: location.state.category_name,
        image: null,
        _id: location.state._id,
      });
    }
  }, [location]);
  console.log("=====>", state);
  const changeHandler = (e) => {
    const file = e.target.files[0];

    setFile(file);
  };
  const handleCreateCategory = async (data) => {
    try {
      const formData = new FormData();
      formData.append("folder", "category");

      formData.append("image", file);

      const uploadIamge = await axios.post(
        `${process.env.REACT_APP_API_URL_LOCAL}/uploadImage`,
        formData
      );
      if (uploadIamge.status == 200) {
        let payload = {
          ...data,
          image: uploadIamge?.data?.body?.filename,
          is_image_uploaded: 1,
          _id: location.state._id,
        };
        console.log("payload", payload);

        try {
          const editUser = await axios.post(
            `${process.env.REACT_APP_API_URL_LOCAL}/category/addEdit`,
            payload
          );
          if (editUser.status == 200) {
            toast.success(editUser.data.message);
          }
          navigate("/category");
          console.log("values==>", editUser);
        } catch (error) {
          if (error.response.status) {
            toast.error(error.response.data.message);
          }
          console.log(error);
        }
      }
      console.log(uploadIamge);
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      category_name: state.category_name,
      image: state.image,
    },
    validationSchema: CategorySchema,
    onSubmit: async (values) => {
      console.log(values);
      await handleCreateCategory(values);
    },
  });

  return (
    <div>
      <Sidebar />

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Edit Category</h3>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label>Category Name:</Form.Label>
              <Form.Control
                placeholder="Name"
                value={formik.values.category_name}
                onChange={formik.handleChange}
                name="category_name"
              />
              {formik.errors.category_name && formik.touched.category_name && (
                <div>{formik.errors.category_name}</div>
              )}
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label>Image:</Form.Label>
              <Form.Control
                placeholder="Image"
                value={formik.values.image || ""}
                type="file"
                accept=".png, .jpg, .jpeg"
                onChange={(e) => {
                  formik.handleChange(e);
                  changeHandler(e);
                }}
                name="image"
                multiple
              />
              {formik.errors.image && formik.touched.image && (
                <div>{formik.errors.image}</div>
              )}
            </Form.Group>
          </div>
          <div className="col-md-4">
            <Button variant="secondary" type="submit">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
