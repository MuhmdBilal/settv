import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./CheckOut.css";
import { useDispatch, useSelector } from "react-redux";
import { getTotals, removeFromCart, clearCart } from "../../slices/cartSlice"
import { BACKEND_URI } from "../../config";
import { Link } from "react-router-dom"
// import PayButton from "../PayButton/PayButton";
import StripeCheckout from 'react-stripe-checkout';
import axios from "axios";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom"
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

function CheckOut() {
    const [title,setTitle] = useState('')
    const [description,setDescripption] = useState('');
    const [price, setPrice] = useState("")
    const Navigate = useNavigate()
    let getdata = JSON.parse(localStorage.getItem("setTV-User"))
    let user_id = getdata._id
    let userName = getdata.name
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    
    // const publishableKey = 'pk_test_51N5bgTIszEkPfqkoJpAvkbjpc3zFd4gr7DJlvJt8oTRKiojI4tQIvhZplWJ2hqXX1VxQuHkuTvxt95raJv9qPz5v00Eh8HF4Oc';
    const publishableKey = "pk_live_51N4U5hIG0lKYHrAM4Ep1ABFgC3vAjpKk8f1zs7Q8BvlSQuNqKQwHcMGON5FeKEfDue5MoeVkN64Y6mBLooPEn2PL00RWeGHIy7"
    const priceForStripe = cart.cartTotalAmount * 100

    const handleRemoveFromCart = (product) => {
        dispatch(removeFromCart(product));
    };
    const handleClearCart = () => {
        dispatch(clearCart());
    };
    const handleSuccess = () => {
        MySwal.fire({
          icon: 'success',
          title: 'Payment was successful',
          time: 2000,
        }).then((result) => {

            if (result.isConfirmed) {
                Navigate("/sidebar/checkout-success")
              }
        })
        
      };
      const handleFailure = () => {
        MySwal.fire({
          icon: 'error',
          title: 'Payment was not successful',
          time: 2000,
        });
      };

      const singleDataGet = async()=>{
        try{
          cart.cartItems.forEach((element)=>{
            
            setTitle(element.title);
            setDescripption(element.description);
            setPrice(element.price)
          })
        }catch(err){
            console.log("err", err);
        }
      }
    //   console.log("cart", userName);
      const payNow = async (token)=>{
        let totalAmount = cart.cartTotalAmount
        let transactionTime = new Date().toLocaleString();
        try{
               let response = await axios.post(`${BACKEND_URI}/api/v1/stripe/create-checkout-session`,{
                amount : totalAmount * 100,
                // user_id,
                token
               })
               if (response.status === 200) {
                //    console.log(response.data.id);
                   let transaction_id = response.data.id
                   await axios.post(`${BACKEND_URI}/api/v1/stripe/Stripe_Info`,{
                    transaction_id: transaction_id,
                    amount: totalAmount,
                    title: title,
                    description: description,
                    time: transactionTime,
                    User_Name: userName,
                    userId: user_id
                   }).then((res)=>{
                    console.log(res);
                   })
                   handleSuccess();
                   
               }
        }catch(e){
            handleFailure();
            console.log("e",e);
        }
      }
 
      useEffect(()=>{
        singleDataGet()
      },[])

    useEffect(() => {
        dispatch(getTotals());
    }, [cart, dispatch]);
    return (
        <Container>
            {
                cart.cartItems.length === 0 ? (
                    <Row className="cart-empty">
                        <p>Your cart is currently empty</p>
                        <div className="start-shopping">
                            <Link to="/sidebar/product">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    fill="currentColor"
                                    className="bi bi-arrow-left"
                                    viewBox="0 0 16 16"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                                    />
                                </svg>
                                <span>Start Shopping</span>
                            </Link>
                        </div>
                    </Row>
                ) : (
                    <>
                        <Row className="justify-content-center mt-4">
                            <Col xs="12" lg="10">
                                <Row>
                                    <Col xs="12" lg="10" className="text-start d-flex">
                                        <h3 className="product-title">Product</h3>
                                    </Col>
                                    <Col xs="12" lg="2" className="justify-content-start d-flex">
                                        <h3 className="price">Price</h3>
                                    </Col>
                                </Row>
                                {
                                    cart.cartItems &&
                                    cart.cartItems.map((cartItem) => {
                                        return (
                                            <Row className="cart-item justify-content-start">
                                                <Col xs="12" lg="10" className="text-start align-items-center">
                                                    <div className="text-start d-flex align-items-center">
                                                        <img src={`${BACKEND_URI}/image/${cartItem.image}`} alt="product_image" className="product_image" />
                                                        <div className="text-start">
                                                            <h3 className="text-h3-title">{cartItem.title}</h3>
                                                            <p>{cartItem.description}</p>
                                                        </div>
                                                    </div>

                                                    <button className="btn-reomove" onClick={() => handleRemoveFromCart(cartItem)}>
                                                        Remove
                                                    </button>
                                                </Col>
                                                <Col xs="12" lg="2" className="text-start d-flex align-items-center">
                                                    <div className="cart-product-price ">${cartItem.price}</div>
                                                </Col>
                                            </Row>
                                        )
                                    })
                                }
                            </Col>
                            <Col xs="12" lg="10" className="mt-4 cart-item">
                                <Row className="">
                                    <Col xs="12" lg="9" className=" text-start">
                                        <button className="clear-btn" onClick={() => handleClearCart()}>
                                            Clear Cart
                                        </button>
                                    </Col>
                                    <Col xs="12" lg="3" className=" align-items-center">
                                        <div className="subtotal ">
                                            <span className="cart-product-price ">${cart.cartTotalAmount}</span>
                                            <br />
                                            <span className="cart-product-price ">Subtotal</span>
                                        </div>
                                        <StripeCheckout
                                            stripeKey={publishableKey}
                                            label="Pay Now"
                                            name="Pay With Credit Card"
                                            billingAddress
                                            shippingAddress
                                            amount={priceForStripe}
                                            description={`Your total is $${cart.cartTotalAmount}`}
                                            token={payNow}
                                        />
                                        {/* <PayButton cartItems={cart.cartItems}/> */}
                                    </Col>
                                </Row>


                            </Col>

                        </Row>

                        {/* <Row className="justify-content-center mt-5">
                            <Col xs="6" lg="5">
                                <form action="" className="formtext ">
                                    <h1>
                                        <i className="far fa-credit-card"></i> Payment Information
                                    </h1>
                                    <div className="cc-num text-start mt-4">
                                        <label htmlFor="card-num">Card Holder Name</label>
                                        <input type="text" name="card-num" placeholder="Card Holder Name..." />
                                    </div>
                                    <div className="cc-num text-start">
                                        <label htmlFor="card-num">Card No.</label>
                                        <input type="text" name="card-num" placeholder="Card No..." />
                                    </div>
                                    <div className="cc-info text-start">
                                        <div>
                                            <label htmlFor="card-num">Exp</label>
                                            <input type="text" name="expire" placeholder="MM/YY" />
                                        </div>
                                        <div>
                                            <label htmlFor="card-num">CCV</label>
                                            <input type="text" name="security" placeholder="CVV" />
                                        </div>
                                    </div>
                                    <div className="btns ">
                                        <button>Purchase</button>
                                    </div>
                                </form>

                            </Col>
                            <Col xs="6" lg="5">
                                <form action="" className="formtext">
                                    <h1>
                                        <i className="fas fa-shipping-fast"></i>
                                        Billing Address
                                    </h1>
                                    <div className="name text-start mt-4    ">
                                        <div>
                                            <label htmlFor="f-name">First Name</label>
                                            <input type="text" name="f-name" placeholder="First Name ..." />
                                        </div>
                                        <div>
                                            <label htmlFor="l-name">Last Name</label>
                                            <input type="text" name="l-name" placeholder="Last Name ..." />
                                        </div>
                                    </div>
                                    <div className="street text-start">
                                        <label htmlFor="name">Street</label>
                                        <input type="text" name="address" placeholder="Address ..." />
                                    </div>
                                    <div className="address-info text-start">
                                        <div>
                                            <label htmlFor="city">City</label>
                                            <input type="text" name="city" placeholder="City ..." />
                                        </div>
                                        <div>
                                            <label htmlFor="state">State</label>
                                            <input type="text" name="state" placeholder="State ..." />
                                        </div>
                                        <div>
                                            <label htmlFor="zip">Zip Code</label>
                                            <input type="text" name="zip" placeholder="zip Code ..." />
                                        </div>
                                    </div>
                                    <div className="street text-start">
                                        <label htmlFor="name">Country</label>
                                        <input type="text" name="Country" placeholder="Country ..." />
                                    </div>
                                </form>

                            </Col>

                        </Row> */}



                    </>

                )
            }

            {/*  */}
        </Container>
    );
}

export default CheckOut;
