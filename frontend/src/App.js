
import './App.css';
import Login from './component/Login';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Sidebar from "./component/Sidebar/Sidebar"
import PaymentInfo from './component/PaymentInfo/PaymentInfo';
import Product from './component/Product/Product';
import CheckOut from './component/CheckOut/CheckOut';
import AddProduct from './component/Product/AddProduct';
import CheckoutSuccess from './component/CheckoutSuccess/CheckoutSuccess';
import History from './component/History/History';
function App() {
 

  return (
    <div className="App">
      
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login/>}  />
        <Route exact path="/sidebar/*" element={<Sidebar/>} >
         <Route exact path="payment_Info" element={<PaymentInfo/>} />
         <Route exact path="product" element={<Product/>} />
         <Route exact path="check_out" element={<CheckOut/>}/>
         <Route exact path="add_product" element={<AddProduct/>} /> 
         <Route exact path="checkout-success" element={<CheckoutSuccess />}/>
         <Route exact path='history' element={<History/>} /> 
        </Route>
          
             </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
