import { useState, useEffect } from 'react';
import { PiArrowUpBold } from 'react-icons/pi';

const UpButton = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    let timer;

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(true);

            clearTimeout(timer);
            timer = setTimeout(() => {
                if (!isHovering) {
                    setIsVisible(false);
                }
            }, 1000);
        };
        

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timer);
        };
    }, [isHovering]);
    let scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        isVisible && (
            <div
                className="fixed bottom-2 right-2 z-40 transition-opacity duration-500"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                <button onClick={scrollToTop} className="bg-blue-500 text-my-white text-3xl p-3 rounded-full flex items-center justify-center hover:bg-emerald-600">
                    <PiArrowUpBold />
                </button>
            </div>
        )
    );
};

export default UpButton;
