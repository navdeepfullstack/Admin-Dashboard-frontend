import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserAddSchema, VendorSchema } from "../../validations";
import Sidebar from "../../common/Sidebar";
export default function Edit() {
  const navigate = useNavigate()
  useEffect(()=>{
    let token = localStorage.getItem('token')
    if(!token){
        navigate('/login')
    }

},[])
  const location = useLocation();
  
  const [file, setFile] = useState(null);
  const [state, setState] = useState({
    vendor_name: null,
    image: "",
    _id:null
  });

  useEffect(() => {
    if (
      location &&
      location.state &&
      Object.entries(location.state).length > 0
    ) {
      console.log("location", location);
      setState({
        vendor_name: location.state.vendor_name,
        image:null,
        _id:location.state._id
      });
      
    }
  }, [location]);
console.log("=====>",state);
  const changeHandler = (e) => {
    const file = e.target.files[0];

    setFile(file);
  };
  const handleCreateVendor = async (data) => {
    try {
      const formData = new FormData();
      formData.append("folder", "vendors");

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
          _id:location.state._id
           
        };
        console.log("payload",payload);
       
        try {
          const editVendor = await axios.post(
            `${process.env.REACT_APP_API_URL_LOCAL}/vendor/addEdit`,
            payload
          );
          if (editVendor.status == 200) {
            toast.success(editVendor.data.message);
          }
          navigate("/vendors");
          console.log("values==>", editVendor);
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
      vendor_name:state.vendor_name,
      image:state.image
    },
    validationSchema: VendorSchema,
    onSubmit: async (values) => {
      console.log(values);
      await handleCreateVendor(values);
      
    },
  });

  return (
    <div>
       <Sidebar />
      Edit  Category
      <form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Vendor Name:</Form.Label>
          <Form.Control
            placeholder="Name"
            value={  formik.values.vendor_name}
            onChange={formik.handleChange}
            name="vendor_name"
          />
          {formik.errors.vendor_name && formik.touched.vendor_name && (
            <div>{formik.errors.vendor_name}</div>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image:</Form.Label>
          <Form.Control
            placeholder="Image"
            value={formik.values.image||"" }
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

        <Button variant="secondary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}
