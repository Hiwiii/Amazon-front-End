import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useBasket } from '../components/BasketContext';
import { productDetailsData } from '../utils/ProductDetailsContents';
import SharedLayout from '../components/SharedLayout';

const ProductDetails = () => {
    const { id } = useParams();
    const { dispatch } = useBasket();
    const product = productDetailsData.find(p => p.id === parseInt(id));
    
    const [mainImage, setMainImage] = useState(product.mainImages[0]);
    const [selectedSize, setSelectedSize] = useState("");
    const [sizeError, setSizeError] = useState("");
    const [quantity, setQuantity] = useState(1);  

    const handleAddToBasket = () => {
        if (product.sizes.length > 0 && !selectedSize) {
            setSizeError("Please choose a size");
        } else {
            setSizeError("");
            dispatch({
                type: 'ADD_TO_BASKET',
                payload: { ...product, selectedSize, mainImage, price: parseFloat(product.price.replace('£', '')), quantity }
            });
        }
    };

    return (
        <SharedLayout>
        <div className="container mx-auto px-4 py-8">
            <div className="flex">
                {/* Thumbnails */}
                <div className="w-[5vw] flex flex-col space-y-2 mt-6">
                    {product.thumbnails.map((thumbnail, index) => (
                        <img
                            key={index}
                            src={thumbnail}
                            alt={`Thumbnail ${index}`}
                            className={`cursor-pointer w-12 h-12 p-1 border ${mainImage === product.mainImages[index] ? 'border-blue-500' : 'border-gray-300'}`}
                            onClick={() => setMainImage(product.mainImages[index])}
                        />
                    ))}
                </div>

                <div className="w-[30vw] flex items-center mx-4 h-[35vw]">
                    <img src={mainImage} alt="Main Product" className="w-full h-full object-contain" />
                </div>

                {/* Right Section */}
                <div className="w-[40vw] mt-8 px-4">
                    <h2 className="text-2xl font-bold border-b border-gray-400">{product.title}</h2>
                    <div className="flex items-center space-x-2">
                        <span className="text-xl font-semibold text-red-600">{product.price}</span>
                        <span className="text-gray-500 line-through">{product.oldPrice}</span>
                    </div>
                    <div className="my-4">
                        <span className="text-yellow-500">★ {product.rating}</span>
                        <span className="ml-2 text-gray-500">{product.reviews} ratings</span>
                    </div>
                    {/* Size options */}
                    {product.sizes.length > 0 && (
                        <div className="my-4">
                            <label htmlFor="sizeSelect" className="block text-lg font-semibold mb-2">Size Name:</label>
                            <select 
                                id="sizeSelect" 
                                className="w-24 border border-gray-300 rounded p-2"
                                value={selectedSize}
                                onChange={(e) => setSelectedSize(e.target.value)}
                            >
                                <option value="">Select</option>
                                {product.sizes.map((size, index) => (
                                    <option key={index} value={size}>{size}</option>
                                ))}
                            </select>
                            {sizeError && <p className="text-red-500 text-sm">{sizeError}</p>}
                        </div>
                    )}
                    {/* Product detail */}
                    <div className="my-4">
                        <h3 className="text-lg font-semibold">Product details</h3>
                        <ul className="list-none pl-5 text-gray-700">
                            {product.details.map((detail, index) => (
                                <li key={index}>{detail}</li>
                            ))}
                        </ul>
                    </div>
                    {/* About this item */}
                    <div className="my-4">
                        <h3 className="text-lg font-semibold">About this item</h3>
                        <ul className="list-disc pl-5 text-gray-700 text-sm">
                            {product.About.map((detail, index) => (
                                <li key={index}>{detail}</li>
                            ))}
                        </ul>
                    </div>
                    
                </div>
                {/* Add to cart or list */}
                <div className="w-[20vw] h-[40vh] my-4 flex flex-col border border-gray-200 pt-6 px-4 right-0">
                    <div className="flex items-center border mb-2">
                        <label htmlFor="quantitySelect" className="block text-lg font-semibold">Quantity:</label>
                        <select 
                            id="quantitySelect"
                            className="p-2 ml-20"
                            value={quantity}
                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                        >
                            {Array.from({ length: 30 }, (_, i) => i + 1).map((num) => (
                                <option key={num} value={num}>{num}</option>
                            ))}
                        </select>
                    </div>
                    <button 
                        className="bg-[#FFD814] w-full mb-2 py-2 px-10 rounded text-black font-semibold"
                        onClick={handleAddToBasket}
                    >Add to Basket</button>    
                    <button className="w-full bg-gray-200 py-2 px-10 rounded text-black font-semibold">Add to List</button>
                </div>
            </div>
            {/* Product description */}
            <div className="mt-8 border-t-2 border-gray-400">
                <h3 className="text-xl font-bold mt-2 mb-2">Product description</h3>
                <p className="text-gray-700 px-6 text-sm">{product.description}</p>
            </div>

            <div className="mt-8 border-t border-gray-300 py-4">
                <h3 className="text-xl font-bold">Product details</h3>
                <ul className="list-disc pl-5 text-gray-700 text-sm">
                    {product.productDetails.map((detail, index) => (
                        <li key={index}>{detail}</li>
                    ))}
                </ul>
            </div>
        </div>
        </SharedLayout>
    );
};

export default ProductDetails;
