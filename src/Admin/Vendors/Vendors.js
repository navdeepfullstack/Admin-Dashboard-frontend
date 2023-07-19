import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../common/Sidebar";
import axios from "axios";
import { Button, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";

const Vendors = () => {
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
        `${process.env.REACT_APP_API_URL_LOCAL}/vendor/list`
      );
      setTimeout(()=>{
      
        setData(response.data.body.data);

      },1500)
      console.log(response.data.body.data);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteMe = async (id) => {
    try {
      const deleteUser = await axios.delete(
        `${process.env.REACT_APP_API_URL_LOCAL}/vendor/delete/${id}`
      );

      getData();
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
    navigate("/vendor/Add");
  };
  const navigateToEdit = (item) => {
    navigate("/vendor/edit", { state: item });
  };
  return (
    <>
      <Sidebar />
      <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Vendors</h3>
        <Button className="btn btn-primery px-4 py-2" onClick={navigateToAddPage}>
          Add
        </Button>
      </div>
      <div>
        {!data.length > 0 ? (
          <div className="spinner">
          <HashLoader color="#757575" size={75} loading={true} />
        </div>
        ) :   (
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
                          <tr>
                            <td>{i + 1}</td>
                            <td>{item.vendor_name}</td>
                            <td>
                              <img
                                src={`http://localhost:3020/uploads/vendors/${item.image}`}
                                alt="image"
                                height="80px"
                              />
                            </td>

                            <td>
                              <button
                                className=" action_btn btn"
                           
                                onClick={() => navigateToEdit(item)}
                              >
                                <i class="fa fa-edit"></i>
                              </button>
                              <button
                                className=" action_btn btn"
                           
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
      </div>
    </>
  );
};
export default Vendors;
