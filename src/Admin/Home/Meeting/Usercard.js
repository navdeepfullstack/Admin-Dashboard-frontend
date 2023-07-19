import { Link } from "react-router-dom";
const Usercard = (props) => {
    return (
        <>
            <div className="stats_list mb-3">
                <div className="stat_box white_box position-relative">
                    <Link to="/">
                        <span className="d-inline-block">
                            <img src={props.img} alt="user" />
                        </span>
                        <h5 class="mb-1">
                            {props.name}
                        </h5>
                        <p className="mb-0">{props.time}</p>
                        <i className="fa fa-angle-right stats_arrow"></i>
                    </Link>
                </div>
            </div>
        </>
    )
}
export default Usercard;