import React, { useState, useEffect } from 'react';
import axios from "axios";

const Desktop = ({ text, senderUsername }) => (
    <div className="cmnt-bg wdth-cvr flx-cntr">
        <div className="cmnt wdth-cvr flx-cntr flx-tp">
            <div className="lft-bg flx-cntr">
                <div className="lft wdth-cvr flx-cntr">
                    <span style={{ "--fgr-sz": "36px" }} className="fgr">
                        <img src="https://marketplace.canva.com/EAF0HxEn5ew/1/0/1600w/canva-black-and-white-photography-camera-photo-studio-logo-ftxQJDCtHnk.jpg" className="bdr-rds-cvr" loading="lazy" alt="user" />
                    </span>
                </div>
            </div>
            <div className="rght-bg flx-cvr flx-cntr">
                <div className="rght wdth-cvr flx-drt-clmn">
                    <div className="nm wdth-cvr flx-cntr flx-lft">
                        <text className="txt">{senderUsername}</text>
                    </div>
                    <div className="mnd wdth-cvr flx-cntr flx-lft">
                        <text className="txt wdth-cvr">{text}</text>
                    </div>
                    <div className="btns-bg wdth-cvr flx-cntr flx-lft">
                        <div className="btns flx-cntr">
                            <div className="btn-bg flx-cntr">
                                <button type="button" className="btn hvr-1 actv-1 bdr-rds-cvr flx-cntr">
                                    <span style={{ "--fgr-sz": "24px" }} className="fgr">
                                        <svg width="24" height="24" viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M18.77 11H14.54L16.06 6.06C16.38 5.03 15.54 4 14.38 4C13.8 4 13.24 4.24 12.86 4.65L7 11H3V21H7H8H17.43C18.49 21 19.41 20.33 19.62 19.39L20.96 13.39C21.23 12.15 20.18 11 18.77 11ZM7 20H4V12H7V20ZM19.98 13.17L18.64 19.17C18.54 19.65 18.03 20 17.43 20H8V11.39L13.6 5.33C13.79 5.12 14.08 5 14.38 5C14.64 5 14.88 5.11 15.01 5.3C15.08 5.4 15.16 5.56 15.1 5.77L13.58 10.71L13.18 12H14.53H18.76C19.17 12 19.56 12.17 19.79 12.46C19.92 12.61 20.05 12.86 19.98 13.17Z"
                                                fill="white" />
                                        </svg>
                                    </span>
                                </button>
                            </div>
                            <div className="btn-bg flx-cntr">
                                <button type="button" className="btn hvr-1 actv-1 bdr-rds-cvr flx-cntr">
                                    <span style={{ "--fgr-sz": "24px" }} className="fgr">
                                        <svg width="24" height="24" viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M16.9999 4H15.9999H6.56995C5.49995 4 4.58995 4.67 4.37995 5.61L3.03995 11.61C2.76995 12.85 3.81995 14 5.22995 14H9.45995L7.93995 18.94C7.61995 19.97 8.45995 21 9.61995 21C10.1999 21 10.7599 20.76 11.1399 20.35L16.9999 14H20.9999V4H16.9999ZM10.3999 19.67C10.2099 19.88 9.91995 20 9.61995 20C9.35995 20 9.11995 19.89 8.98995 19.7C8.91995 19.6 8.83995 19.44 8.89995 19.23L10.4199 14.29L10.8199 13H9.45995H5.22995C4.81995 13 4.42995 12.83 4.19995 12.54C4.07995 12.39 3.94995 12.14 4.01995 11.82L5.35995 5.82C5.45995 5.35 5.96995 5 6.56995 5H15.9999V13.61L10.3999 19.67ZM19.9999 13H16.9999V5H19.9999V13Z"
                                                fill="white" />
                                        </svg>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const Tablet = ({ text, senderUsername }) => (
    <div></div>
)

const Mobile = ({ text, senderUsername }) => (
    <div></div>
)

const Content = ({ comment }) => {
    const [screenSize, setScreenSize] = useState('mobile');
    const [sender, setSender] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`/api/users/${comment.sender_uuid}`)
            .then((res) => {
                setSender(res.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching sender data:', error);
                setLoading(false);
            });

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
    }, [comment.sender_uuid]);

    if (!loading && sender) {
        const senderUsername = `@${sender.username}`
        const text = comment.text;

        if (screenSize === 'mobile') {
            return <Mobile text={text} senderUsername={senderUsername} />;
        } else if (screenSize === 'tablet') {
            return <Tablet text={text} senderUsername={senderUsername} />;
        } else {
            return <Desktop text={text} senderUsername={senderUsername} />;
        }
    }
};

export default Content;