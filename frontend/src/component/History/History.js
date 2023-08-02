import React, { useEffect, useState } from 'react'
import DataTable, { createTheme } from 'react-data-table-component';
import { BACKEND_URI } from "../../config"
import axios from "axios"
import Spinner from 'react-bootstrap/Spinner';
function History() {
    const columns = [
        {
            name: <span style={{ fontSize: "15px", fontWeight: "600" }}>User Name</span>,
            selector: row => row.User_Name,
            sortable: true
        },
        {
            name: <span style={{ fontSize: "15px", fontWeight: "600" }}>Product Title</span>,
            selector: row => row.title,
            sortable: true
        },
        {
            name: <span style={{ fontSize: "15px", fontWeight: "600" }}>Product Description</span>,
            selector: row => row.description,
            sortable: true,
            grow: 2
        },
        {
            name: <span style={{ fontSize: "15px", fontWeight: "600" }}>Amount</span>,
            selector: row => <>$ {row.amount}</>,
            sortable: true
        },
        {
            name: <span style={{ fontSize: "15px", fontWeight: "600" }}>Transaction Id</span>,
            selector: row => row.transaction_id,
            sortable: true,
            grow: 2
        },
        {
            name: <span style={{ fontSize: "15px", fontWeight: "600" }}>Time</span>,
            selector: row => row.time,
            sortable: true,
            grow: 2
        }

    ]
    const [totalStripeData, setTotalStripeData] = useState([])
    const [loading, setLoading] = useState([])
    let getdata = JSON.parse(localStorage.getItem("setTV-User"))
    let user_id = getdata._id
    const StipeInfoGet = async () => {
        try {
            setLoading(true)
            await axios.get(`${BACKEND_URI}/api/v1/stripe/Stripe_Info`).then((response) => {
                let array = []
                response.data.forEach((element) => {
                    if (element.userId === user_id) {
                        array.push(element)
                    }
                })
                setLoading(false)
                setTotalStripeData(array)
            })
        } catch (e) {
            console.log("e", e);
        }
    }
    // console.log("totalStripeData", totalStripeData);
    useEffect(() => {
        StipeInfoGet();
    }, [])

    return (
        <div>
            <h4 className='mt-4' style={{fontSize: "20px", fontWeight: "700"}}>Order History</h4>
            <div className='mt-5'>
                {
                    loading === true ? (
                        <Spinner animation="grow" />
                    ) : (
                        <DataTable
                            columns={columns}
                            data={totalStripeData}
                            pagination
                            fixedHeader
                            fixedHeaderScrollHeight='600px'
                            highlightOnHover
                            subHeader
                            theme="solarized"
                            striped
                        // subHeaderComponent={
                        //     <input type="text" placeholder='Search Agency' className='w-25 form-control' value={searchInactive} onChange={(e) => setSearchInactive(e.target.value)} />
                        // }

                        />
                    )
                }
            </div>


        </div>
    )
}

export default History