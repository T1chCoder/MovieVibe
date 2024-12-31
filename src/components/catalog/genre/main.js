import React, { useState, useEffect } from 'react';

const Desktop = ({text, url}) => (
    <div className="btn flx-cntr">
        <a href={url} className="hvr-1 actv-1 flx-cntr">
            <text>{text}</text>
        </a>
    </div>
);

const Tablet = ({text, url}) => (
    <div></div>
)

const Mobile = ({text, url}) => (
    <div></div>
)

const Content = ({genre}) => {
    const [screenSize, setScreenSize] = useState('mobile');
    const url = `/genre/${genre.uuid}`;

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
        return <Mobile text={genre.title} url={url} />;
    } else if (screenSize === 'tablet') {
        return <Tablet text={genre.title} url={url} />;
    } else {
        return <Desktop text={genre.title} url={url} />;
    }
};

export default Content;