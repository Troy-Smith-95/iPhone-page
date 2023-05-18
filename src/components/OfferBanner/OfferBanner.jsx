import './OfferBanner.scss';

function OfferBanner() {
    return (
        <header className='offerBanner'>
            <div className='offerBanner__container'>
                <p className='offerBanner__offer'>{'Get $250–$845 in credit toward an iPhone 14 or iPhone 14 Pro when you trade in iPhone 11 or higher. '}
                <a className='offerBanner__link' href="https://www.apple.com/ca/shop/buy-iphone">{'Shop iPhone >'}</a>
                </p>
                
            </div>
        </header>

    );
}

export default OfferBanner;