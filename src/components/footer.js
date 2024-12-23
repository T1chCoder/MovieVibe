import React, { useState, useEffect } from 'react';

const Desktop = () => (
    <footer className="wdth-cvr flx-drt-clmn">
        <div className="tp wdth-cvr flx-cntr">
            <button type="button" className="hvr-1 actv-2 wdth-cvr flx-cntr wrp" id="btn-bck-to-tp">
                <text>Back to top</text>
            </button>
        </div>
        <div className="ctr wdth-cvr flx-spc-btwn flx-tp wrp">
            <div className="flx-cntr">
                <ul className="flx-drt-clmn flx-tp">
                    <li className="flx-cntr">
                        <a href="/" className="flx-cntr">
                            <text>About us</text>
                        </a>
                    </li>
                    <li className="flx-cntr">
                        <a href="/" className="flx-cntr">
                            <text>Common questions</text>
                        </a>
                    </li>
                    <li className="flx-cntr">
                        <a href="/" className="flx-cntr">
                            <text>Privacy</text>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="flx-cntr">
                <ul className="flx-drt-clmn flx-tp">
                    <li className="flx-cntr">
                        <a href="/" className="flx-cntr">
                            <text>Support center</text>
                        </a>
                    </li>
                    <li className="flx-cntr">
                        <a href="/" className="flx-cntr">
                            <text>Vacancy</text>
                        </a>
                    </li>
                    <li className="flx-cntr">
                        <a href="/" className="flx-cntr">
                            <text>Cookie settings</text>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="flx-cntr">
                <ul className="flx-drt-clmn flx-tp">
                    <li className="flx-cntr">
                        <a href="/" className="flx-cntr">
                            <text>Account</text>
                        </a>
                    </li>
                    <li className="flx-cntr">
                        <a href="/" className="flx-cntr">
                            <text>Legal notices</text>
                        </a>
                    </li>
                    <li className="flx-cntr">
                        <a href="/" className="flx-cntr">
                            <text>Additional info</text>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="flx-cntr">
                <ul className="flx-drt-clmn flx-tp">
                    <li className="flx-cntr">
                        <a href="/" className="flx-cntr">
                            <text>Media center</text>
                        </a>
                    </li>
                    <li className="flx-cntr">
                        <a href="/" className="flx-cntr">
                            <text>Terms of use</text>
                        </a>
                    </li>
                    <li className="flx-cntr">
                        <a href="/" className="flx-cntr">
                            <text>Contact us</text>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div className="btm wdth-cvr flx-cntr wrp">
            <small>&copy; MovieVibe — made by Asadbek</small>
        </div>
    </footer>
)

const Tablet = () => (
    <footer></footer>
)

const Mobile = () => (
    <footer></footer>
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