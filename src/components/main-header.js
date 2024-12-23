import React from 'react';
import HeaderComponent from './header';
import NavbarComponent from './navbar';

const Content = () => {
    return (
        <div style={{"z-index": "999"}} className="ptn-stck tp-cvr lft-cvr wdth-cvr flx-drt-clmn">
            <HeaderComponent />
            <NavbarComponent />
        </div>
    );
};

export default Content;