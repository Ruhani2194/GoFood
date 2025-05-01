
import React, { useEffect } from 'react';
import { useCart, useDispatchCart } from '../components/ContextReducer';
export default function Cart() {
    const cartItems = useCart();
    const dispatch = useDispatchCart();
    useEffect(() => {
        console.log('Cart Items:', cartItems);
    }, [cartItems]);
    let totalPrice = cartItems.reduce((total, food) => total + (food.price * food.qty), 0);

    const handleRemove = (index) => {
        dispatch({ type: 'REMOVE', index });
    };

    const handleCheckOut = async () => {
        if (cartItems.length === 0) {
            alert("Cart is empty!");
         
            return;
        }
        alert('Your order is successfully placed!');

        let userEmail = localStorage.getItem("userEmail");
        if (!userEmail) {
            alert("User email not found. Please log in.");
            return;
        }
        try {
            let response = await fetch("http://localhost:5000/api/orderData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    order_data: cartItems,
                    email: userEmail,
                    order_date: new Date().toString()
                })
            });
            dispatch({ type: "DROP" });
            if (response.ok) {
                alert("Order placed successfully!");
            } else {
                console.error('Failed to place order', response.statusText); 
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="text-center m-5 text-light">
                Your Cart is Empty
            </div>
        );
    }

    return (
        <div className="container m-auto mt-5 responsive table-responsive-sm table-responsive-md">
            <h2 className="table table-hover text-light">Your Cart</h2>
            <table className="table table-dark table-bordered table-hover">
                <thead>
                    <tr>
                        <th scope="col" className="text-light">S.No</th>
                        <th scope="col" className="text-light">Food Name</th>
                        <th scope="col" className="text-light">Quantity</th>
                        <th scope="col" className="text-light">Option</th>
                        <th scope="col" className="text-light">Amount</th>
                        <th scope="col" className="text-light">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((item, index) => (
                        <tr key={index}>
                            <td className="text-light">{index + 1}</td>
                            <td className="text-light">{item.name}</td>
                            <td className="text-light">{item.qty}</td>
                            <td className="text-light">{item.size}</td>
                            <td className="text-light">₹{item.price * item.qty}</td>
                            <td>
                                <button className="btn btn-danger" onClick={() => handleRemove(index)}>
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="fs-2 mt-3 text-light">
                <h1>Grand Total: ₹{totalPrice}</h1>
            </div>
            <div>
                <button className='btn btn-success mt-5' onClick={handleCheckOut}>CheckOut</button>
            </div>
        </div>
    );
}
