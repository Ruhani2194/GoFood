import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from '../components/ContextReducer';
import Modal from '../Modal';
import Cart from '../screens/Cart';

export default function Navbar(props) {
    const [cartView, setCartView] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("authToken"));
    const [isAdmin, setIsAdmin] = useState(false); 
    const navigate = useNavigate();

    useEffect(() => {
        const handleAuthChange = () => {
            const token = localStorage.getItem("authToken");
            setIsAuthenticated(!!token);
            
            if (token) {
                try {
                    const decodedToken = JSON.parse(atob(token.split('.')[1]));
                    setIsAdmin(decodedToken.role === 'admin'); 
                } catch (error) {
                    console.error("Error decoding token:", error);
                }
            } else {
                setIsAdmin(false);
            }
        };
        handleAuthChange();
        window.addEventListener('storage', handleAuthChange);

        return () => {
            window.removeEventListener('storage', handleAuthChange);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
        setIsAdmin(false); 
        navigate("/");
    };

    const loadCart = () => {
        setCartView(true);
    };

    const items = useCart();

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success position-sticky"
                style={{ boxShadow: "0px 10px 20px black", position: "fixed", zIndex: "10", width: "100%" }}>
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/">Home</Link>
                            </li>
                            {isAuthenticated && (
                                <li className="nav-item">
                                    {/* <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/MyOrder">My Orders</Link> */}
                                </li>
                            )}
                        </ul>
                        {!isAuthenticated ? (
                            <div className="d-flex">
                                <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                                <Link className="btn bg-white text-success mx-1" to="/signup">Signup</Link>
                                
                            </div>
                        ) : (
                            <div>
                                {!isAdmin ? (
                                    <div className="btn bg-white text-success mx-2" onClick={loadCart}>
                                        <Badge color="secondary" badgeContent={items.length}>
                                            <ShoppingCartIcon />
                                        </Badge>
                                        Cart
                                    </div>
                                ) : (
                                    <>
                                    <Link className="btn bg-white text-success mx-2" to="/upload-items">Upload Item</Link>
                                    <Link className="btn bg-white text-success mx-1" to="/ProfileDahboard">Profile DashBoard</Link>
                                    </>
                                )}
                                <button onClick={handleLogout} className="btn bg-white text-success mx-2">Logout</button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
            {cartView && (
                <Modal onClose={() => setCartView(false)}>
                    <Cart />
                </Modal>
            )}
        </div>
    );
}
