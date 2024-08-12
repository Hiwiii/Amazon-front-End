import { useBasket } from '../components/BasketContext';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const PaymentForm = () => {
    const { state, dispatch } = useBasket();
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const createPaymentIntent = async () => {
            try {
                const totalAmount = state.items.reduce((total, item) => total + item.price * item.quantity, 0) * 100;
                console.log('Total Amount for Payment Intent:', totalAmount);
    
                const response = await axios.post('https://amazon-backend-deploy-2ohu.onrender.com/create-payment-intent', {
                    amount: totalAmount
                });
    
                if (response.status === 201) {
                    setClientSecret(response.data.clientSecret);
                    console.log('Client Secret Set:', response.data.clientSecret);
                } else {
                    console.error('Failed to create payment intent:', response.data);
                }
            } catch (error) {
                console.error('Error creating payment intent:', error.message);
            }
        };
    
        createPaymentIntent();
    }, [state.items]);
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
    
        setError('');  // Clear previous error
    
        try {
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });
    
            if (result.error) {
                console.error('Payment error:', result.error.message);
                setError('Payment not successful, try again');
            } else {
                if (result.paymentIntent.status === 'succeeded') {
                    console.log('Payment succeeded');
    
                    const order = {
                        id: result.paymentIntent.id,
                        date: new Date(),
                        total: state.items.reduce((total, item) => total + item.price * item.quantity, 0) + 4.99,
                        location: 'Jersey',
                        items: state.items.map(item => ({
                            ...item,
                            returnDate: new Date(new Date().setDate(new Date().getDate() + 30))
                        }))
                    };
    
                    // Simulate saving order to server
                    try {
                        await axios.post('http://localhost:5002/save-order', order);
                        console.log('Order saved to server');
                    } catch (e) {
                        console.error('Error saving order: ', e);
                    }
    
                    // Clear basket after successful payment
                    dispatch({ type: 'CLEAR_BASKET' });
    
                    // Navigate to Orders page
                    navigate('/orders');
                }
            }
        } catch (error) {
            console.error('Payment processing error:', error.message);
            setError('Payment not successful, try again');
        }
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <div className="flex justify-between mt-2 font-semibold text-lg">
                <span>Total Order:</span>
                <span>£{(state.items.reduce((total, item) => total + item.price * item.quantity, 0) + 4.99).toFixed(2)}</span>
            </div>
            <button type="submit" disabled={!stripe || !clientSecret} className="bg-[#F7CA00] hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded w-full mt-4">
                Pay now
            </button>
            {error && <div className="mt-4 text-red-500">{error}</div>}
        </form>
    );
};

