import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import ShareIcon from '@mui/icons-material/Share';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import axios from 'axios';
import Loading from './Loading';
import starsImg from '../img/stars.jpg'
import ShareModal from './ShareModal';
import ShareModalContent from './ShareModalContent';
import { addTrack } from '../redux/cartRedux';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { mobile } from "../responsive";
import { tablet } from "../responsive";
import { SERVER_URL } from '../requestMethods';

import tracks from '../tracks';

//const SERVER_URL = 'http://localhost:5000';

const Container = styled.div`
    width: 100vw;
    background: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1)),url(${starsImg});
    background-size: cover;
    background-position: top;
    color: white;
    display: flex;
    justify-content: center;
    box-sizing: border-box;
`;
const Wrapper = styled.div`
    width: 75%;
    height: fit-content;
    display: flex;
    box-sizing: border-box;
    padding: 20px;
    margin-top: 40px;

    ${tablet({ flexDirection: "column", alignItems: "center" })}
`;
const Left = styled.div`
    width: 300px;
    height: 300px;
    margin-right: 30px;

    ${tablet({ marginRight: "0" })}
`;
const Image = styled.div`
    width: 100%;    
    height: 100%;
    background-image: url(${props => (props.img)});
    background-size: cover;
    background-position: center;
    border-radius: 6px;
    
`;
const Right = styled.div`
    flex: 1;
    
    ${tablet({ display: "flex", flexDirection: "column", alignItems: "center" })}
`;
const Title = styled.h1`
    margin-bottom: 4px;

    ${tablet({ textAlign: "center", marginTop: "26px", marginBottom: "16px" })}
`;
const ProducerName = styled.p`
    margin-bottom: 20px;
    font-weight: 600;
`;
const Desc = styled.p`
    margin-bottom: 20px;

    ${tablet({ textAlign: "center" })}
`;
const ContentTitle = styled.p`
    margin-bottom: 20px;
`;
const Content = styled.p`
    margin-bottom: 30px;
    font-weight: 600;

    p{
        margin-bottom: 2px;
    }
`;
const ButtonsContainer = styled.div`
    flex: 1;
    display: flex;
`;
const BuyBTN = styled.div`
    width: 110px;
    height: 46px;
    background-color: teal;
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: center;
    border-radius: 6px;
    color: black;
    cursor: pointer;
`;
const Plus = styled.div`
    height: 100%; 
    position: relative;
    top: 8px;
    left: -2px;
    font-weight: bold;

`;
const Amount = styled.p`
    font-weight: bold;
    margin-left: 3px;
`;
const ShareButton = styled.div`
    width: 110px;
    height: 46px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: center;
    border-radius: 6px;
    font-weight: bold;
    color: black;
    cursor: pointer;
    margin-left: 10px;
`;

const DrumkitInfo = (props) => {

    const dispatch = useDispatch();
    const tracksInCart = useSelector(state => state.cart.tracks);

    const shareModalRef = useRef()

    const [drumkit, setDrumkit] = useState({ contents: [] });
    const [drumkitId, setdrumkitId] = useState(props.drumkitId);

    useEffect(() => {
        setdrumkitId(props.drumkitId);
    }, [props.drumkitId])

    useEffect(() => {
        const getProduct = async () => {
            try {
                await axios.get(SERVER_URL + "/api/drumkits/find/" + drumkitId)
                    .then(response => {
                        setDrumkit(response.data);
                    });

            } catch (err) {
                console.log(err);
            }
        };
        getProduct();
    }, [drumkitId]);

    const handleClick = () => {
        const track = {
            _id: drumkit._id,
            img: drumkit.img,
            trackname: drumkit.kitname,
            price: drumkit.price
        }

        dispatch(addTrack({
            track: {
                ...track,
                selectedLicense: "Drumkit",
                selectedPrice: drumkit.price,
                selectedItems: "Full",
                selectedType: "Drumkit"
            },
            quantity: 1,
            price: drumkit.price
        }))
    }

    const isTrackInCart = (drumkit) => {
        let res = tracksInCart.filter(function (value) {
            return (value._id === drumkit._id);
        });
        if (res.length === 0) {
            return (
                <BuyBTN onClick={handleClick}>
                    <ShoppingBagOutlinedIcon style={{ fontSize: 25 }} />
                    <Plus>+</Plus>
                    <Amount>${drumkit.price}</Amount>
                </BuyBTN>
            )
        } else {
            return (
                <BuyBTN>
                    <Amount>IN CART</Amount>
                </BuyBTN>
            )
        }
    }

    return (
        <Container>
            <Wrapper>
                <Left>
                    <Image img={drumkit.img}></Image>
                </Left>

                <Right>
                    <Title>{drumkit.kitname}</Title>
                    <ProducerName>Sound Kit by {drumkit.producername}</ProducerName>
                    <Desc>{drumkit.desc}</Desc>
                    <ContentTitle>What you will get in this kit :</ContentTitle>
                    <Content>
                        {drumkit.contents.map(kit => (
                            <p>-{kit}</p>
                        ))}
                    </Content>
                    <ButtonsContainer>
                        {isTrackInCart(drumkit)}

                        <ShareButton onClick={() => { shareModalRef.current.open() }}>
                            <ShareIcon style={{ fontSize: 16, marginRight: 4 }} /> SHARE
                        </ShareButton>
                    </ButtonsContainer>
                </Right>
            </Wrapper>

            <ShareModal ref={shareModalRef}>
                <ShareModalContent page={"drumkitInfo/"} trackId={drumkit._id} />
            </ShareModal>
        </Container>
    )
}

export default DrumkitInfo