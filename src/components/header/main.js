import React, { useState, useEffect } from 'react';
import SearchComponent from './search';
import HeaderButtonComponent from './buttons/main';
import HeaderButtonLogoComponent from './buttons/logo';

const Desktop = ({ buttons }) => (
    <header className="wdth-cvr flx-spc-btwn wrp">
        <HeaderButtonLogoComponent />
        <SearchComponent />
        <div className="btns flx-cntr">
            {buttons && buttons.length > 0 ? (
                buttons.map((button, index) => (
                    <HeaderButtonComponent key={index} text={button.text} url={button.url} />
                ))
            ) : (
                <h1>Not found</h1>
            )}
        </div>
    </header>
);

const Tablet = ({ buttons }) => (
    <header></header>
);

const Mobile = ({ buttons }) => (
    <header></header>
);

const Content = () => {
    const [screenSize, setScreenSize] = useState('mobile');
    const buttons = [
        { text: "Login", url: "/login" },
    ];

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
        return <Mobile buttons={buttons} />;
    } else if (screenSize === 'tablet') {
        return <Tablet buttons={buttons} />;
    } else {
        return <Desktop buttons={buttons} />;
    }
};

export default Content;