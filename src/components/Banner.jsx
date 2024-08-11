import { useState } from 'react';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import shoes from '../assets/Amazon-Banner-Images/shoes.jpg';
import coats from '../assets/Amazon-Banner-Images/coats.jpg';
import pc_products from '../assets/Amazon-Banner-Images/pc.jpg';

const images = [shoes, coats, pc_products];

const Banner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const arrowColor = currentIndex === 1 ? 'text-white' : 'text-black';

    return (
        <div className="relative w-full h-[500px]">
            {/* Background Images Container */}
            <div
                className="absolute top-0 left-0 w-full h-full flex transition-transform ease-out duration-500"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {images.map((image, index) => (
                    <div
                        key={index}
                        className="w-full flex-shrink-0 h-full bg-no-repeat bg-center bg-cover"
                        style={{ backgroundImage: `url(${image})` }}
                    />
                ))}
            </div>

            {/* Navigation Arrows */}
            <div className="absolute top-[30%] left-[2%] transform -translate-y-1/2">
                <ArrowBackIos
                    onClick={prevSlide}
                    className={`cursor-pointer ${arrowColor}`}
                    style={{ fontSize: '48px' }}
                />
            </div>
            <div className="absolute top-[30%] right-[2%] transform -translate-y-1/2">
                <ArrowForwardIos
                    onClick={nextSlide}
                    className={`cursor-pointer ${arrowColor}`}
                    style={{ fontSize: '48px' }}
                />
            </div>
        </div>
    );
};

export default Banner;
