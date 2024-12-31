import React, { useState, useEffect } from 'react';

const Desktop = () => (
    <div className="ctlg flx-cntr">
        <button type="button" className="hvr-2 actv-2 bdr-rds-1 flx-cntr">
            <text>Catalog</text>
        </button>
    </div>
);

const Tablet = () => (
    <div></div>
)

const Mobile = () => (
    <div></div>
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