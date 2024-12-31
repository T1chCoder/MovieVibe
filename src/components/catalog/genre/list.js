import React, { useState, useEffect } from 'react';
import GenreComponent from "./main";

const Desktop = ({genres}) => (
    <div className="btns lmtd ovrfl-hdn flx-cntr">
        {genres && genres.length > 0 ? (
            genres.map((genre) => (
                <GenreComponent genre={genre} />
            ))
        ) : (
            <h1>Not found</h1>
        )}
    </div>
);

const Tablet = ({genres}) => (
    <div></div>
)

const Mobile = ({genres}) => (
    <div></div>
)

const Content = ({genres}) => {
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
        return <Mobile genres={genres} />;
    } else if (screenSize === 'tablet') {
        return <Tablet genres={genres} />;
    } else {
        return <Desktop genres={genres} />;
    }
};

export default Content;