import { Link } from 'react-router-dom';
import { SearchOutlined, ShoppingCart, LocationOnOutlined, ArrowDropDown } from '@mui/icons-material';
import { useBasket } from './BasketContext';
import { useAuth } from '../utils/firebase'; 
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';

const Header = () => {
    const { state } = useBasket();
    const { currentUser } = useAuth();

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            window.location.href = '/signin'; 
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <header className="bg-amazon_blue flex items-center p-1 flex-grow py-2">
            {/* Amazon Logo */}
            <div className="flex items-center flex-grow sm:flex-grow-0 ml-3">
                <Link to="/">
                    <img
                        src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
                        width={80}
                        height={30}
                        alt="Amazon"
                        className="cursor-pointer mt-3"
                    />
                </Link>
                <span className="text-white text-xs pb-[1]">.co.uk</span>
            </div>

            {/* Delivery Address */}
            <div className="text-white flex items-center ml-1 mr-2">
                <LocationOnOutlined className="h-6 mr-[-2px] pl-1 mt-2" />
                <div>
                    <p className="text-[11px] text-gray-300">Deliver to</p>
                    <p className="text-sm font-semibold mt-[-5px]">Netherlands</p>
                </div>
            </div>

            {/* Search Bar */}
            <div className="hidden sm:flex items-center h-9 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500 ml-2 mr-2">
                <div className="flex items-center bg-gray-200 h-full rounded-l-md px-4 w-14">
                    <span className="text-xs text-gray-600">All</span>
                    <ArrowDropDown className="text-gray-400 pr-1" />
                </div>
                <input
                    className="p-2 h-full w-2 flex-grow flex-shrink focus:outline-none px-4"
                    type="text"
                    placeholder="Search Amazon.co.uk"
                />
                <div className="bg-[#F3A847] hover:bg-yellow-600 h-9 rounded-r-md flex items-center w-10 pl-2">
                    <SearchOutlined className="h-10 w-10 text-black" />
                </div>
            </div>

            {/* Country Flag and Dropdown */}
            <div className="flex items-center text-white ml-4 mr-2">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg/1920px-Flag_of_the_United_Kingdom_%281-2%29.svg.png"
                    width={24}
                    height={16}
                    alt="UK Flag"
                    className=""
                />
                <ArrowDropDown className="text-gray-400 ml-[-2px] pr-1" />
            </div>

            {/* Right Section */}
            <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap ml-auto">
                <div className="link leading-none">
                    {currentUser ? (
                        <div onClick={handleSignOut} className="cursor-pointer">
                            <p className="text-xs">Hello, {currentUser.displayName}</p>
                            <p className="font-bold text-xs mt-[-5px]">Sign Out <ArrowDropDown className="text-gray-400 ml-[-5px] pr-1" /></p>
                        </div>
                    ) : (
                        <Link to="/signin">
                            <p className="text-xs">Hello, sign in</p>
                            <p className="font-bold text-xs mt-[-5px]">Account & Lists <ArrowDropDown className="text-gray-400 ml-[-5px] pr-1" /></p>
                        </Link>
                    )}
                </div>
                <div className="link">
                    <Link to="/orders">
                        <p>Returns</p>
                        <p className="font-bold text-xs mt-[-4px]">& Orders</p>
                    </Link>
                </div>
                <div className="link relative flex items-center">
                    <Link to="/cart">
                        <span className="absolute bottom-[80%] left-[5%] md:right-10 h-4 w-4 text-center rounded-full text-yellow-600 font-bold cursor-pointer">{state.count}</span>
                        <ShoppingCart className="h-10 w-10 text-white cursor-pointer" />
                        <p className="hidden md:inline font-bold text-xs mt-2 ml-1 cursor-pointer">Basket</p>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
