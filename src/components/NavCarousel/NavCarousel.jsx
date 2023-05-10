import './NavCarousel.scss';
import NavIconData from '../../data/NavIconData';




function NavCarousel() {
    return (
        NavIconData.map((icon) => {
           return <img src={icon.url} alt={icon.alt} key={icon.id} />
        })
    );
}

export default NavCarousel;