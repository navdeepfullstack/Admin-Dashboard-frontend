import React, { useEffect, useState } from "react";
import Sidebar from "../../common/Sidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, Table } from "react-bootstrap";
import { HashLoader } from "react-spinners";
export default function Banners() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
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
        `${process.env.REACT_APP_API_URL_LOCAL}/banner/list`
      );

      if (response.status === 200) {
        setTimeout(() => {
          setData(response.data.body.data);
          setShowLoader(false); // Hide the loader when data is received
        }, 1000);
      } else {
        setTimeout(() => {
          setIsLoading(true);
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteMe = async (id) => {
    try {
      // console.log(id);
      // return
      const deleteBanner = await axios.delete(
        `${process.env.REACT_APP_API_URL_LOCAL}/banner/delete/${id}`
      );
      callApi();
      if (deleteBanner.status == 200) {
        
        toast.success("Banner deleted");
      }
    } catch (error) {
      if (error.response.status) {
        toast.error("Something went wrong");
      }
    }
  };
  const navigateToAddPage = () => {
    navigate("/banner/Add");
  };
  const handlEdit = (item) => {
    console.log(item);
    navigate("/banner/edit", { state: item });
  };

  return (
    <div>
      <Sidebar />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Banners</h3>
        <Button
          className="btn btn-primery px-4 py-2"
          onClick={navigateToAddPage}
        >
          Add
        </Button>
      </div>
      {!data.length > 0 ? (
        <div className="spinner">
          {!isLoading && showLoader ? (  
            <HashLoader color="#757575" size={75} loading={true} />
          ) : (
            <h4>Record Not Found</h4>
          )}
        </div>
      ) : (
        <div className="table-reponisve">
          <Table striped>
            <thead>
              <tr>
                <th>#</th>

                <th>Image</th>

                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((item, i) => {
                  console.log(item.image);
                  return (
                    <tr key={item._id}>
                      <td>{i + 1}</td>

                      <td>
                        <img
                          src={`${process.env.REACT_APP_BASE_URL}/uploads/banners/${item.image}`}
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
    </div>
  );
}
