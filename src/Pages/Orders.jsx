import { useEffect, useState } from 'react';
import { useBasket } from '../components/BasketContext';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import  axios  from 'axios';
import SharedLayout from '../components/SharedLayout';

const Orders = () => {
    const { state } = useBasket();
    const [orders, setOrders] = useState([]);
    
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('https://amazon-backend-deploy-2ohu.onrender.com/orders');
                if (response.status === 200) {
                    setOrders(response.data);
                } else {
                    console.error('Failed to fetch orders:', response.data);
                }
            } catch (error) {
                console.error('Error fetching orders:', error.message);
            }
        };

        fetchOrders();
    }, []);

    return (
        <SharedLayout> 
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-between mx-12">
                    <h1 className="text-3xl font-semibold">Your Orders</h1>
                    <div className="flex items-center">
                        <input 
                            type="text" 
                            placeholder="Search all orders" 
                            className="border border-gray-300 rounded-l-md p-2"
                        />
                        <button className="bg-gray-800 text-white p-2 rounded-r-md">Search Orders</button>
                    </div>
                </div>

                <div className="mt-8">
                    {orders.length === 0 ? (
                        <p>You have no orders.</p>
                    ) : (
                        orders.map((order, index) => (
                            <div key={index} className="rounded-md mx-12 mb-4 ">
                                <div className="flex justify-between bg-[#F0F2F2] border border-gray-300 p-4 text-sm text-[#565959]">
                                    <div>
                                        <p className="">ORDER PLACED</p>
                                        <p className="font-semibold">{format(new Date(order.date), 'dd MMM yyyy')}</p>
                                    </div>
                                    <div>
                                        <p className="">TOTAL</p>
                                        <p className="font-semibold">£{order.total.toFixed(2)}</p>
                                    </div>
                                    <div>
                                        <p className="">DISPATCH TO</p>
                                        <p className="font-semibold">Amazon Locker - {order.location}</p>
                                    </div>
                                    <div>
                                        <p className="">ORDER # {order.id}</p>
                                        <Link to="#" className="text-[#007185]">View order details</Link>
                                    </div>
                                </div>
                                <div className="">
                                    {order.items.map((item, idx) => (
                                        <div key={idx} className="flex items-center border-b border-l border-r border-gray-300 py-4 px-4">
                                            <img src={item.mainImage} alt={item.title} className="w-24 h-24 object-contain" />
                                            <div className="ml-4 text-sm flex-grow">
                                                <h4 className="w-[90%] font-[500] text-[#007185] hover:text-[#C46242] hover:underline">{item.title}</h4>
                                                <p className=" text-gray-500">Return window closed on {format(new Date(item.returnDate), 'dd MMM yyyy')}</p>
                                                <div className="flex items-center mt-2">
                                                    <span className="text-lg font-semibold">£{item.price}</span>
                                                    <span className=" text-gray-500 ml-4">Qty: {item.quantity}</span>
                                                </div>
                                                <div className="flex space-x-4 mt-2 text-sm">
                                                    <button className="bg-[#F7CA00] text-black py-1 px-4 rounded">Buy it again</button>
                                                    <button className="border text-black py-1 px-4 rounded-md ">View your item</button>
                                                </div>
                                            </div>
                                            <div className="flex flex-col w-[20%] text-sm mt-[-2.5rem] mr-6">
                                                <button className=" border border-gray-200 rounded-md shadow mb-1">Get help</button>
                                                <button className=" border border-gray-200 rounded-md shadow mb-1">Contact the Seller</button>
                                                <button className=" border border-gray-200 rounded-md shadow mb-1">Write a product review</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </SharedLayout>
    );
};

export default Orders;
