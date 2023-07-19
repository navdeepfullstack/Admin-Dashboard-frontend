import React, { useEffect, useState } from "react";
import Sidebar from "../../../common/Sidebar";
import { Button, Table } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { HashLoader } from "react-spinners";
import MyVerticallyCenteredModal from "../../../common/VerticallyCenteredModal";

export default function Dishes() {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);
  useEffect(() => {
    getData();
    if (location.state && location.state != null) {
      setTimeout(() => {
        // setData(location.state.menu);
        setShowLoader(false); // Hide the loader when data is received
      }, 1000);
    } else {
      setTimeout(() => {
        setIsLoading(true);
      }, 3000);
    }
    // setData(location.state.menu);
  }, []);

  console.log("location", location);
  const getData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL_LOCAL}/dish/list/${
          location.state._id  
        }`
      );
      console.log("dsaaaaafdsf", response.data.body.data);
      setTimeout(() => {
        setData(response?.data?.body?.data);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };
  const openModal = (item) => {
    setSelectedDish(item); // Set the selected dish
    setModalShow(true); // Open the modal
  };
  return (
    <div>
      <Sidebar />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Dishes List</h1>
        <Button
          className="btn btn-primery px-4 py-2"
          onClick={() => navigate("/dish/Add", { state: location.state })}
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
                <th>Name</th>
                {/* <th>Location</th> */}
                <th>Image</th>
                <th>Restaurant</th>
                <th>Price</th>
                <th>Veg</th>
                <th>Details</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data?.map((item, i) => {
                  // console.log(item);

                  return (
                    <tr key={item._id}>
                      <td>{i + 1}</td>

                      <td>{item?.name}</td>
                      <td>
                        {" "}
                        <img
                          height={"80px"}
                          src={require("../../../assets/images/paneer.jpg")}
                        />
                      </td>
                      <td>{location.state.name}</td>
                      <td>{item.price}</td>
                      <td>
                        {item.type === "veg" ? (
                          <img
                            src={require("../../../assets/images/veg.png")}
                          />
                        ) : (
                          <img
                            src={require("../../../assets/images/non-veg.png")}
                          />
                        )}
                      </td>

                      <td>
                        <button
                          className="btn action_btn"
                          onClick={() => openModal(item)}
                        >
                          View
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn action_btn"
                          onClick={() =>
                            navigate("/dish/edit", { state: item })
                          }
                        >
                          <i class="fa fa-edit"></i>
                        </button>
                        <button
                          className="btn action_btn"
                          // onClick={() => deleteMe(item._id)}
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
      {/* Modal component */}
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        data={selectedDish}
      />
    </div>
  );
}
