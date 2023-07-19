import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "../../common/Sidebar";
import { HashLoader } from "react-spinners";
const Category = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);
  useEffect(() => {
    callApi();
  }, []);
  const callApi = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL_LOCAL}/category/list`
      );
      setTimeout(() => {
        setData(response.data.body.data);
      }, 1500);
      console.log(response.data.body.data);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteMe = async (id) => {
    try {
      // console.log(id);
      // return
      const deleteCategory = await axios.delete(
        `${process.env.REACT_APP_API_URL_LOCAL}/category/delete/${id}`
      );

      callApi();
      if (deleteCategory.status == 200) {
        toast.success("Category deleted");
      }
    } catch (error) {
      if (error.response.status) {
        toast.error("Something went wrong");
      }
    }
  };
  const navigateToAddPage = () => {
    navigate("/category/Add");
  };
  const handlEdit = (item) => {
    console.log(item);
    navigate("/category/edit", { state: item });
  };
  return (
    <>
      <Sidebar />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Categories</h3>
        <Button
          className="btn btn-primery px-4 py-2"
          onClick={navigateToAddPage}
        >
          Add
        </Button>
      </div>
      {!data.length > 0 ? (
        <div className="spinner">
          <HashLoader color="#757575" size={75} loading={true} />
        </div>
      ) : (
        <div className="table-reponisve">
          <Table striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Image</th>

                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((item, i) => {
                  return (
                    <tr key={item._id}>
                      <td>{i + 1}</td>
                      <td>{item.category_name}</td>
                      <td>
                        <img
                          src={`http://localhost:3020/uploads/category/${item.image}`}
                          alt="image"
                          height="80px"
                        />
                      </td>

                      <td>
                        <button
                          className="btn action_btn"
                          onClick={() => handlEdit(item)}
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
      )}
    </>
  );
};
export default Category;
