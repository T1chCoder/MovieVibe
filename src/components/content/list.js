import React, { useState, useEffect } from 'react';
import ContentComponent from './main';

const Desktop = ({ contents, min }) => {
    if (min) {
        return (
            <div className="cnts-mn cnts wdth-cvr flx-cntr">
                <ul className="wdth-cvr">
                    {contents && contents.length > 0 ? (
                        contents.map((content) => (
                            <li key={`content-min-${content.uuid}`} className="wdth-cvr flx-cntr">
                                <ContentComponent content={content} min={min} />
                            </li>
                        ))
                    ) : (
                        <h1>Not found</h1>
                    )}
                </ul>
            </div>
        )
    }
    else {
        return (
            <div className="cnts wdth-cvr flx-cntr wrp">
                <ul className="wdth-cvr">
                    {contents && contents.length > 0 ? (
                        contents.map((content) => (
                            <li key={`content-${content.uuid}`} className="wdth-cvr flx-cntr">
                                <ContentComponent content={content} />
                            </li>
                        ))
                    ) : (
                        <h1>Not found</h1>
                    )}
                </ul>
            </div>
        )
    }
}

const Tablet = ({ contents }) => (
    <div></div>
)

const Mobile = ({ contents }) => (
    <div></div>
)

const Content = ({ contents, min = false }) => {
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
        return <Mobile contents={contents} min={min} />;
    } else if (screenSize === 'tablet') {
        return <Tablet contents={contents} min={min} />;
    } else {
        return <Desktop contents={contents} min={min} />;
    }
};

export default Content;