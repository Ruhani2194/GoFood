

import React, { useEffect } from 'react';
import ReactDom from 'react-dom';

// Modal styles
const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    backgroundColor: 'rgb(34,34,34)',
    transform: 'translate(-50%, -50%)',
    zIndex: 1000,
    height: '90%',
    width: '90%',
    overflowY: 'auto', // Enable scrolling inside the modal
};

// Overlay styles to dim the background
const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .7)',
    zIndex: 1000,
};

export default function Modal({ children, onClose }) {
    // Prevent body from scrolling when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden'; // Disable body scrolling
        return () => {
            document.body.style.overflow = 'auto'; // Re-enable body scrolling when modal closes
        };
    }, []);

    return ReactDom.createPortal(
        <>
            <div style={OVERLAY_STYLES} onClick={onClose} />
            <div style={MODAL_STYLES}>
                <button className="btn bg-danger fs-4" style={{ marginLeft: "90%", marginTop: "-35px" }} onClick={onClose}>X</button>
                {children}
            </div>
        </>,
        document.getElementById('cart-root') // Make sure this matches your root element for the modal
    );
}
