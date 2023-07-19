import React, { useEffect } from "react";

import Stats from "./Stats";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../common/Sidebar";
import { toast } from "react-toastify";
import axios from "axios";
import Graph from "./Graph";
import Target from "./Target";
import Meeting from "./Meeting";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);
 
  return (
    <>
      <Sidebar />
      <section>
        <div className="container-fluid">
          <div className="row">
        
       
              <Stats />
              <Graph />
         
            <div className="col-md-4">
              {/* <Target /> */}
              <div className='meeting_box ' >
                                <Meeting />
                            </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Home;
