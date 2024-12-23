import React, { useState, useEffect } from 'react';

const Desktop = ({page, url}) => (
    <div className="url-bg wdth-cvr flx-cntr wrp">
        <div className="url wdth-cvr flx-cntr flx-lft">
            <div className="nm flx-cntr">
                <small className="txt">
                    <a href="/" className="lnk actv">
                        <small className="txt">MovieVibe</small>
                    </a>
                    &nbsp;/&nbsp;
                    <a href="/" className="lnk">
                        <small className="txt">...</small>
                    </a>
                    &nbsp;/&nbsp;
                    <a href={url} className="lnk actv">
                        <small className="txt">{page}</small>
                    </a>
                </small>
            </div>
        </div>
    </div>
)

const Tablet = ({page, url}) => (
    <div></div>
)

const Mobile = ({page, url}) => (
    <div></div>
)

const Content = ({page}) => {
    const [screenSize, setScreenSize] = useState('mobile');
    const url = window.location.pathname;

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
        return <Mobile page={page} url={url} />;
    } else if (screenSize === 'tablet') {
        return <Tablet page={page} url={url} />;
    } else {
        return <Desktop page={page} url={url} />;
    }
};

export default Content;