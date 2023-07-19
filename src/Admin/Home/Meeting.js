import { Link } from "react-router-dom";
import Usercard from "./Meeting/Usercard";
import img from "../../assets/images/user.jpeg"
const Meeting = () => {
    const arr = [1, 2, 3]
    return (
        <>
            <h3 className='mb-3 mt-4 pt-2'>Meeting</h3>
            {
                arr.map((i) => {
                    return (
                        <>
                            <Usercard name={"Project " + i} time={"8:00 - 9:00"} img={img} />
                        </>
                    )
                })
            }
                <div className="stats_list mb-3">
                <div className="stat_box white_box position-relative">
                    <Link to="/">
                        <span className="d-inline-block">
                            <img src={require('../../assets/images/user.jpeg')} alt="user" />
                        </span>
                        <h5 class="mb-1">
                            Emmy Anderson
                        </h5>
                        <p className="mb-0">8:00 - 11:00</p>
                        <i className="fa fa-angle-right stats_arrow"></i>
                    </Link>
                </div>
            </div>
            {/* <div className="stats_list mb-3">
                <div className="stat_box white_box position-relative">
                    <Link to="/">
                        <span className="d-inline-block">
                            <img src={require('../../assets/images/user.jpeg')} alt="user" />
                        </span>
                        <h5 class="mb-1">
                            Emmy Anderson
                        </h5>
                        <p className="mb-0">8:00 - 11:00</p>
                        <i className="fa fa-angle-right stats_arrow"></i>
                    </Link>
                </div>
            </div>
            <div className="stats_list mb-3">
                <div className="stat_box white_box position-relative">
                    <Link to="/">
                        <span className="d-inline-block">
                            <img src={require('../../assets/images/user.jpeg')} alt="user" />
                        </span>
                        <h5 class="mb-1">
                            Emmy Anderson
                        </h5>
                        <p className="mb-0">8:00 - 11:00</p>
                        <i className="fa fa-angle-right stats_arrow"></i>
                    </Link>
                </div>
            </div>
            <div className="stats_list mb-3">
                <div className="stat_box white_box position-relative">
                    <Link to="/">
                        <span className="d-inline-block">
                            <img src={require('../../assets/images/user.jpeg')} alt="user" />
                        </span>
                        <h5 class="mb-1">
                            Emmy Anderson
                        </h5>
                        <p className="mb-0">8:00 - 11:00</p>
                        <i className="fa fa-angle-right stats_arrow"></i>
                    </Link>
                </div>
            </div> */}
            <div className="stats_list mb-3">
                <div className="stat_box text-center white_box position-relative px-0">
                    <Link to="/">
                        <i className="fa fa-plus"></i>
                    </Link>
                </div>
            </div>

        </>
    )
}
export default Meeting;