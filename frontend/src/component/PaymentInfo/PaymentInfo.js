import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "./PaymentInfo.css"
import { BACKEND_URI } from "../../config"
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';
import Spinner from 'react-bootstrap/Spinner';

function PaymentInfo() {
    const [public_Key, setPublic_Key] = useState("")
    const [private_Key, setPrivate_Key] = useState("")
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [error, setError] = useState(false)
    const [status, setStatus] = useState(false)
    let [loadingStatus, setLoadingStatus] = useState(false)
    const handlePaymentInfo = async () => {
        try {
            if (public_Key === "" || private_Key === "") {
                setError(true)
                return false
            }
            setLoading(true)
            await axios.post(`${BACKEND_URI}/api/v1/payment`, { public_Key, private_Key }).then((res) => {
                handleGetPayment()

                toast.success("Payment_Info entered successfully")
                setLoading(false)
            })
        } catch (e) {
            console.log("e", e);
            toast.error("May be Server Error! Please Refresh Page")
            setLoading(false)
        }
    }
    const handleGetPayment = async () => {
        try {
            setLoadingStatus(true)
            await axios.get(`${BACKEND_URI}/api/v1/payment`).then((response) => {
                setLoadingStatus(false)
                setData(response.data.result)
            })
        } catch (e) {
            console.log("e", e);
        }
    }
    const handlePaymentInfo_By_delete_Update = async () => {
        try {
            await axios.delete(`${BACKEND_URI}/api/v1/payment/Delete_Payment`).then(async (deleteResponse) => {
                if (deleteResponse.data.result.acknowledged === true) {
                    if (public_Key === "" || private_Key === "") {
                        setError(true)
                        return false
                    }
                    setLoading(true)
                    await axios.post(`${BACKEND_URI}/api/v1/payment`, { public_Key, private_Key }).then((res) => {
                        toast.success("Payment_Info Updated successfully")
                        setLoading(false)
                        window.location.reload(true)
                        handleGetPayment()
                    })
                }
            })

        } catch (e) {
            console.log("e", e);
        }
    }
    const statusHandle = () => {
        setStatus(!status)
        setError(false)
        setPrivate_Key('')
        setPublic_Key('')
    }

    useEffect(() => {
        handleGetPayment()
    }, [])



    return (
        <Container >
            <Row className="d-flex justify-content-center align-items-center home-height">
                {
                    loadingStatus === true ? (
                        <div>
                            <Spinner animation="grow" />
                        </div>
                    ) : (
                        <>
                            {
                                data.length ? (
                                    <>
                                        {
                                            status ? (
                                                <Col xs="11" lg="10" className=''>

                                                    <div className='mb-5'>
                                                        <h3>Payment Info</h3>
                                                    </div>
                                                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                                        <Form.Label column sm="3">
                                                            Stripe Public Key
                                                        </Form.Label>
                                                        <Col sm="8">
                                                            <Form.Control type='text' className={error && !public_Key ? "border-red" : ""} placeholder="Public Key..." value={public_Key} onChange={(e) => setPublic_Key(e.target.value)} />
                                                        </Col>
                                                    </Form.Group>
                                                    <Form.Group as={Row} className="mb-3 mt-7" controlId="formPlaintextPassword">
                                                        <Form.Label column sm="3">
                                                            Stripe Private Key
                                                        </Form.Label>
                                                        <Col sm="8">
                                                            <Form.Control type="text" placeholder="Private Key..." className={error && !private_Key ? "border-red" : ""} value={private_Key} onChange={(e) => setPrivate_Key(e.target.value)} />
                                                        </Col>
                                                    </Form.Group>
                                                    <div className='mt-4 d-flex justify-content-center'>
                                                        <Col xs="12" lg="3" >
                                                            <div className="d-grid gap-2 text-center" >
                                                                <Button variant='success' onClick={handlePaymentInfo_By_delete_Update}>
                                                                    {loading === true ? (
                                                                        <>
                                                                            <Spinner
                                                                                as="span"
                                                                                animation="grow"
                                                                                size="sm"
                                                                                role="status"
                                                                                aria-hidden="true"
                                                                            />
                                                                            Loading...
                                                                        </>
                                                                    ) : (
                                                                        <>Save</>
                                                                    )
                                                                    }

                                                                </Button>
                                                            </div>
                                                        </Col>
                                                    </div>
                                                </Col>
                                            ) : (
                                                <>
                                                    <Row className='"d-flex justify-content-center'>
                                                        <Col xs="11" lg="5" className="cardsasa">
                                                            <div className='box-success' >
                                                                <i className="checkmark">✓</i>
                                                            </div>
                                                            <h1 className='Success-h1'>Payment Info added already</h1>
                                                            <p className='Success-p'>If You Want to update Payment info <span className='click-a' onClick={statusHandle}>Click it</span></p>
                                                        </Col>
                                                    </Row>
                                                </>
                                            )}
                                    </>
                                ) : (
                                    <Col xs="11" lg="10" className=''>

                                        <div className='mb-5'>
                                            <h3>Payment Info</h3>
                                        </div>
                                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                            <Form.Label column sm="3">
                                                Stripe Public Key
                                            </Form.Label>
                                            <Col sm="8">
                                                <Form.Control type='text' className={error && !public_Key ? "border-red" : ""} placeholder="Public Key..." value={public_Key} onChange={(e) => setPublic_Key(e.target.value)} />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} className="mb-3 mt-7" controlId="formPlaintextPassword">
                                            <Form.Label column sm="3">
                                                Stripe Private Key
                                            </Form.Label>
                                            <Col sm="8">
                                                <Form.Control type="text" placeholder="Private Key..." className={error && !private_Key ? "border-red" : ""} value={private_Key} onChange={(e) => setPrivate_Key(e.target.value)} />
                                            </Col>
                                        </Form.Group>
                                        <div className='mt-4 d-flex justify-content-center'>
                                            <Col xs="12" lg="3" >
                                                <div className="d-grid gap-2 text-center" >
                                                    <Button variant='success' onClick={handlePaymentInfo}>
                                                        {loading === true ? (
                                                            <>
                                                                <Spinner
                                                                    as="span"
                                                                    animation="grow"
                                                                    size="sm"
                                                                    role="status"
                                                                    aria-hidden="true"
                                                                />
                                                                Loading...
                                                            </>
                                                        ) : (
                                                            <>Save</>
                                                        )
                                                        }

                                                    </Button>
                                                </div>
                                            </Col>
                                        </div>
                                    </Col>
                                )
                            }
                        </>
                    )
                }




            </Row>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </Container>
    )
}

export default PaymentInfo