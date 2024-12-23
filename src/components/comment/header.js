import React, { useState, useEffect } from 'react';

const Desktop = ({ count }) => (
    <div className="hdr-bg wdth-cvr flx-cntr">
        <div className="hdr wdth-cvr flx-cntr flx-lft">
            <h5 className="txt">{count} {count == 1 ? ("comment") : ("comments")}</h5>
        </div>
    </div>
)

const Tablet = ({ count }) => (
    <div></div>
)

const Mobile = ({ count }) => (
    <div></div>
)

const Content = ({ comments }) => {
    const [screenSize, setScreenSize] = useState('mobile');
    const count = comments.length;

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
        return <Mobile count={count} />;
    } else if (screenSize === 'tablet') {
        return <Tablet count={count} />;
    } else {
        return <Desktop count={count} />;
    }
};

export default Content;