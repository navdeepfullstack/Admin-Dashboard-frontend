import * as Yup from "yup";
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export const UserAddSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  phone: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    // .matche(phoneRegExp,'Phone number is not valid')
    
    .required("Required"),
  country: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(4, "Too Short!")
    .max(10, "Too Long!")
    .required("Required"),

  email: Yup.string().email("Invalid email").required("Required"),
});
export const UserEditSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  phone: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    // .matche(phoneRegExp,'Phone number is not valid')
    
    .required("Required"),
  country: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
 

  email: Yup.string().email("Invalid email").required("Required"),
});



export const CategorySchema = Yup.object().shape({
  category_name: Yup.string().required("Required"),
  image: Yup.string().required("Required"),
});
export const VendorSchema = Yup.object().shape({
  vendor_name: Yup.string().required("Required"),
  image: Yup.string().required("Required"),
});
export const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});
export const ProductSchema = Yup.object().shape({
  product_name: Yup.string().required("Product name is required"),
  // images: Yup.array()
  //   .min(1, "At least one image is required")
  //   .required("Images are required"),
  colors: Yup.array()
    .min(1, "At least one color is required")
    .required("Colors are required"),
  tags: Yup.array()
    .min(1, "At least one tag is required")
    .required("Tags are required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .required("Price is required"),
  category: Yup.string().required("Category is required"),
  // _id: Yup.string().required("_id is required"),
});
