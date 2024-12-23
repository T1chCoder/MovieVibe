import React, { useState, useEffect } from 'react';

const Desktop = () => (
    <div className="pst-bg wdth-cvr flx-cntr">
        <div className="pst wdth-cvr flx-cntr flx-tp">
            <div className="lft-bg flx-cntr">
                <div className="lft wdth-cvr flx-cntr">
                    <span style={{ "--fgr-sz": "36px" }} className="fgr">
                        <img src="https://marketplace.canva.com/EAF0HxEn5ew/1/0/1600w/canva-black-and-white-photography-camera-photo-studio-logo-ftxQJDCtHnk.jpg" className="bdr-rds-cvr" loading="lazy" alt="user" />
                    </span>
                </div>
            </div>
            <div className="rght-bg flx-cvr flx-cntr">
                <div className="rght wdth-cvr flx-drt-clmn">
                    <div className="inpt-bg wdth-cvr flx-cntr">
                        <input type="text" placeholder="Add a comment..." className="wdth-cvr inpt" />
                    </div>
                </div>
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