const Payment = () => {
    const { state } = useBasket();

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Checkout header */}
            <div className="flex items-center bg-gradient-to-t from-[#F4F4F4] to-[#FFFFFF] border-b border-gray-200 pb-4 pl-[5%]">
                <img
                    src="/amazon-black-logo.png"
                    alt="Amazon logo"
                    className="w-24 "
                />
                <p className="text-black text-sm pb-1 font-[500]">.co.uk</p>
                <h1 className="text-2xl font-[500] ml-[25%]">Checkout (<span className="text-[#007185]"><Link to="/cart">{state.count} items</Link></span>)</h1>
                <LockOutlinedIcon className="ml-auto text-gray-500 mr-[10%]" />
            </div>

            {/* Left and right wrapper */}
            <div className="flex justify-between px-[5%]">
                {/* Left side */}
                <div className="w-[70vw] bg-white p-4">
                    {/* Delivery Address */}
                    <div className="flex items-start justify-between mt-8 border border-gray-300 rounded-md p-4">
                        <h3 className="text-xl font-semibold">Delivery Address</h3>
                        <div className="mt-2">
                            <p className="text-sm">Your Email Address</p>
                            <p className="text-sm">123 React Lane</p>
                            <p className="text-sm">Chicago, IL</p>
                        </div>
                        <h2><Link to="#" className="text-[#007185]">change</Link></h2>
                    </div>

                    {/* Payment Methods */}
                    <div className=" flex mt-8 border border-gray-300 rounded-md p-4">
                        <h3 className="text-xl font- w-[50%] ">Payment Methods</h3>
                        <div className="mt-2 w-[48%] pr-[2%] ">
                            <Elements stripe={stripePromise}>
                                <PaymentForm />
                            </Elements>
                        </div>
                    </div>

                    {/* Review Items and Delivery */}
                    <div className="mt-8 border border-gray-300 rounded-md p-4">
                        <h3 className="text-xl font-semibold">Review items and delivery</h3>
                        <div className="mt-2">
                            {state.items.map((item, index) => (
                                <div key={index} className="flex items-center border-b border-gray-200 py-4">
                                    <img src={item.mainImage} alt={item.title} className="w-24 h-24 object-contain" />
                                    <div className="ml-4 flex-grow">
                                        <h4 className="text-lg font-semibold">{item.title}</h4>
                                        <div className="flex items-center">
                                            <span className="text-sm font-semibold mr-2">★ {item.rating}</span>
                                            <span className="text-sm text-gray-500">({item.reviews} ratings)</span>
                                        </div>
                                        <div className="flex items-center mt-2">
                                            <span className="text-lg font-semibold">£{item.price}</span>
                                            <span className="text-sm text-gray-500 ml-4">Qty: {item.quantity}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Terms and Conditions */}
                    <div className="mt-8">
                        <p className="text-xs text-gray-500">
                            Need help? Check our <a href="#" className="text-blue-600 hover:underline">Help pages</a> or <a href="#" className="text-blue-600 hover:underline">contact us</a>.
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                            When you click the "Buy now" button, we'll send you an e-mail message acknowledging receipt of your order. Your contract to purchase an item will not be complete until we send you an e-mail to indicate that the item has been dispatched.
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                            Within 30 days of delivery, you may return new, unopened physical merchandise in its original condition. Exceptions and restrictions apply. See Amazon.co.uk's <a href="#" className="text-blue-600                             hover:underline">Return Policy</a>.
                        </p>
                    </div>
                </div>
                {/* Right side */}
                <div className="w-[25vw] h-[350px] bg-white p-4 border border-gray-300 rounded-md mt-3">
                    <div className="flex justify-between mt-2 font-semibold text-lg">
                        <span>Total Order:</span>
                        <span>£{(state.items.reduce((total, item) => total + item.price * item.quantity, 0) + 4.99).toFixed(2)}</span>
                    </div>
                    <button className="bg-[#F7CA00] hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded w-full mt-4">
                        Buy now
                    </button>
                    <div className="mt-4">
                        <p className="text-xs text-gray-500">
                            By placing your order you agree to Amazon's <a href="#" className="text-blue-600 hover:underline">Conditions of Use & Sale</a>. Please see our <a href="#" className="text-blue-600 hover:underline">Privacy Notice</a>, our <a href="#" className="text-blue-600 hover:underline">Cookies Notice</a> and our <a href="#" className="text-blue-600 hover:underline">Interest-Based Ads Notice</a>.
                        </p>
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold">Order Summary</h3>
                            <div className="flex justify-between mt-2">
                                <span>Items:</span>
                                <span>£{state.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between mt-2">
                                <span>Postage & Packing:</span>
                                <span>£4.99</span>
                            </div>
                            <div className="flex justify-between mt-2 font-semibold text-lg">
                                <span>Order Total:</span>
                                <span>£{(state.items.reduce((total, item) => total + item.price * item.quantity, 0) + 4.99).toFixed(2)}</span>
                            </div>
                        </div>
                        <div className="mt-4 text-xs">
                            <a href="#" className="text-blue-600 hover:underline block">How are delivery costs calculated?</a>
                            <a href="#" className="text-blue-600 hover:underline block mt-2">Why didn't I qualify for FREE Delivery?</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;

