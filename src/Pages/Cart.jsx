import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBasket } from '../components/BasketContext';
import { useAuth } from '../utils/firebase'; // Use the AuthProvider from firebase.jsx
import SharedLayout from '../components/SharedLayout';

const Cart = () => {
    const { state, dispatch } = useBasket();
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [selectedItems, setSelectedItems] = useState(state.items.map(item => item.id));
    const [selectAll, setSelectAll] = useState(true);

    useEffect(() => {
        setSelectedItems(state.items.map(item => item.id));
    }, [state.items]);

    const calculateTotal = () => {
        const total = state.items.reduce((total, item) => {
            if (selectedItems.includes(item.id)) {
                return total + (parseFloat(item.price) * item.quantity || 0);
            }
            return total;
        }, 0);
        return total.toFixed(2);
    };

    const handleQuantityChange = (id, quantity) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity: parseInt(quantity) } });
    };

    const toggleSelectAll = () => {
        if (selectAll) {
            setSelectedItems([]);
        } else {
            setSelectedItems(state.items.map(item => item.id));
        }
        setSelectAll(!selectAll);
    };

    const handleSelectItem = (id) => {
        setSelectedItems(prevSelected => 
            prevSelected.includes(id) ? prevSelected.filter(itemId => itemId !== id) : [...prevSelected, id]
        );
    };

    const handleDeleteItem = (id) => {
        dispatch({ type: 'REMOVE_FROM_BASKET', payload: { id } });
    };

    const handleProceedToCheckout = () => {
        if (currentUser) {
            navigate('/payment');
        } else {
            navigate('/signin');
        }
    };

    return (
        <SharedLayout>
        <div className="container mx-auto px-4 py-8 bg-[#EAEDED]">
            <div className="flex justify-between">
                {/* left-side */}
                <div className="w-[70vw] p-4 bg-white ">
                    <h2 className="text-2xl font-bold">Shopping Basket</h2>
                    <div className="flex cursor-pointer mb-4 border-b justify-between">
                        <p className="text-sm text-blue-500" onClick={toggleSelectAll}>
                            {selectAll ? 'Deselect all items' : 'Select all items'}
                        </p>
                        <p className="text-sm text-gray-400">price</p>
                    </div>
                    
                    {state.items.length === 0 ? (
                        <p>Your shopping basket is empty.</p>
                    ) : (
                        state.items.map((item, index) => (
                            <div key={index} className="flex items-center border-b border-gray-200 py-4 pl-4">
                                <input 
                                    type="checkbox" 
                                    className="mr-4 hover:border hover:border-[#007185]" 
                                    checked={selectedItems.includes(item.id)}
                                    onChange={() => handleSelectItem(item.id)}
                                />
                                <img src={item.mainImage} alt={item.title} className="w-48 h-48 object-contain mr-4" />
                                <div className="flex-grow">
                                    <div className="flex w-[45vw] justify-between">
                                        <div>
                                            <h3 className="text-lg font-semibold">{item.title}</h3>
                                            <p className="text-sm mb-2 w-[45vw]">{item.description}</p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <div className="flex items-center border rounded-lg p-1 pl-2 bg-[#E1E4E4]">
                                                        <label htmlFor={`quantity-${index}`} className="text-sm  mr-2">Qty:</label>
                                                        <select
                                                            id={`quantity-${index}`}
                                                            className="bg-[#E1E4E4] ml-[-1px]"
                                                            value={item.quantity}
                                                            onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                                        >
                                                            {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                                                                <option key={num} value={num}>
                                                                    {num}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="flex space-x-4">
                                                    <button 
                                                        className="text-sm text-[#007185]" 
                                                        onClick={() => handleDeleteItem(item.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                    <button className="text-sm text-[#007185]">Save for later |</button>
                                                    <button className="text-sm text-[#007185]">See more like this |</button>
                                                    <button className="text-sm text-[#007185]">Share</button>
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-lg font-bold">£{(parseFloat(item.price) || 0).toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                {/* right side  */}
                <div className="w-[25vw] border border-gray-200 p-4 bg-white">
                    <p className="text-green-700">Part of your order qualifies for FREE Delivery. Select FREE Delivery at checkout.</p>
                    <h2 className="text-2xl font-bold mt-4">Subtotal ({selectedItems.length} items): £{calculateTotal()}</h2>
                    <button 
                        onClick={handleProceedToCheckout}
                        className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded mt-4 w-full"
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
        </SharedLayout>
    );
};

export default Cart;
