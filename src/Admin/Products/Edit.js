import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ProductSchema, UserAddSchema } from "../../validations";
import Sidebar from "../../common/Sidebar";
import StringArrayInput from "../../Custom/StringArrayInput";
export default function Edit() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [enteredHashTags, setEnteredHashTags] = useState([""]);
  const [enteredColors, setEnteredColors] = useState([""]);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    categoryOptions();
  }, []);
  const location = useLocation();
console.log("location",location);
  const [files, setFiles] = useState([]);

  const [state, setState] = useState({
    product_name: location.state.product_name,
    images: [],
    colors: enteredColors,
    tags: enteredHashTags,
    price: location.state.price,
    category: location.state.category.category_name,
    _id:location.state._id
  });

  const changeHandler = (e) => {
    const file = Array.from(e.target.files);

    setFiles([...files, ...file]);
  };

 

  const handleCreateProduct = async (data) => {
    try {
      const formData = new FormData();
      formData.append("folder", "products");

      files.forEach((file) => {
        formData.append("images", file);
      });

      const uploadImages = await axios.post(
        `${process.env.REACT_APP_API_URL_LOCAL}/multiple`,
        formData
      );
      if (uploadImages.status === 200) {
        const filenames = uploadImages?.data?.body?.filenames;
      

        const payload = {
          ...data,
          images: filenames,
          is_image_uploaded: 1,
        };

        const addProduct = await axios.post(
          `${process.env.REACT_APP_API_URL_LOCAL}/product/addEdit`,
          payload
        );

        if (addProduct.status === 200) {
          toast.success("Product added");
        }

        navigate("/products");
      }
      // if (uploadIamge.status == 200) {
      //   let payload = {
      //     ...data,
      //     images: uploadIamge?.data?.body?.filenames,
      //     is_image_uploaded: 1,
      //   };

      //   console.log("asdkjgasyudgnjsbdyusdg", payload);
      //   try {
      //     const addProduct = await axios.post(
      //       `${process.env.REACT_APP_API_URL_LOCAL}/product/addEdit`,
      //       payload
      //     );
      //     if (addProduct.status == 200) {
      //       toast.success("Product added");
      //     }
      //     navigate("/products");
      //     console.log("values==>", addProduct);
      //   } catch (error) {
      //     if (error.response.status) {
      //       toast.error(error.response.data.message);
      //     }
      //     console.log(error);
      //   }
      // }
      // console.log(uploadIamge);
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: state,
    validationSchema: ProductSchema,
    onSubmit: async (values) => {
      let data = { ...values, tags: enteredHashTags, colors: enteredColors };
      console.log(data);
      await handleCreateProduct(data);
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

  console.log(formik.errors);
  return (
    <div>
      <Sidebar />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Edit Product</h3>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label>Product Name:</Form.Label>
              <Form.Control
                placeholder="Name"
                value={formik.values.product_name}
                onChange={formik.handleChange}
                name="product_name"
              />
              {formik.errors.product_name && formik.touched.product_name && (
                <div style={{ color: "red" }}>{formik.errors.product_name}</div>
              )}
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label>Image:</Form.Label>
              <Form.Control
                placeholder="Image"
                value={formik.values.images}
                type="file"
                // accept=".png, .jpg, .jpeg"
                onChange={(e) => {
                  formik.handleChange(e);
                  changeHandler(e);
                }}
                name="images"
                multiple
              />
              {formik.errors.images && formik.touched.images && (
                <div style={{ color: "red" }}>{formik.errors.images}</div>
              )}
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label>Colors:</Form.Label>
              <StringArrayInput
                values={enteredColors}
                onChange={setEnteredColors}
                placeholder={"Enter Color"}
              />

              {formik.errors.colors && formik.touched.colors && (
                <div style={{ color: "red" }}>{formik.errors.colors}</div>
              )}
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label>Tags:</Form.Label>

              <StringArrayInput
                values={enteredHashTags}
                onChange={setEnteredHashTags}
                placeholder={"Enter Tags"}
              />
              {formik.errors.tags && formik.touched.tags && (
                <div style={{ color: "red" }}>{formik.errors.tags}</div>
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
                <div style={{ color: "red" }}>{formik.errors.price}</div>
              )}
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label>Category Name:</Form.Label>
              <Form.Select
                value={formik.values.category}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="category"
              >
                <option value="" disabled>Select</option>

                {categories &&
                  categories?.map((item) => {
                    return (
                      <>
                        <option value={item._id}>{item?.category_name}</option>
                      </>
                    );
                  })}
              </Form.Select>
              {formik.errors.category && formik.touched.category && (
                <div style={{ color: "red" }}>{formik.errors.category}</div>
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
