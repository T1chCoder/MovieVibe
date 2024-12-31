import React, { useState, useEffect } from 'react';

const Desktop = ({ text, url }) => (
    <a href={url} className="flx-cntr">
        <text>{text}</text>
    </a>
);

const Tablet = ({ text, url }) => (
    <a href={url} className="flx-cntr">
        <text>{text}</text>
    </a>
);

const Mobile = ({ text, url }) => (
    <a href={url} className="flx-cntr">
        <text>{text}</text>
    </a>
);

const Content = ({ text, url }) => {
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
        return <Mobile text={text} url={url} />;
    } else if (screenSize === 'tablet') {
        return <Tablet text={text} url={url} />;
    } else {
        return <Desktop text={text} url={url} />;
    }
};

export default Content;