import { Chart } from "react-google-charts";
import { Link } from 'react-router-dom';
const Graph = () => {

    const data = [
        ["Year", "Sales"],
        ["Jan", 100],
        ["Feb", 300],
        ["Mar", 700],
        ["Apr", 730],
    ];
    const options = {
        hAxis: { title: "", titleTextStyle: { color: "#333" } },
        vAxis: { gridlines: { count: 0 } },
        chartArea: { width: "100%", height: "70%" },
        legend: { position: 'none' }
    };
    return (
        <>
            <div className="white_box">
                <p className="text-center mb-2">Views</p>
                <h3 className="text-center">12.432.1123</h3>
                <Chart
                    chartType="AreaChart"
                    width="100%"
                    height="250px"
                    data={data}
                    options={options}
                />
                <div className="view_dashboard position-relative">
                    <Link to="/">
                        <span className="view_dashbard_icon d-inline-flex justify-content-center align-items-center">
                            <img src={require('../../assets/images/dashboard_icon.svg').default} alt="img" />
                        </span>
                        <p className="mb-0">View Dashboard</p>
                        <i className="fa fa-angle-right"></i>
                    </Link>
                </div>
            </div>
        </>
    )
}
export default Graph