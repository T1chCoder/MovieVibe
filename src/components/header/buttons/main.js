import React, { useState, useEffect } from 'react';

const Desktop = ({text, url}) => (
    <div className="btn flx-cntr">
        <a href={url} className="hvr-1 actv-1 bdr-rds-1 flx-cntr">
            <text>{text}</text>
        </a>
    </div>
)

const Tablet = () => (
    <div></div>
)

const Mobile = () => (
    <div></div>
)

const Content = ({text, url}) => {
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