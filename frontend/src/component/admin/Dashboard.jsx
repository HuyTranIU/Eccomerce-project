import { Typography } from '@material-ui/core';
import {
    ArcElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title,
    Tooltip
} from 'chart.js';
import React from 'react';
import { Doughnut, Line } from 'react-chartjs-2';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import "./Dashboard.css";
import Sidebar from './Sidebar';
import { useEffect } from 'react';
import { getAdminProduct } from './../../actions/productAction';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

function Dashboard() {

    const dispatch = useDispatch()
    const { products } = useSelector(state => state.products)

    let outOfStock = 0
    products && products.forEach((item) => {
        if (item.Stock === 0) {
            outOfStock += 1
        }
    })

    useEffect(() => {
        dispatch(getAdminProduct())
    }, [dispatch])

    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
            {
                label: "TOTAL AMOUNT",
                backgroundColor: ["tomato"],
                hoverBackgroundColor: ["rgb(197,72,49)"],
                data: [0, 4000]
            }
        ]
    }

    const doughnutState = {
        labels: ["Out of Stock", "inStock"],
        datasets: [
            {
                backgroundColor: ["#00a6b4", "#6800b4"],
                hoverBackgroundColor: ["#4b5000", "#35014f"],
                data: [outOfStock, products.length - outOfStock]
            }
        ]
    }

    return (
        <>
            <div className='dashboard'>
                <Sidebar />
                <div className="dashboardContainer">
                    <Typography component='h1'>Dashboard</Typography>
                    <div className="dashboardSummary">
                        <div>
                            <p>Total Amount <br /> $2000</p>
                        </div>
                        <div className="dashboardSummaryBox2">
                            <Link to='/admin/products' >
                                <p>Products</p>
                                <p>{products && products.length}</p>
                            </Link>
                            <Link to='/admin/orders' >
                                <p>Orders</p>
                                <p>4</p>
                            </Link>
                            <Link to='/admin/users' >
                                <p>Users</p>
                                <p>2</p>
                            </Link>
                        </div>
                    </div>

                    <div className="lineChart">
                        <Line data={lineState} />
                    </div>

                    <div className="doughnutChart">
                        <Doughnut data={doughnutState} />
                    </div>

                </div>
            </div>
        </>
    )
}

export default Dashboard