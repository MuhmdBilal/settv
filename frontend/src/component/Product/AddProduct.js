import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { BACKEND_URI } from "../../config"
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import { useNavigate} from "react-router-dom"
import {productsFetch} from "../../slices/productsSlice"
function AddProduct() {
    const [title, setTitle] = useState('')
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('');
    const [error, serError] = useState(false)
    const [load, setLoad] = useState(false);
    const Navigate = useNavigate()
    const handleChange = (e) => {
        let filess = e.target.files[0]
        console.log(filess);
        setImage(filess)
    }
    const handleProduct = async () => {
        try {
            if (!image || !title || !price || !description) {
                serError(true)
                return false
            }
            setLoad(true)
            const formData = new FormData();
            formData.append('image', image);
            await fetch(`${BACKEND_URI}/api/v1/product/upload`, {
                method: 'POST',
                body: formData,
            }).then((res) => {
                console.log(res);
            })
            await axios.post(`${BACKEND_URI}/api/v1/product`, {
                title,
                price,
                description
            }).then((res) => {
                console.log("res", res);
                setLoad(false)
                toast.success("Product entered successfully")
                Navigate('/sidebar/product')
                productsFetch()

            })

        } catch (e) {
            console.log("e", e);
            toast.error("May be Server Error! Please Refresh Page")
            setLoad(false)
        }
    }
    return (
        <Container>
            <Row className='d-flex justify-content-center'>
                <Col xs="12" lg="12" className='mt-4'>
                    <h3 className='product-text'>Product info</h3>
                </Col>
                <Col xs="11" lg="8">
                    <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
                        <Form.Label className='label-text'>Title</Form.Label>
                        <Form.Control type="text" className={error && !title ? "mt-3 border-red" : "input-color mt-3"} placeholder='Title...' value={title} onChange={(e) => setTitle(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
                        <Form.Label className='label-text'>Image</Form.Label>
                        <Form.Control type="file" className={error && !image ? "mt-3 border-red" : "input-color mt-3"} accept="image/gif, image/jpeg, image/png" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
                        <Form.Label className='label-text'>Price</Form.Label>
                        <Form.Control type="number" min={1} className={error && !price ? "mt-3 border-red" : "input-color mt-3"} placeholder='Price...' value={price} onChange={(e) => setPrice(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
                        <Form.Label className='label-text'>Description</Form.Label>
                        <Form.Control type="text" className={error && !description ? "mt-3 border-red" : "input-color mt-3"} placeholder='Description...' value={description} onChange={(e) => setDescription(e.target.value)} />
                    </Form.Group>
                    <div className='d-flex justify-content-center'>
                        <Col xs="12" lg="2" >
                            <div className="d-grid gap-2 text-center" onClick={handleProduct}>
                                <Button variant='success'>
                                    {load === true ? (
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
                        <Col xs="12" lg="2" className='ms-md-3'>
                            <div className="d-grid gap-2 text-center" >
                                <Button variant='secondary' onClick={()=> Navigate('/sidebar/product')}>
                                    Cancle
                                </Button>
                            </div>
                        </Col>
                    </div>
                </Col>
            </Row>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </Container>
    )
}

export default AddProduct