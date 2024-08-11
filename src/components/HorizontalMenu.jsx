import { Link } from 'react-router-dom';
import menuItems from '../utils/LandingPageContents';

const HorizontalMenu = () => {
    return (
        <nav className="bg-amazon_blue-light text-white flex items-center pl-5 pr-2 py-2 space-x-4">
        {menuItems.map((item, index) => (
            <Link
            key={index}
            to={item.path}
            className=" flex items-center font-[500] text-[14px] text-white hover:text-[#F08804]"
            >
            {item.icon && item.icon}
            <span>{item.name}</span>
            </Link>
        ))}
        </nav>
    );
};

export default HorizontalMenu;
