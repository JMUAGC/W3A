// Import React and necessary hooks
import React, { useState, useEffect } from 'react';

const Cart = () => {
    // State to manage items in the cart
    const [cartItems, setCartItems] = useState([]);
    const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode

    // Fetch cart items from localStorage when component mounts
    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(items);
    }, []);

    // Handle cart submission
    const handleSubmit = () => {
        console.log("Cart Submitted", cartItems);
    };

    // Clear all items in the cart
    const handleClearAll = () => {
        setCartItems([]);
        localStorage.removeItem('cartItems');
    };

    // Delete a specific item from the cart
    const handleDelete = (id) => {
        const updatedItems = cartItems.filter(item => item.id !== id);
        setCartItems(updatedItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    };

    // Toggle edit mode
    const handleEdit = () => {
        setIsEditing(true);
    };

    // Exit edit mode
    const handleDone = () => {
        setIsEditing(false);
    };

    return (
        <div>
            <h1>Cart</h1>
            <ul>
                {/* Render items in the cart or show a message if empty */}
                {cartItems.length > 0 ? (
                    cartItems.map(item => (
                        <li key={item.id}>
                            {item.text}
                            {/* Conditionally render delete buttons if in edit mode */}
                            {isEditing && (
                                <button onClick={() => handleDelete(item.id)}>Delete</button>
                            )}
                        </li>
                    ))
                ) : (
                    <p>No items in the cart</p>
                )}
            </ul>
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={handleClearAll}>Clear All</button>
            {/* Conditionally render either Edit or Done button based on edit mode */}
            {isEditing ? (
                <button onClick={handleDone}>Done</button>
            ) : (
                <button onClick={handleEdit}>Edit</button>
            )}
        </div>
    );
};

export default Cart;
