// Import React, necessary hooks, UUID generator for unique IDs, and navigate hook for navigation
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const StreamList = () => {
    // States for handling input, list items, editing, and navigation
    const [input, setInput] = useState('');
    const [items, setItems] = useState([]);
    const [editItemId, setEditItemId] = useState(null); // Track the item being edited
    const [editInput, setEditInput] = useState(''); // Input for editing items
    const navigate = useNavigate();

    // Add a new item to the list
    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            const newItem = { id: uuidv4(), text: input };
            setItems([...items, newItem]);
            setInput(''); // Clear input field
        }
    };

    // Clear the entire list of items
    const handleClearList = () => {
        setItems([]);
        console.log("Clear List");
    };

    // Delete an item from the list
    const handleDelete = (id) => {
        setItems(items.filter(item => item.id !== id));
    };

    // Enable editing mode for an item
    const handleEdit = (id) => {
        const itemToEdit = items.find(item => item.id === id);
        setEditItemId(id); // Set ID for the item being edited
        setEditInput(itemToEdit.text); // Set current value in edit input
    };

    // Save the edited item
    const handleSaveEdit = () => {
        setItems(items.map(item =>
            item.id === editItemId ? { ...item, text: editInput } : item
        ));
        setEditItemId(null); // Exit edit mode
        setEditInput('');
    };

    // Complete the list and navigate to Cart
    const handleComplete = () => {
        localStorage.setItem('cartItems', JSON.stringify(items)); // Store items in localStorage
        navigate('/cart'); // Navigate to Cart page
    };

    return (
        <div>
            <h1>StreamList</h1>
            {/* Form to handle input for adding new items */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Add a movie or show"
                />
                {/* Removed onClick handler from Add button */}
                <button type="submit">Add</button>
                <button type="button" onClick={handleClearList}>Clear List</button>
                <button type="button" onClick={handleComplete}>Complete</button>
            </form>

            {/* Displaying the list of items */}
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        {editItemId === item.id ? (
                            <>
                                {/* Input field and save button for editing */}
                                <input
                                    type="text"
                                    value={editInput}
                                    onChange={(e) => setEditInput(e.target.value)}
                                />
                                <button onClick={handleSaveEdit}>Save</button>
                            </>
                        ) : (
                            <>
                                {item.text}
                                {/* Edit and delete buttons */}
                                <button onClick={() => handleEdit(item.id)}>Edit</button>
                                <button onClick={() => handleDelete(item.id)}>Delete</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StreamList;
