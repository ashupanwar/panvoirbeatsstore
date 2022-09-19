import React, { useState } from 'react'
import styled from 'styled-components';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import MicNoneIcon from '@mui/icons-material/MicNone';
import PodcastsIcon from '@mui/icons-material/Podcasts';
import MicExternalOnIcon from '@mui/icons-material/MicExternalOn';
import LayersIcon from '@mui/icons-material/Layers';
import MovieIcon from '@mui/icons-material/Movie';
import RadioIcon from '@mui/icons-material/Radio';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { addTrack } from '../redux/cartRedux';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux"
import { mobile, minitablet, tablet, largeTablet, smallTablet } from "../responsive";

const Container = styled.div`
    min-height: 130px;
    background-color: #171717;
    border-radius: 6px;
    border: 1px solid #3d3d3d;
    margin: 0px 20px 10px 20px;
`;

const Wrapper = styled.div`
    display: flex;
    width: 100%;    
    min-height: 130px;
    box-sizing: border-box;
    padding: 20px;

    ${smallTablet({ flexDirection: "column" })}
`;
const Left = styled.div`
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
`;
const Title = styled.h3`
    margin-bottom: 6px;
`;
const Type = styled.p`
    font-size: 12px;
    font-weight: 600;
    color: #a8a8a8;
    margin-bottom: 30px;

    ${tablet({ marginBottom: "10px" })}
`;
const ShowMore = styled.p`
    width: fit-content;
    font-size: 14px;
    font-weight: 600;
    color: #a8a8a8;
    margin-top: auto;
    display: flex;
    align-items: center;
    cursor: pointer;

    
`;

const UsageTerms = styled.div`
    height: 120px;
    display: flex;
    flex-direction: column;
    /* remove flex wrap in mobile version */
    flex-wrap: wrap;

    ${largeTablet({ height: "240px", flexWrap: "nowrap" })}
    ${tablet({ height: "220px" })}
    

    ${props => {
        if (props.open) {
            return `
                display: flex
            `;
        } else {
            return `
                display: none
            `;
        }
    }}
`;

const Line = styled.div`
    width: 50%;
    display: flex;
    margin-bottom: 6px;

    ${largeTablet({ width: "100%" })}
    

`;
const Icon = styled.div`

`;
const Text = styled.p`
    font-size: 13px;
    font-weight: 500;
    margin-left: 10px;
    display: flex;
    align-items: center;
    margin-bottom: 4px;

    ${minitablet({ fontSize: "12px" })}
    ${mobile({ fontSize: "10px" })}
`;

const Right = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
`;

const ATCBTN = styled.div`
    min-width: 110px;
    height: 46px;
    background-color: teal;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
    margin-left: 10px;
    margin-right: 10px;
    cursor: pointer;
    color: black;

    ${smallTablet({ marginTop: "20px" })}
    ${tablet({ marginLeft: "auto" })}
`;

const Plus = styled.p`
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

const LicenseSelectCard = (props) => {


    const dispatch = useDispatch();
    const tracksInCart = useSelector(state => state.cart.tracks);

    const [open, setOpen] = useState(false);
    const track = props.track;

    const handleClick = () => {
        dispatch(addTrack({ track: { ...props.track, selectedLicense: props.license, selectedPrice: props.price, selectedItems: props.items, selectedType: "Track" }, quantity: 1, price: props.price }))
    }

    const isTrackInCart = (track) => {
        let res = tracksInCart.filter(function (value) {
            return (value._id === track._id && value.selectedLicense === props.license);
        });
        if (res.length === 0) {
            return (
                <ATCBTN onClick={handleClick}>
                    <ShoppingBagOutlinedIcon style={{ fontSize: 25 }} />
                    <Plus>+</Plus>
                    <Amount>${props.price}</Amount>
                </ATCBTN>
            )
        } else {
            return (
                <ATCBTN>
                    <Amount>IN CART</Amount>
                </ATCBTN>
            )
        }
    }

    return (
        <Container>
            <Wrapper>
                <Left>
                    <Title>{props.license}</Title>
                    <Type>{props.items}</Type>
                    <UsageTerms open={open}>
                        <Line>
                            <Icon><MicNoneIcon style={{ color: "teal" }} /></Icon>
                            <Text>{props.musicrecording}</Text>
                        </Line>
                        <Line>
                            <Icon><PodcastsIcon style={{ color: "teal" }} /></Icon>
                            <Text>{props.audiostream}</Text>
                        </Line>
                        <Line>
                            <Icon><MicExternalOnIcon style={{ color: "teal" }} /></Icon>
                            <Text>{props.performance}</Text>
                        </Line>
                        <Line>
                            <Icon><LayersIcon style={{ color: "teal" }} /></Icon>
                            <Text>{props.distribution}</Text>
                        </Line>
                        <Line>
                            <Icon><MovieIcon style={{ color: "teal" }} /></Icon>
                            <Text>{props.musicvideo}</Text>
                        </Line>
                        <Line>
                            <Icon><RadioIcon style={{ color: "teal" }} /></Icon>
                            <Text>{props.radio}</Text>
                        </Line>
                    </UsageTerms>
                    <ShowMore onClick={() => { setOpen(!open) }}>
                        {open ? <><KeyboardArrowUpIcon /> <p>Hide usage terms</p></>
                            : <><KeyboardArrowDownIcon /> <p>Show usage terms</p></>}

                    </ShowMore>
                </Left>

                <Right>
                    {isTrackInCart(track)}
                </Right>
            </Wrapper>
        </Container>
    )
}

export default LicenseSelectCard