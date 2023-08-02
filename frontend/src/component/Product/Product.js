import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { BACKEND_URI } from "../../config"
import  { Toaster } from 'react-hot-toast';
// import { useGetAllProductsQuery } from '../../slices/productsApi';
import { useNavigate, Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { addToCart,getTotals } from '../../slices/cartSlice';
function Product() {
    // const Navigate = useNavigate()
    const { items: products, status } = useSelector((state) => state.products);
    const dispatch = useDispatch();
    // const { statuss } = useSelector((state) => state.cart);
    // console.log("products", products.length);
    const handleProductId = async (id) => {
        try {
            dispatch(addToCart(id))
            dispatch(getTotals())
            // Navigate("/sidebar/check_out")
        } catch (e) {
            console.log("e", e);
        }
    }
    return (
        <Container>
            <Row className='mt-4 d-flex justify-content-md-end'>
                <Col xs="12" lg="2">
                    <div className="d-grid gap-2 text-center" >
                        <Link to="/sidebar/add_product">
                            <Button variant='success' >
                                Add Product
                            </Button>
                        </Link>
                    </div>
                </Col>
            </Row>
            <Row className=''>
                { status === "success" ? (
                    <>
                        {products.length > 0 ?(
                            products.map((item, index) => {
                                return (
                                    <Col xs="12" lg="3" className="mt-4" key={index}>
                                        <Card >
                                            <Card.Img variant="top" src={`${BACKEND_URI}/image/${item.image}`} alt="product_Image" />
                                            <Card.Body className='text-start'>
                                                <Card.Title className='d-flex justify-content-between'>{item.title} <span>Price: {item.price}</span></Card.Title>
                                                <Card.Text>
                                                    {item.description}
                                                </Card.Text>
                                                <div className="d-grid gap-2">
                                                    <Button variant="success" onClick={() => handleProductId(item)}>Add to Cart</Button>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )
                            })
                            
                            ) :  (
                                <div className=''>
                                No Data Found...
                                </div>
                            )
                        }
                    </>
                ) : status === "pending" ? (
                    <p>Loading...</p>
                ) : status === "rejected" ?  (
                    <>
                    No Data Found...
                    </>
                ):(
                    <div>
                    No Data Found...
                    </div>
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

export default Product













// import React, { useEffect, useState } from 'react'
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import { BACKEND_URI } from "../../config"
// import axios from "axios";
// import toast, { Toaster } from 'react-hot-toast';
// import { useGetAllProductsQuery } from '../../slices/productsApi';
// import { Link } from "react-router-dom"
// import { useDispatch, useSelector } from "react-redux";
// function Product() {

//     const [status, setStatus] = useState(false)
//     const [title, setTitle] = useState('')
//     const [image, setImage] = useState('');
//     const [price, setPrice] = useState('')
//     const [description, setDescription] = useState('');
//     const [error, serError] = useState(false)
//     const [load, setLoad] = useState(false);
//     const [getData, setGetData] = useState([])
//     const { items: products, status } = useSelector((state) => state.products);
//     const { data } = useGetAllProductsQuery()
//     console.log("products", products);
//     const [storeData, setStoreData] = useState(localStorage.getItem("cartItems")

//         ? JSON.parse(localStorage.getItem("cartItems"))
//         : [])

//     const handleChange = (e) => {
//         let filess = e.target.files[0]
//         setImage(filess)
//     }

//     const handleProduct = async () => {
//         try {
//             if (!image || !title || !price || !description) {
//                 serError(true)
//                 return false
//             }
//             setLoad(true)
//             const formData = new FormData();
//             formData.append('image', image);
//             await fetch(`${BACKEND_URI}/api/v1/product/upload`, {
//                 method: 'POST',
//                 body: formData,
//             }).then((res) => {
//                 console.log(res);
//             })
//             await axios.post(`${BACKEND_URI}/api/v1/product`, {
//                 title,
//                 price,
//                 description
//             }).then((res) => {
//                 console.log("res", res);
//                 setLoad(false)
//                 toast.success("Product entered successfully")
//                 setStatus(!status)

//             })

//         } catch (e) {
//             console.log("e", e);
//             toast.error("May be Server Error! Please Refresh Page")
//             setLoad(false)
//         }
//     }

//     const getproduct = async () => {
//         try {
//             setGetData(data.result)
//             await axios.get(`${BACKEND_URI}/api/v1/product`).then((res) => {
//                 console.log("res", res.data.result);
//                 setGetData(res.data.result)
//             })
//         } catch (e) {
//             console.log("e", e);
//         }
//     }

//     console.log("data123123", data);
//     const handleProductId = async (id) => {
//         try {
//             let array = []

//             let existingIndex = storeData.findIndex((item) =>
//                 console.log("item", item._id === id._id)

//             )
//             console.log("storeData", existingIndex);

//             if (existingIndex > 0) {
//                 toast.error("Product Add to Cart already")
//             } else {
//                 setStoreData([...storeData, id])
//             }
//         } catch (e) {
//             console.log("e", e);
//         }
//     }

//     localStorage.setItem("cartItems", JSON.stringify(storeData))


//     useEffect(() => {
//         getproduct()
//     }, [])

//     return (
//         <Container>

//             <Row className='mt-4 d-flex justify-content-md-end'>
//                 <Col xs="12" lg="2">
//                     <div className="d-grid gap-2 text-center" >
//                         <Link to="/sidebar/add_product">
//                             <Button variant='success' >
//                                 Add Product
//                             </Button>
//                         </Link>
//                     </div>
//                 </Col>
//             </Row>
//             <Row className=''>
//                 { status === "success" ? (
//                     <>
//                         {products && (
//                             products.map((item, index) => {
//                                 console.log("data", data);
//                                 return (
//                                     <Col xs="12" lg="3" className='mt-4' key={index}>
//                                         <Card >
//                                             <Card.Img variant="top" src={`${BACKEND_URI}/image/${item.image}`} alt="product_Image" />
//                                             <Card.Body className='text-start'>
//                                                 <Card.Title className='d-flex justify-content-between'>{item.title} <span>Price: {item.price}</span></Card.Title>
//                                                 <Card.Text>
//                                                     {item.description}
//                                                 </Card.Text>
//                                                 <div className="d-grid gap-2">
//                                                     <Button variant="success" onClick={() => handleProductId(item)}>Add to Cart</Button>
//                                                 </div>
//                                             </Card.Body>
//                                         </Card>
//                                     </Col>
//                                 )
//                             }))}
//                     </>
//                 ) : status === "pending" ? (
//                     <p>Loading...</p>
//                 ) : (
//                     <>
//                     </>
//                 )}

//             </Row>
//             <Toaster
//                 position="top-right"
//                 reverseOrder={false}
//             />
//         </Container>
//     )
// }

// export default Product