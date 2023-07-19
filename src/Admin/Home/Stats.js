import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { toast } from "react-toastify";
import axios from "axios";
const Stats = () => {
  // const data = [
  //  ,
  //   {
  //     name: "Category",
  //     number: 5,

  //     icon: "fa fa-user-circle-o text-white",
  //   },
  //   {
  //     name: "Projects",
  //     number: 20,
  //     icon: "fa fa-user-circle-o text-white",
  //   },
  //   {
  //     name: "Vendors",
  //     number: 3,
  //     icon: "fa fa-user-circle-o text-white",
  //   },
  // ];
  const [data,setData]= useState([])
  useEffect(()=>{
    cardCounts()
  },[])
  const cardCounts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL_LOCAL}/dashboard`
      );
      // console.log(response.data.body);
      setData(response.data.body)
    } catch (error) {
      toast.error("error.response.data.message");
    }
  };
  console.log(data);

  return (
    <>
       {data && data.map((item,i) => {
         return (
           <>
          <div className="col-md-3"  key={i}>
            <div className="stats_list  mb-3">
              <div className="stat_box white_box position-relative">
                <Link to="/">
                  <span className="d-inline-flex justify-content-center align-items-center">
                    <i className="fa fa-user-circle-o text-white"></i>
                  </span>
                  <h5 className="mb-1">{item.number}</h5>
                  <p className="mb-0">{item.name}</p>
                  {/* <i className="fa fa-caret-up stats_arrow"></i> */}
                </Link>
              </div>
     </div>
            </div>
          </>
        );
      })}
    </>
  );
};
export default Stats;
