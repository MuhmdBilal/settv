import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import "./Sidebar.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { HiUserGroup } from "react-icons/hi";
import PaymentInfo from "../PaymentInfo/PaymentInfo";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Product from "../Product/Product";
import CheckOut from "../CheckOut/CheckOut";
import AddProduct from "../Product/AddProduct";
import { useSelector } from "react-redux";
import CheckoutSuccess from "../CheckoutSuccess/CheckoutSuccess";
import History from "../History/History";
import {AiOutlineHistory} from "react-icons/ai"
import {RiProductHuntFill} from "react-icons/ri"
import {MdShoppingCartCheckout} from "react-icons/md"
const drawerWidth = 240;

interface Props {
  window?: () => Window;
}

export default function ResponsiveDrawer(props: Props, { setData }) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isColor, setIsColor] = useState("Customers");
  const { pathname } = useLocation();
  // const [product, setProduct] = useState(0);
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const changeRoute = () => {
    try {
      if (pathname) {
        if (pathname === "/sidebar/dashboard") {
          setIsColor("Dashboard");
        } else if (pathname === "/sidebar/user") {
          setIsColor("Users");
        } else if (pathname === "/sidebar/payment_Info") {
          setIsColor("Payment Info");
        } else if (pathname === "/sidebar/product") {
          setIsColor("Product");
        } else if (pathname === "/sidebar/check_out") {
          setIsColor("Check Out");
        } else if(pathname === "/sidebar/history"){
          setIsColor("History");

        }
      }
    } catch (e) {
      console.log("e", e);
    }
  };
  useEffect(() => {
    changeRoute();
  });

  const drawer = (
    <div className="stakenmsColor1" style={{ color: "white" }}>
      <Toolbar
        className="text-start d-flex align-items-center justify-content-start pb-3 pt-1"
        style={{ backgroundColor: "#3d3d3d", color: "black" }}></Toolbar>

      <br />
      <List>
        {/* <Link to="/sidebar/dashboard" style={{ textDecoration: "none" }} > */}
        {/* <ListItem
          button
          href="#Customers"
          key="Customers"
          onClick={() => {
            setIsColor("Customers");
            setMobileOpen(!mobileOpen);
          }}
          className={
            isColor === "Customers"
              ? "staking-btn_active pt-3 pb-3"
              : "staking-btn pt-3 pb-3"
          }
        >
          <ListItemIcon>
            <AiFillDashboard color="#0f999b" className="ms-3" size={25} />
          </ListItemIcon>
          <ListItemText primary="Customers" />
        </ListItem> */}
        {/* </Link> */}
        {/* <Link to="/sidebar/user" style={{ textDecoration: "none" }}> */}
        {/* <ListItem
          button
          key="Income"
          className={
            isColor === "Income"
              ? "staking-btn_active pt-3 pb-3"
              : "staking-btn pt-3 pb-3"
          }
        >
          <ListItemIcon>
            <HiUserGroup color="#0f999b" className="ms-3" size={25} />
          </ListItemIcon>
          <ListItemText primary="Income" />
        </ListItem> */}
        {/* </Link> */}
        <Link to="/sidebar/payment_Info" style={{ textDecoration: "none" }}>
          <ListItem
            button
            key="Payment Info"
            className={
              isColor === "Payment Info"
                ? "staking-btn_active pt-3 pb-3"
                : "staking-btn pt-3 pb-3"
            }
          >
            <ListItemIcon>
              <HiUserGroup color="#0f999b" className="ms-3" size={25} />
            </ListItemIcon>
            <ListItemText primary="Payment Info" />
          </ListItem>
        </Link>
        <Link to="/sidebar/product" style={{ textDecoration: "none" }}>
          <ListItem
            button
            key="Product"
            className={
              isColor === "Product"
                ? "staking-btn_active pt-3 pb-3"
                : "staking-btn pt-3 pb-3"
            }
          >
            <ListItemIcon>
              <RiProductHuntFill color="#0f999b" className="ms-3" size={25} />
            </ListItemIcon>
            <ListItemText primary="Product" />
          </ListItem>
        </Link>
        <Link to="/sidebar/check_out" style={{ textDecoration: "none" }}>
          <ListItem
            button
            key="Check Out"
            className={
              isColor === "Check Out"
                ? "staking-btn_active pt-3 pb-3"
                : "staking-btn pt-3 pb-3"
            }
          >
            <ListItemIcon>
              <MdShoppingCartCheckout color="#0f999b" className="ms-3" size={25} />
            </ListItemIcon>
            <ListItemText primary="Check Out" />
          </ListItem>
        </Link>
        <Link to="/sidebar/history" style={{ textDecoration: "none" }}>
          <ListItem
            button
            key="History"
            className={
              isColor === "History"
                ? "staking-btn_active pt-3 pb-3"
                : "staking-btn pt-3 pb-3"
            }
          >
            <ListItemIcon>
              <AiOutlineHistory color="#0f999b" className="ms-3" size={25} />
            </ListItemIcon>
            <ListItemText primary="History" />
          </ListItem>
        </Link>
      </List>
      <div className="mt-3 mb-4 d-flex align-items-center justify-content-center">
        <Link
          to="/"
          style={{ textDecoration: "none" }}
          onClick={() => localStorage.clear()}
        >
          <button className="btn btn-logout mb-4">Log out</button>
        </Link>
      </div>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar
          style={{
            backgroundColor: "#3d3d3d",
            width: "100%",
            paddingTop: "10px",
            paddingBottom: "10px",
          }}
        >
          <Typography
            style={{ color: "white", display: "flex", width: "100%" }}
          >
            <div style={{ width: "100%" }}>
              <Navbar
                collapseOnSelect
                sticky="top"
                variant="light"
                style={{ width: "100%", backgroundColor: "#3d3d3d" }}
              >
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2, display: { sm: "none" } }}
                >
                  <MenuIcon style={{ color: "white" }} />
                </IconButton>
                <Navbar.Brand
                  href="#home"
                  className="newProject-span d-flex"
                ></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className=" nav  d-flex justify-content-evenly nav-one-width"></Nav>
                  <Nav className=" d-flex align-items-center justify-content-start">
                      <Nav.Link href="">
                    <Link to="/sidebar/check_out">
                        <Badge badgeContent={cartTotalQuantity} color="primary">
                          <ShoppingCartIcon color="white" />
                        </Badge>
                    </Link>
                      </Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            </div>
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Routes>
          <Route path="/payment_Info" element={<PaymentInfo />} />
          <Route path="/product" element={<Product />} />
          <Route path="/check_out" element={<CheckOut />} />
          <Route path="/add_product" element={<AddProduct />} />
          <Route path="/checkout-success" element={<CheckoutSuccess/>}/>
          <Route path="/history" element={<History/>} />
        </Routes>
      </Box>
    </Box>
  );
}
