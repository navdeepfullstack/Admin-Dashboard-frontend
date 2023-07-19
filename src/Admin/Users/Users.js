import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "../../common/Sidebar";
import { HashLoader } from "react-spinners";
const Users = () => {
  const [users, setUsers] = useState([]);
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
        `${process.env.REACT_APP_API_URL_LOCAL}/users/userList`
      );
      setTimeout(()=>{
        setUsers(response.data.body.data);

      },1500)
      console.log(response.data.body.data);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteMe = async (id) => {
    try {
      const deleteUser = await axios.delete(
        `${process.env.REACT_APP_API_URL_LOCAL}/users/delete/${id}`
      );

      callApi();
      if (deleteUser.status == 200) {
        toast.success("User deleted");
      }
    } catch (error) {
      if (error.response.status) {
        toast.error("Something went wrong");
      }
    }
  };
  const navigateToAddPage = () => {
    navigate("/users/Add");
  };
  const navigateToEdit = (item) => {
    navigate("/users/Edit", { state: item });
  };
  return (
    <>
      <Sidebar />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Users</h3>
        <Button
          className="btn btn-primery px-4 py-2"
          onClick={navigateToAddPage}
        >
          Add
        </Button>
      </div>
      {!users.length > 0 ? (
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
                <th>Email</th>
                <th>Phone</th>
                <th>Country</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((item, i) => {
                  return (
                    <tr>
                      <td>{i + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>{item.country}</td>
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
      )}
    </>
  );
};
export default Users;
