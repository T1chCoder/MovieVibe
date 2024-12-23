import React, { useState, useEffect } from 'react';

const Desktop = ({ title, poster_url }) => (
    <div className="pstr flx-cntr">
        <span className="cvr flx-cntr">
            <img src={poster_url} className="bdr-rds-1" loading="lazy" alt={title} />
        </span>
    </div>
)

const Tablet = ({ title, poster_url }) => (
    <div></div>
)

const Mobile = ({ title, poster_url }) => (
    <div></div>
)

const Content = ({ content }) => {
    const [screenSize, setScreenSize] = useState('mobile');
    const title = content.title;
    const poster_url = content.poster_url;

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
        return <Mobile title={title} poster_url={poster_url} />;
    } else if (screenSize === 'tablet') {
        return <Tablet title={title} poster_url={poster_url} />;
    } else {
        return <Desktop title={title} poster_url={poster_url} />;
    }
};

export default Content;