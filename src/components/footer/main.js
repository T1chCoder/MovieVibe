import React, { useState, useEffect } from 'react';
import FooterButtonTopComponent from "./buttons/top";
import FooterButtonComponent from "./buttons/main";
import  FooterCopyrightComponent from "./copyright";

const Desktop = ({sections}) => (
    <footer className="wdth-cvr flx-drt-clmn">
        <FooterButtonTopComponent />
        <div className="ctr wdth-cvr flx-spc-btwn flx-tp wrp">
            {sections && sections.length > 0 ? (
                sections.map((buttons) => (
                    <div className="flx-cntr">
                        <ul className="flx-drt-clmn flx-tp">
                            {buttons && buttons.length > 0 ? (
                                buttons.map((button) => (
                                    <li key="footer-link-about-us" className="flx-cntr">
                                        <FooterButtonComponent text={button["text"]} url={button["url"]} />
                                    </li>
                                ))
                            ) : (
                                <h1>Not found</h1>
                            )}
                        </ul>
                    </div>
                ))
            ) : (
                <h1>Not found</h1>
            )}
        </div>
        <FooterCopyrightComponent />
    </footer>
)

const Tablet = ({sections}) => (
    <footer></footer>
)

const Mobile = ({sections}) => (
    <footer></footer>
)

const Content = () => {
    const [screenSize, setScreenSize] = useState('mobile');
    const sections = [
        [
            {"text": "About us", "url": "/"}, 
            {"text": "Common questions", "url": "/"}, 
            {"text": "Privacy", "url": "/"}
        ],
        [
            {"text": "Support center", "url": "/"},
            {"text": "Vacancy", "url": "/"},
            {"text": "Cookie settings", "url": "/"}
        ],
        [
            {"text": "Account", "url": "/"},
            {"text": "Legal notices", "url": "/"},
            {"text": "Additional info", "url": "/"}
        ],
        [
            {"text": "Media center", "url": "/"},
            {"text": "Terms of use", "url": "/"},
            {"text": "Contact us", "url": "/"}
        ]
    ];

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
        return <Mobile sections={sections} />;
    } else if (screenSize === 'tablet') {
        return <Tablet sections={sections} />;
    } else {
        return <Desktop sections={sections} />;
    }
};

export default Content;