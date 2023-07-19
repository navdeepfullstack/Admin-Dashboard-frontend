import React, { useEffect, useState } from "react";
import Sidebar from "../../common/Sidebar";
import { HashLoader } from "react-spinners";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const restaurants = [
  {
    name: "Dhaba",
    location: "Mohali Sector 67",
    openTime: "10:00 AM",
    closeTime: "10:00 PM",
    vegOrNonVeg: false,
  },
  {
    name: "Cafe Delight",
    location: "Chandigarh Sector 22",
    openTime: "8:00 AM",
    closeTime: "11:00 PM",
    vegOrNonVeg: true,
  },
  {
    name: "Spice Junction",
    location: "Panchkula Sector 5",
    openTime: "11:30 AM",
    closeTime: "11:00 PM",
    vegOrNonVeg: true,
  },
  {
    name: "Punjabi Tadka",
    location: "Zirakpur",
    openTime: "12:00 PM",
    closeTime: "10:30 PM",
    vegOrNonVeg: true,
  },
  {
    name: "Italiano's Pizza",
    location: "Chandigarh Sector 35",
    openTime: "11:00 AM",
    closeTime: "10:00 PM",
    vegOrNonVeg: true,
  },
  {
    name: "Barbeque Nation",
    location: "Chandigarh Sector 26",
    openTime: "12:30 PM",
    closeTime: "3:30 PM",
    vegOrNonVeg: true,
  },
  {
    name: "Chinese Wok",
    location: "Chandigarh Sector 8",
    openTime: "1:00 PM",
    closeTime: "11:30 PM",
    vegOrNonVeg: true,
  },
  {
    name: "Sarson da Saag",
    location: "Chandigarh Sector 15",
    openTime: "11:30 AM",
    closeTime: "10:00 PM",
    vegOrNonVeg: true,
  },
  {
    name: "Mughlai Kitchen",
    location: "Mohali Phase 3B2",
    openTime: "11:00 AM",
    closeTime: "11:00 PM",
    vegOrNonVeg: false,
  },
  {
    name: "Thai Express",
    location: "Chandigarh Sector 9",
    openTime: "12:00 PM",
    closeTime: "10:30 PM",
    vegOrNonVeg: true,
  },
];

// console.log(restaurants.length);  // Output: 10

export default function Restaurants() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    getData();
  }, []);


  const getData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL_LOCAL}/restaurant/list`
      );
      setTimeout(() => {
        setData(response?.data?.body?.data);
        console.log("dsaaaaafdsf",response.data.body.data);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };
  const navigateToAddPage = () => {
    navigate("/restaurant/Add");
  };
  const handlEdit=(item)=>{
    navigate('/restaurant/edit',{state:item})
  }
  const deleteMe=async(id)=>{
    try {
      const deleteUser = await axios.delete(
        `${process.env.REACT_APP_API_URL_LOCAL}/restaurant/delete/${id}`
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
  }
  return (
    <div>
      <div className="back_btn" onClick={() => navigate(-1)}>
        <img src={require("../../assets/images/back.png")} />
      </div>
      <Sidebar />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Restaurants</h1>
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
                {/* <th>Location</th> */}
                <th>City</th>
                <th>Address</th>
                <th>Details</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data  &&
                data?.map((item, i) => {
                  // console.log(item);
                  return (
                    <tr key={item._id}>
                      <td>{i + 1}</td>

                      <td>{item.name}</td>
                      <td>{item.city}</td>
                      <td>{item.address}</td>
                      <td><button className="btn action_btn" onClick={()=>navigate('/menu',{state:item})}>View</button></td>
                      {/* <td>{item.menu.map(ele=>ele.type)? <img src={require('../../assets/images/veg.png')} />:<img src={require('../../assets/images/non-veg.png')} />}</td> */}
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
