// src/components/Footer.jsx
import { footerLinks, footerLegalLinks } from '../utils/FooterContents';


const Footer = () => {
    const columnSize = Math.ceil(footerLinks.length / 4);
    const columns = Array.from({ length: 4 }, (_, index) => footerLinks.slice(index * columnSize, (index + 1) * columnSize));

    return (
        <footer className="bg-amazon_blue text-white py-10 mt-[-2rem]">
            <div className="max-w-screen-xl mx-auto px-4 ">
                {/* Existing footer content */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-32">
                    {columns.map((column, colIndex) => (
                        <div key={colIndex} className="space-y-4">
                            {column.map((link, linkIndex) => (
                                <div key={linkIndex} >
                                    <a href={link.url} className="text-[12px] font-[500] hover:underline leading-none text-gray-300">
                                        {link.title}
                                    </a>
                                    <p className="text-[12px] text-gray-400 hover:underline w-[120px]">{link.description}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="border-t border-gray-700 mt-8 pt-4 text-center">
                    <div className="flex flex-col sm:flex-col justify-center items-center space-y-2 sm:space-y-0">
                        <div className="flex justify-center space-x-6">
                            {footerLegalLinks.map((link, index) => (
                                <a key={index} href={link.url} className="text-[12px] text-white hover:underline">
                                    {link.title}
                                </a>
                            ))}
                        </div>
                        <p className="text-xs text-gray-300 mt-4 sm:mt-0">
                            © 1996-2024, Amazon.com, Inc. or its affiliates
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
