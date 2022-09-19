
import Home from "./pages/Home";
import LicenseInfoPage from './pages/LicenseInfoPage'
import RegisterPage from "./pages/RegisterPage";
import Login from "./components/Login";
import Cart from "./pages/Cart";
import FAQPage from "./pages/FAQPage";
import ContactPage from './pages/ContactPage'
import CreditsPage from './pages/CreditsPage'
import Test from "./pages/Test";
import Drumkits from "./pages/Drumkits";
import MusicPlayer from "./components/MusicPlayer";
import NewMusicPlayer from "./components/NewMusicPlayer"
import TrackPage from "./pages/TrackPage";
import AllBeatsPage from "./pages/AllBeatsPage";
import CartReviewPage from "./pages/CartReviewPage";
import LoginPage from './pages/LoginPage'
import SuccessPage from './pages/Success'
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom"
import DrumkitPage from "./pages/DrumkitPage";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from 'axios';
import styled from "styled-components";
import { SERVER_URL } from './requestMethods';

//const SERVER_URL = 'http://localhost:5000';

const P = styled.div`
  color: white;
  position: absolute;
  top: 100px;
  z-index: 100;
`;

const App = () => {

  const user = useSelector((state) => state.user.currentUser);

  const [musicPlayerVisible, setMusicPlayerVisible] = useState(false);

  const [currentTrack, setCurrentTrack] = useState(null);
  const [track, setTrack] = useState({});

  //set from the music player, the track which is currently playing, helps in setting the playpause button in track info
  const [currentPlaying, setCurrentPlaying] = useState(null);


  //flag for if the track is currently playing or not
  const [isPlaying, setIsPlaying] = useState(false);


  useEffect(async () => {
    await axios.get(SERVER_URL + '/api/tracks/find/' + currentTrack)
      .then(response => {
        setTrack(response.data);
      })
      .catch(err => {
        console.log(err);
      })

  }, [currentTrack])

  return (
    <>
      <Routes>
        <Route path="/" element={<Home setCurrentTrack={setCurrentTrack} currentPlaying={currentPlaying} isPlaying={isPlaying} setIsPlaying={setIsPlaying} setMusicPlayerVisible={setMusicPlayerVisible} />} />
        <Route path="/allbeats/:q" element={<AllBeatsPage />} />
        <Route path="/drumkits" element={<Drumkits />} />
        <Route path="/FAQ" element={<FAQPage />} />
        <Route path="/credits" element={<CreditsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/licenseinfo" element={<LicenseInfoPage />} />
        <Route path="/trackInfo/:id" element={<TrackPage setCurrentTrack={setCurrentTrack} currentPlaying={currentPlaying} isPlaying={isPlaying} setIsPlaying={setIsPlaying} setMusicPlayerVisible={setMusicPlayerVisible} />} />
        <Route path="/drumkitInfo/:id" element={<DrumkitPage />} />
        <Route path="/cartreview" element={<CartReviewPage />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <RegisterPage />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>

      <MusicPlayer currentTrack={currentTrack} tracksrc={track.mp3} setCurrentPlaying={setCurrentPlaying} isPlaying={isPlaying} setIsPlaying={setIsPlaying} musicPlayerVisible={musicPlayerVisible} setMusicPlayerVisible={setMusicPlayerVisible} />


    </>
  )
};

export default App;