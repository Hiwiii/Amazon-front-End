import { Link } from 'react-router-dom';
import { shippableProducts, horizontalImages, FashionDeals } from '../utils/LandingPageContents';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useRef } from 'react';

const ShippableProducts = () => {
    const fashionDealsRef = useRef(null);
    const internationalSellersRef = useRef(null);

    const scrollLeft = (ref) => {
        ref.current.scrollLeft -= 400;
    };

    const scrollRight = (ref) => {
        ref.current.scrollLeft += 400;
    };

    return (
        <div className="bg-[#ECD3BF] relative z-10 mt-[-200px]">
            <div className="bg-white px-4 py-3 mb-4 mx-5">
                <p className="text-sm">
                    We are displaying products that ship to your location. You can select a different location in the menu above.{' '}
                    <a href="#" className="text-blue-500 hover:text-blue-800">
                        Click here to learn more about international shipping.
                    </a>
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-5">
                {shippableProducts.slice(0, 3).map((product, index) => (
                    <div key={index} className="bg-white p-4 shadow-md">
                        <h3 className="font-semibold mb-2">{product.title}</h3>
                        <img src={product.image} alt={product.title} className="w-full h-auto object-cover mb-2" />
                        <a href="#" className="text-blue-500 hover:text-[#CA5B2C]">{product.link}</a>
                    </div>
                ))}
                <div className="bg-white p-4 shadow-md flex flex-col justify-between">
                    <div>
                        <h3 className="font-semibold mb-2">Sign in for your best experience</h3>
                        <button className="bg-yellow-400 py-2 px-4 rounded text-black">Sign in securely</button>
                    </div>
                    <div className="mt-4">
                        <img src="/row-1/promo.jpg" alt="Peace of mind" className="w-full" />
                    </div>
                </div>
            </div>

            {/* Deals in Fashion */}
            <div className="bg-white p-4 my-4 mx-5 relative group">
                <h3 className="font-bold mb-2 text-xl">Deals in Fashion</h3>
                <div className="flex overflow-x-scroll scrollbar-hide" ref={fashionDealsRef}>
                    {FashionDeals.map((product, index) => (
                        <Link to={`/product/${index}`} key={index} className="flex-shrink-0 p-4">
                            <div className="p-4 mt-[-1.5rem]">
                                <img src={product.image} alt={`Deal ${index}`} className="w-full h-52 object-cover mb-2 border border-gray-200" />
                                <div className="text-sm mt-4">
                                    <span className="text-white border bg-red-700 p-1 font-bold">{product.discount}</span>{' '}
                                    <span className="text-red-700">{product.deal}</span>
                                </div>
                                <div className="text-sm">
                                    <span className="font-semibold">{product.price}</span>{' '}
                                    <span className="line-through text-gray-400">{product.oldPrice}</span>
                                </div>
                                <p className="text-xs text-gray-600">{product.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="flex items-center justify-center mx-4 w-12 h-20 shadow-md bg-white border-b border-r border-t border-gray-300 absolute left-0 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowBackIosIcon className="cursor-pointer" onClick={() => scrollLeft(fashionDealsRef)} />
                </div>
                <div className="flex items-center justify-center mx-4 border-b border-l border-t border-gray-300 shadow-md w-12 h-20 bg-white absolute right-0 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowForwardIosIcon className="cursor-pointer" onClick={() => scrollRight(fashionDealsRef)} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-5 mt-4">
                {shippableProducts.slice(3).map((product, index) => (
                    <div key={index} className="bg-white p-4 shadow-md">
                        <h3 className="font-semibold mb-2 text-xl">{product.title}</h3>
                        <img src={product.image} alt={product.title} className="w-full h-72 object-cover mb-2" />
                        <a href="#" className="text-blue-500 hover:text-[#CA5B2C]">{product.link}</a>
                    </div>
                ))}
            </div>

            {/* international-top-sellers */}
            <div className="bg-white p-4 my-4 mx-5 relative group">
                <h3 className="font-semibold mb-2">International top sellers</h3>
                <div className="flex overflow-x-scroll scrollbar-hide" ref={internationalSellersRef}>
                    {horizontalImages.map((image, index) => (
                        <div key={index} className="flex-shrink-0 mr-2">
                            <img src={image} alt={`Horizontal ${index}`} className="w-auto h-40 object-cover" />
                        </div>
                    ))}
                </div>
                <div className="flex items-center justify-center mx-4 w-12 h-20 shadow-md bg-white border-b border-r border-t border-gray-300 absolute left-0 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowBackIosIcon className="cursor-pointer" onClick={() => scrollLeft(internationalSellersRef)} />
                </div>
                <div className="flex items-center justify-center mx-4 border-b border-l border-t border-gray-300 shadow-md w-12 h-20 bg-white absolute right-0 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowForwardIosIcon className="cursor-pointer" onClick={() => scrollRight(internationalSellersRef)} />
                </div>
            </div>
        </div>
    );
};

export default ShippableProducts;
