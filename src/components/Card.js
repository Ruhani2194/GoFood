import React, { useState, useRef, useEffect } from 'react';
import { useDispatchCart, useCart } from '../components/ContextReducer';

export default function Card(props) {
    const dispatch = useDispatchCart();
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");
    const priceRef = useRef();
    const options = props.options || {}; 
    const priceOptions = Object.keys(options);
    const data = useCart(); 
    useEffect(() => {
        if (priceRef.current) {
            setSize(priceRef.current.value);
        }
    }, [priceRef]);

    const handleQty = (e) => {
        setQty(e.target.value);
    };

    const handleOptions = (e) => {
        setSize(e.target.value);
    };

    const handleAddtoCart = () => {
        if (size) { 
            const finalPrice = qty * parseInt(options[size] || 0);
            dispatch({
                type: "ADD",
                // id: props.foodItem._id,
                name: props.foodItem.name,
                price: finalPrice,
                qty: qty,
                size: size
            });
            // console.log(data);
        } else {
            alert("Please select a size.");
        }
    };

    return (
        <div>
            <div className="card mt-3 bg-dark text-light" style={{ width: "16rem", maxHeight: "360px" }}>
                <img src={props.foodItem.img} className="card-img-top" alt={props.foodItem.name} style={{ height: "120px", objectFit: "fill" }} />
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>
                    <div className='container w-100 p-0' style={{ height: "38px" }}>
                        <select className="m-2 h-100 w-20 bg-success text-white rounded" onChange={handleQty} value={qty}>
                            {Array.from(Array(6), (e, i) => (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                            ))}
                        </select>
                        <select className="m-2 h-100 w-20 bg-success text-white rounded" ref={priceRef} onChange={handleOptions}>
                            {priceOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                        <div className='d-inline ms-2 h-100 w-20 fs-5 text-white'>
                            ₹{qty * (parseInt(options[size] || 0))}/-
                        </div>
                    </div>

                    <hr className="bg-secondary" />
                    <button className='btn btn-success justify-center ms-2' onClick={handleAddtoCart}>Add to Cart</button>
                </div>
            </div>
        </div>
    );
}



