import React, { useState, useEffect } from 'react';

const Desktop = () => (
    <header className="wdth-cvr flx-spc-btwn wrp">
        <div className="lg flx-cntr">
            <a href="/" className="hght-cvr flx-cntr">
                <h3 className="txt">MovieVibe</h3>
            </a>
        </div>
        <script src="%PUBLIC_URL%/static/js/search.js"></script>
        <div className="srch ptn-rltv wdth-cvr flx-spc-btwn">
            <form method="get" action="/" className="frm bdr-rds-1 ovrfl-hdn wdth-cvr flx-spc-btwn">
                <div className="bd flx-cvr flx-cntr hght-cvr">
                    <input type="text" placeholder="Search" name="q" className="cvr" />
                </div>
                <div className="btn flx-cntr hght-cvr">
                    <button type="submit" className="hvr-2 actv-2 hght-cvr">
                        <span style={{ "--fgr-sz": "18px" }} className="fgr">
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <rect x="1.4" y="0.9" width="12.287" height="11.9872" rx="5.99362" stroke="/FAF8F6"
                                    stroke-width="1.8" />
                                <path
                                    d="M17.0879 18.0687C17.4431 18.4163 18.0129 18.4102 18.3606 18.055C18.7083 17.6997 18.7022 17.1299 18.3469 16.7822L17.0879 18.0687ZM10.827 11.941L17.0879 18.0687L18.3469 16.7822L12.0861 10.6546L10.827 11.941Z"
                                    fill="/FAF8F6" />
                            </svg>
                        </span>
                    </button>
                </div>
            </form>
        </div>
        <div className="btns flx-cntr">
            <div className="btn flx-cntr">
                <a href="/" className="hvr-1 actv-1 bdr-rds-1 flx-cntr">
                    <text>Cart</text>
                </a>
            </div>
            <div className="btn flx-cntr">
                <a href="/" className="hvr-1 actv-1 bdr-rds-1 flx-cntr">
                    <text>Favorites</text>
                </a>
            </div>
            <div className="btn flx-cntr">
                <a href="/" className="hvr-1 actv-1 bdr-rds-1 flx-cntr">
                    <text>Profile</text>
                </a>
            </div>
        </div>
    </header>
)

const Tablet = () => (
    <header></header>
)

const Mobile = () => (
    <header></header>
)

const Content = () => {
    const [screenSize, setScreenSize] = useState('mobile');

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setScreenSize('desktop');
            } else if (window.innerWidth >= 768) {
                setScreenSize('tablet');
            } else {
                setScreenSize('mobile');
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    if (screenSize === 'mobile') {
        return <Mobile />;
    } else if (screenSize === 'tablet') {
        return <Tablet />;
    } else {
        return <Desktop />;
    }
};

export default Content;