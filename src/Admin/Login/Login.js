import React, { useState } from 'react';
import { Button, Container, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import { LockFill } from 'react-bootstrap-icons';
 
// import "./login.css";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { LoginSchema } from "../../validations";
import LoadingButton from "../../common/LoadingButton";
export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (valuse) => {
      try {
        setIsLoading(true);
        const loginRes = await axios.post(
          `${process.env.REACT_APP_API_URL_LOCAL}/login`,
          valuse
        );
        console.log(loginRes);
        if (loginRes.status == 200) {
          setIsLoading(true)
          toast.success(loginRes.data.message);
          navigate("/");
          localStorage.setItem("token", loginRes.data.body.token);
        }else{
          setIsLoading(false)
          // toast.error("")
        }
      } catch (error) {
        setIsLoading(false)
        toast.error(error.response.data.message);
      }
    },
  });

  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <div className="text-center">
          <LockFill size={64} color="black" />
          <h1 className="mt-3">Sign in</h1>
        </div>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup className="mb-3">
            <FormLabel>Email Address</FormLabel>
            <FormControl type="email"  value={formik.values.email}
                onChange={formik.handleChange}
                name="email"  required autoComplete="email" />
          </FormGroup>
          <FormGroup className="mb-3">
            <FormLabel>Password</FormLabel>
            <FormControl type="password" value={formik.values.password}
                onChange={formik.handleChange}
                name="password" required autoComplete="current-password" />
          </FormGroup>
          <FormGroup className="mb-3">
            <Form.Check type="checkbox" id="remember" label="Remember me" />
          </FormGroup>
          <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                {isLoading ? <LoadingButton /> : "Sign in"}
              </button>
            </div>
        </Form>
       
        <div className="text-center mt-3">
          <a href="#">Forgot password?</a>
        </div>
        
      </div>
    </Container>
  );
}















// import React, { useState } from "react";
// import "./login.css";
// import { useFormik } from "formik";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import { LoginSchema } from "../../validations";
// import LoadingButton from "../../common/LoadingButton";
// export default function Login() {
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();
//   const formik = useFormik({
//     initialValues: {
//       email: "",
//       password: "",
//     },
//     validationSchema: LoginSchema,
//     onSubmit: async (valuse) => {
//       try {
//         setIsLoading(true);
//         const loginRes = await axios.post(
//           `${process.env.REACT_APP_API_URL_LOCAL}/login`,
//           valuse
//         );
//         console.log(loginRes);
//         if (loginRes.status == 200) {
//           setIsLoading(true)
//           toast.success(loginRes.data.message);
//           navigate("/");
//           localStorage.setItem("token", loginRes.data.body.token);
//         }else{
//           setIsLoading(false)
//           // toast.error("")
//         }
//       } catch (error) {
//         setIsLoading(false)
//         toast.error(error.response.data.message);
//       }
//     },
//   });

//   return (
//     <>
//       <div className="Auth-form-container">
//         <form className="Auth-form" onSubmit={formik.handleSubmit}>
//           <div className="Auth-form-content">
//             <h3 className="Auth-form-title">Sign In</h3>
//             <div className="form-group mt-3">
//               <label>Email address</label>
//               <input
//                 type="email"
//                 className="form-control mt-1"
//                 placeholder="Enter email"
//                 value={formik.values.email}
//                 onChange={formik.handleChange}
//                 name="email"
//               />
//             </div>
//             <div className="form-group mt-3">
//               <label>Password</label>
//               <input
//                 type="password"
//                 className="form-control mt-1"
//                 placeholder="Enter password"
//                 value={formik.values.password}
//                 onChange={formik.handleChange}
//                 name="password"
//               />
//             </div>
//             <div className="d-grid gap-2 mt-3">
//               <button type="submit" className="btn btn-primary">
//                 {isLoading ? <LoadingButton /> : "Login"}
//               </button>
//             </div>
//             <p className="forgot-password text-right mt-2">
//               Forgot <a href="#">password?</a>
//             </p>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// }
