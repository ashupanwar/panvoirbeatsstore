import React, { useEffect, useState } from 'react'
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import AllTracks from '../components/AllTracks';
import Search from '../components/Search';
import { useLocation } from 'react-router-dom';

const AllBeatsPage = () => {

    //for when user click on a tag
    const location = useLocation();
    const tag = location.pathname.split('/')[2];

    const [query, setQuery] = useState(tag !== 'all' && tag !== undefined ? tag : "");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {

    }, [query])

    return (
        <div>
            <Navbar />
            <Search setQuery={setQuery} tag={tag} />
            <AllTracks from="allbeats" query={query} />
            <Footer />
        </div>
    )
}

export default AllBeatsPage