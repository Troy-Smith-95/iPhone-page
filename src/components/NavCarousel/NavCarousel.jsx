import './NavCarousel.scss';
import NavIconData from '../../data/NavIconData';
import { useEffect, useRef, useState } from 'react';


function NavCarousel() {
    const containerRef = useRef(null);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [containerWidth, setContainerWidth] = useState(0);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    let scrollRight;
    let scrollLeft;
    let visible;

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [windowWidth]);

    useEffect(() => {
        setContainerWidth(containerRef.current.offsetWidth);
    }, [windowWidth]);

    function handleLeftClick() {
        if (containerRef.current) {
            containerRef.current.scrollBy({
                left: scrollLeft,
                behavior: 'smooth',
            });
        }
    }

    function handleRightClick() {
        if (containerRef.current) {
            containerRef.current.scrollBy({
                left: scrollRight,
                behavior: 'smooth',
            });
        }
    }

    if (containerRef.current) {
        if (scrollPosition % 100 === 0) {
            visible = Math.trunc(containerWidth / 100);
            scrollRight = (visible * 100);

        } else {
            visible = Math.trunc((containerWidth - (100 - (scrollPosition % 100))) / 100);
            scrollRight = (100 - (scrollPosition % 100)) + (visible * 100);
        }

        if ((1100 - containerWidth - scrollPosition) % 100 === 0 || scrollPosition + containerWidth === 1100) {
            scrollLeft = - (visible * 100);
        } else {
            scrollLeft = - ((visible * 100) + 100 - ((1100 - containerWidth - scrollPosition) % 100))
        }
    }


    return (
        <section className='navCarousel'>
            <ul onScroll={() => { setScrollPosition(containerRef.current.scrollLeft) }} className='navCarousel__list' ref={containerRef}>
                {NavIconData.map((icon) => {
                    return (
                        <li key={icon.id} >
                            <div className='navCarousel__item' >
                                <img className='navCarousel__icon' src={icon.url} alt={icon.alt} />
                                <p className='navCarousel__name'>{icon.alt}</p>
                                <p className='navCarousel__info'>{icon.info}</p>
                            </div>
                        </li>
                    );
                })}
            </ul>
            {containerWidth < windowWidth ?
                <div className='navCarousel__paddles'>
                    <button onClick={handleLeftClick} disabled={scrollPosition === 0 ? true : false} className={scrollPosition === 0 ? 'navCarousel__paddle navCarousel__paddle--left navCarousel__paddle--disable' : 'navCarousel__paddle navCarousel__paddle--left'}></button>
                    <button onClick={handleRightClick} disabled={containerRef.current ? scrollPosition + containerWidth === 1100 ? true : false : false} className={containerRef.current ? scrollPosition + containerWidth === 1100 ? 'navCarousel__paddle navCarousel__paddle--right navCarousel__paddle--disable' : 'navCarousel__paddle navCarousel__paddle--right' : 'navCarousel__paddle navCarousel__paddle--right'}></button>
                </div>
            : ''}
        </section>
    );
}

export default NavCarousel;