import React, { useState } from 'react'
import "./Login.css"
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import axios from "axios";
import { BACKEND_URI } from "../../config"
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom"

function Login() {
    const [status, setStatus] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rePassowrd, setRePassowrd] = useState('')
    const [error, setError] = useState(false)
    const [errorPassword, setErrorPassword] = useState(false)
    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassowrd, setLoginPassowrd] = useState('')
    const [isLoading, setLoading] = useState(false);
    const Navigate = useNavigate()
    const handleStatus = () => {
        setStatus(!status)
        setError(false)
        setErrorPassword(false)
        setName('')
        setEmail('');
        setPassword('')
        setRePassowrd('')
        setLoginEmail('')
        setLoginPassowrd('')
    }

    const handleSubmits = async () => {
        try {
            if (name === '' || email === "" || password === "" || rePassowrd === "") {
                setError(true)
                return false
            }
            else if (password !== rePassowrd) {
                setErrorPassword(true)
                return false
            }
            else {
                setErrorPassword(false)
                await axios.post(`${BACKEND_URI}/api/v1/user`, {
                    name,
                    email,
                    password
                }).then((res) => {
                    toast.success('User SignUp Successfully ')
                    setStatus(!status)
                })
            }
        } catch (err) {
            toast.error("May be Server Error! Please Refresh Page")
        }

    }

    const handleLogin = async () => {
        try {
            Navigate('/sidebar/payment_Info')
        //     setLoading(true)
        // await axios.post(`${BACKEND_URI}/api/v1/user/login`,{
        //     loginEmail,
        //     loginPassowrd
        // }).then((response)=>{
        //     if(response.data.result === "E-mail and password are required"){
        //         setLoading(false)
        //         toast.error("E-mail and password are required")
        //     }else if (response.data.result === "Invalid credentials Email") {
        //         setLoading(false)
        //         toast.error("E-mail are not correct")
        //       } else if (response.data.result === "Invalid credentials password") {
        //         setLoading(false)
        //         toast.error("Password are not correct")
        //       } else{
        //         // dispatch(getTotals())
        //         setLoading(false)
        //         toast.success("Login Successfully");
        //         localStorage.setItem("setTV-User", JSON.stringify(response.data.status))
        //         Navigate('/sidebar/payment_Info')
        //       }
        // })
        } catch (err) {
            setLoading(false)
            toast.error("May be Server Error! Please Refresh Page")
        }
    }



    return (
        <Container>
            <Row className='justify-content-center'>
                <Col xs="12" lg="5">
                    {
                        status ? (
                            <div className="main_box">
                                <div className="main_box--main">
                                    <div className="main_box--main--title">
                                        <h4>SignUp</h4>

                                    </div>
                                    <div className="main_box--main--signUp">
                                        <input type="text" className={error && !name ? "form-control mt-3 border-red" : "form-control mt-3"} placeholder="FullName ..." autoComplete="false"
                                            value={name} onChange={(e) => setName(e.target.value)}
                                            // style={{border: '1px solid red'}}
                                        />
                                        {/* {error && !name && <label className="error-text">Please fill input field</label>} */}
                                        <input type="email" className={error && !email ? "form-control mt-3 border-red" : "form-control mt-3"} placeholder="Email..." autoComplete="false"
                                            value={email} onChange={(e) => setEmail(e.target.value)}
                                        />
                                        {/* {error && !email && <label className="error-text">Please fill input field</label>} */}
                                        <input type="password" className={error && !password ? "form-control mt-3 border-red" : "form-control mt-3"} placeholder="password..."
                                            value={password} onChange={(e) => setPassword(e.target.value)}
                                        />
                                        {/* {error && !password && <label className="error-text ">Please fill input field</label>} */}
                                        <input type="password" className={error && !rePassowrd ? "form-control mt-3 border-red" : "form-control mt-3"} placeholder="re-enter password..."
                                            value={rePassowrd} onChange={(e) => setRePassowrd(e.target.value)}
                                        />
                                        {/* {error && !rePassowrd && <label className="error-text ">Please fill input field</label>} */}
                                        {errorPassword && <label className="error-text ">password do not match! Please Enter Same Paasword</label>}
                                        <button className="btn btn-success" onClick={handleSubmits} >SIGN UP</button>
                                        <p
                                            onClick={handleStatus}
                                            style={{
                                                textAlign: "center",
                                                color: "#262626",
                                                marginTop: "-5px",
                                                cursor: "pointer"
                                            }}
                                        >
                                            Login
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="main_box">
                                <div className="main_box--main">
                                    <div className="main_box--main--title">
                                        <h4>Login</h4>
                                    </div>
                                    <div className="main_box--main--login">
                                        <input
                                            type="email"
                                            id="username"
                                            className="form-control mt-3"
                                            placeholder="email"
                                            autoComplete="false"
                                            required={true}
                                            value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)}
                                        />
                                        <input
                                            type="password"
                                            className="form-control mt-3"
                                            placeholder="password"
                                            required={true}
                                            value={loginPassowrd} onChange={(e) => setLoginPassowrd(e.target.value)}
                                        />
                                        <button className="btn btn-success" onClick={handleLogin}>
                                            {isLoading ? 'Loading…' : "Log In"}
                                        </button>
                                        <p
                                            onClick={handleStatus}
                                            style={{
                                                textAlign: "center",
                                                color: "#262626",
                                                marginTop: "-5px",
                                                cursor: "pointer"
                                            }}
                                        >
                                            Sign Up
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    }

                </Col>
            </Row>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </Container>
    )
}

export default Login