import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../common/Sidebar";
import { Button, Table, ToggleButton, Placeholder } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { Toggle } from "rsuite";
import { HashLoader } from "react-spinners";
const Products = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL_LOCAL}/product/list`
      );
      console.log(response.data.body.data);
      setTimeout(() => {
        setData(response.data.body.data);
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteMe = async (id) => {
    try {
      const deleteUser = await axios.delete(
        `${process.env.REACT_APP_API_URL_LOCAL}/product/delete/${id}`
      );

      getData();
      if (deleteUser.status == 200) {
        toast.success("product deleted");
      }
    } catch (error) {
      if (error.response.status) {
        toast.error("Something went wrong");
      }
    }
  };
  const navigateToAddPage = () => {
    navigate("/product/Add");
  };
  const navigateToEdit = (item) => {
    navigate("/product/edit", { state: item });
  };
  const updateFeature = async (id, bool) => {
    // let token = checkLoginToken()
    let payload = {
      product_id: id,
      is_featured: bool,
    };
    // setToggle(!toggle)
    const res = await axios.put(
      `${process.env.REACT_APP_API_URL_LOCAL}/product/feature`,
      payload
      //    { headers: { "Authorization": `${token}` } }
    );
    console.log("hjgdhgfdf", res);
    getData();
  };
  return (
    <>
      <Sidebar />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Products</h3>
        <Button
          className="btn btn-primery px-4 py-2"
          onClick={navigateToAddPage}
        >
          Add
        </Button>
      </div>
      <div>
        {!data.length > 0 ? (
          //         <div style={{ height: "100vh",width:"100vw", background: '#d9d9d9' }}>

          //   {/* <Placeholder.Paragraph rows={10} /> */}
          //   <h1>

          //   <Loader inverse center content="Please wait..." />
          //   </h1>
          // </div>
          <div className="spinner">
            <HashLoader color="#757575" size={75} loading={true} />
          </div>
        ) : (
          <>
            <div className="table-reponisve">
              <Table striped>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Images</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Featured</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.map((item, i) => {
                      return (
                        <tr>
                          <td>{i + 1}</td>
                          <td>
                            {item &&
                              item.images.map((ele) => {
                                console.log("hadgsyuadyu", ele);
                                return (
                                  <>
                                    <img
                                      src={`http://localhost:3020/uploads/products/${ele}`}
                                      alt="image"
                                      height="80px"
                                    />
                                  </>
                                );
                              })}
                          </td>
                          <td>{item.product_name}</td>
                          <td>{item.price}</td>

                          <td>
                            {item?.category?.category_name
                              ? item?.category?.category_name
                              : ""}
                          </td>

                          <td>
                            <div
                              style={{
                                display: "block",
                                width: 50,
                                paddingLeft: 30,
                              }}
                            >
                              {" "}
                              <Toggle
                                onChange={(value) => {
                                  updateFeature(item._id, !item.is_featured);
                                }}
                                defaultChecked={item.is_featured}
                              />
                            </div>
                          </td>

                          <td>
                            <button
                              className="btn action_btn"
                              onClick={() => navigateToEdit(item)}
                            >
                              <i class="fa fa-edit"></i>
                            </button>
                            <button
                              className="btn action_btn"
                              onClick={() => deleteMe(item._id)}
                            >
                              <i class="fa fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default Products;
