import React, { useState, useEffect } from 'react';
import ContentPosterComponent from './poster';

const Desktop = ({ content, title, description, country, release }) => (
    <div className="dtls-bg wdth-cvr flx-cntr">
        <div className="dtls wdth-cvr flx-cntr flx-tp">
            <div className="lft-bg flx-cntr">
                <div className="lft wdth-cvr flx-cntr">
                    <ContentPosterComponent content={content} />
                </div>
            </div>
            <div className="rght-bg flx-cntr flx-cvr">
                <div className="rght wdth-cvr flx-drt-clmn">
                    <div className="nm wdth-cvr flx-cntr flx-lft">
                        <h6 className="txt wdth-cvr">{title}</h6>
                    </div>
                    <div className="dtl wdth-cvr flx-cntr flx-lft">
                        <text className="txt wdth-cvr">Text</text>
                    </div>
                    <div className="dscrptn wdth-cvr flx-cntr flx-lft">
                        <text className="txt wdth-cvr">{description}</text>
                    </div>
                    <div className="dtls-mr wdth-cvr flx-drt-clmn">
                        <div className="dtl wdth-cvr flx-cntr flx-lft">
                            <div className="tlt flx-cntr flx-lft">
                                <text className="txt wdth-cvr">Country:</text>
                            </div>
                            <div className="inf flx-cvr flx-cntr flx-lft">
                                <text className="txt wdth-cvr">{country}</text>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

const Tablet = ({ title, description, country, release }) => (
    <div></div>
)

const Mobile = ({ title, description, country, release }) => (
    <div></div>
)

const Content = ({ content }) => {
    const [screenSize, setScreenSize] = useState('mobile');
    const title = content.title;
    const description = content.description;
    const country = content.release_location;
    const release = content.release_date;

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
        return <Mobile content={content} title={title} description={description} country={country} release={release} />;
    } else if (screenSize === 'tablet') {
        return <Tablet content={content} title={title} description={description} country={country} release={release} />;
    } else {
        return <Desktop content={content} title={title} description={description} country={country} release={release} />;
    }
};

export default Content;