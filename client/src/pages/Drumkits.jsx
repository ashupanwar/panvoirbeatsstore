import React, { useEffect } from 'react'
import AllDrumkits from '../components/AllDrumkits';
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Drumkits = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <Navbar />
            <AllDrumkits />
            <Footer />
        </div>
    )
}

export default Drumkits