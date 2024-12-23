import React, { useState, useEffect } from 'react';
import CommentComponent from "./main"

const Desktop = ({ comments }) => (
    <div lass="cmnts wdth-cvr flx-cntr">
        <ul className="lst wdth-cvr flx-drt-clmn">
            {comments && comments.length > 0 ? (
                comments.map((comment) => (
                    <li key={comment.uuid} className="elmnt wdth-cvr flx-cntr">
                        <CommentComponent comment={comment} />
                    </li>
                ))
            ) : (
                <h1>Not found</h1>
            )}
        </ul>
    </div>
)

const Tablet = ({ comments }) => (
    <div></div>
)

const Mobile = ({ comments }) => (
    <div></div>
)

const Content = ({ comments }) => {
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
        return <Mobile comments={comments} />;
    } else if (screenSize === 'tablet') {
        return <Tablet comments={comments} />;
    } else {
        return <Desktop comments={comments} />;
    }
};

export default Content;