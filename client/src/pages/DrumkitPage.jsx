import React, { useEffect, useState } from 'react'
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import DrumkitInfo from '../components/DrumkitInfo';
import { useLocation } from "react-router-dom";



const DrumkitPage = () => {

    const location = useLocation();
    const id = location.pathname.split("/")[2];



    useEffect(() => {
        window.scrollTo(0, 0);
        //console.log(id);
    }, [id]);

    return (
        <div>
            <Navbar />
            <DrumkitInfo drumkitId={id} />
            <Footer />
        </div>
    )
}

export default DrumkitPage