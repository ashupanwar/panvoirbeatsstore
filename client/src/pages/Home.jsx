import React, { useEffect, useState } from "react";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Featured from "../components/Featured";

import TenTracks from "../components/TenTracks"
import BrowseAllTracks from "../components/BrowseAllTracks"
import LicensingInfo from "../components/LicensingInfo"
import YoutubeInfo from "../components/YoutubeInfo"
import FeaturedSoundKit from "../components/FeaturedSoundKit"
import Contact from "../components/Contact"
import MusicPlayer from '../components/MusicPlayer';

const Home = (props) => {

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    console.log(searchQuery);
  }, [searchQuery])

  return (
    <div>
      <Navbar setSearchQuery={setSearchQuery} />
      <Featured
        searchQuery={searchQuery}
        setCurrentTrack={props.setCurrentTrack}
        currentPlaying={props.currentPlaying}
        isPlaying={props.isPlaying}
        setIsPlaying={props.setIsPlaying}
        setCurrentPlaying={props.setCurrentPlaying}
        setMusicPlayerVisible={props.setMusicPlayerVisible} />
      <TenTracks />
      <BrowseAllTracks />
      <LicensingInfo />
      <YoutubeInfo />
      <FeaturedSoundKit />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
