import React, { useState, useEffect } from 'react';

const Desktop = () => (
    <div className="pgs wdth-cvr flx-cntr wrp">
        <div className="bd flx-cntr bdr-rds-1">
            <div className="flx-cntr">
                <a href="/" style={{ "--fgr-sz": "28px" }} className="pg fgr actv flx-cntr">
                    <text>1</text>
                </a>
            </div>
            <div className="flx-cntr">
                <a href="/" style={{ "--fgr-sz": "28px" }} className="pg fgr flx-cntr">
                    <text>2</text>
                </a>
            </div>
        </div>
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