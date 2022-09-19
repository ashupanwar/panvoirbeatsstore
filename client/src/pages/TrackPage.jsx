import React, { useEffect, useState } from 'react'
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import TrackInfo from '../components/TrackInfo';
import RelatedTracks from '../components/RelatedTracks';
import { useLocation } from "react-router-dom";

const TrackPage = (props) => {

    const location = useLocation();
    const id = location.pathname.split("/")[2];



    useEffect(() => {
        window.scrollTo(0, 0);
        //console.log(id);
    }, [id]);



    return (
        <div>
            <Navbar />
            <TrackInfo
                trackId={id}
                setCurrentTrack={props.setCurrentTrack}
                currentPlaying={props.currentPlaying}
                isPlaying={props.isPlaying}
                setIsPlaying={props.setIsPlaying}
                setCurrentPlaying={props.setCurrentPlaying}
                setMusicPlayerVisible={props.setMusicPlayerVisible}
            />
            <RelatedTracks trackId={id} />
            <Footer />
        </div>
    )
}

export default TrackPage