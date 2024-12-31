import React, { useState, useEffect } from 'react';
import GenreListComponent from "./catalog/genre/list";
import CatalogComponent from "./catalog/main";
import axios from "axios";

const Desktop = ({genres}) => (
    <nav className="wdth-cvr flx-spc-btwn wrp">
        <CatalogComponent />
        <GenreListComponent genres={genres} />
    </nav>
);

const Tablet = ({genres}) => (
    <nav></nav>
)

const Mobile = ({genres}) => (
    <nav></nav>
)

const Content = () => {
    const [screenSize, setScreenSize] = useState('mobile');
    const [genres, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`/api/genres/`)
            .then((res) => {
                setCategories(res.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching genres data:', error);
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
    }, []);

    if (!loading) {
        if (screenSize === 'mobile') {
            return <Mobile genres={genres} />;
        } else if (screenSize === 'tablet') {
            return <Tablet genres={genres} />;
        } else {
            return <Desktop genres={genres} />;
        }
    }
};

export default Content;