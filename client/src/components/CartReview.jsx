import React, { useEffect, useState, useRef } from 'react'
import StripeCheckout from 'react-stripe-checkout';
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useSelector } from "react-redux"
import { deleteTrack } from '../redux/cartRedux';
import { useDispatch } from "react-redux";
import Modal from './Modal';
import NonProfitLicenseInfo from './NonProfitLicenseInfo'
import BasicLicenseInfo from './BasicLicenseInfo'
import ProfessionalLicenseInfo from './ProfessionalLicenseInfo'
import UnlimitedLicenseInfo from './UnlimitedLicenseInfo'
import { Link } from 'react-router-dom';
import { mobile, tablet, minitablet, largeTablet, smallTablet } from "../responsive";

const KEY = "pk_test_51LdrCNSIfiwhtUJcTqdwfXoYRoMSCVNPBouRCCDQaCE2FG8GVxvcKfUZuySZ3QpBVKvM94SfOZkWUedwk1DB0KqP00wDrpJtuR"

const Container = styled.div`
    width: 100vw;
    min-height: 500px;
    background-color: black;
    color: white;
    display: flex;
    justify-content: center;

    .Link{
    width: 100%;
    text-decoration: none;
    color: white;
  }
`;
const Wrapper = styled.div`
    width: 75%;
    @media only screen and (max-width: 660px) {
        width: 90%;
  }
`;
const Heading = styled.h1`
    text-align: center;
    margin-top: 30px;
    font-size: 40px;
`;
const Content = styled.div`
    width: 100%;    
    margin-top: 40px;
    display: flex;

    @media only screen and (max-width: 1220px) {
        flex-direction: column-reverse;
        align-items: center;
  }
`;
const Left = styled.div`
    background-color: black;
    flex: 1;
    box-sizing: border-box;
    padding: 0px 20px;
    @media only screen and (max-width: 1220px) {
        width: 100%;
  }
`;
const Right = styled.div`
    width: 350px;
    height: 400px;
    box-sizing: border-box;
    padding: 20px;
    border: 1px solid #292929;
    border-radius: 4px;
    display: flex;
    flex-direction: column;

    @media only screen and (max-width: 1220px) {
        margin-bottom: 30px;
  }

    hr{
        border: none;
        background-color: #292929;
        height: 1px;
    }
`;
const ColumnNames = styled.div`
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: 12px;
    color: #cfcfcf;

    @media only screen and (max-width: 860px) {
        display: none;
  }
`;
const ImageColumn = styled.div`
    width: 60px;
`;
const InfoColumn = styled.p`
    flex: 1;
    margin-left: 10px;
    
`;
const PriceColumn = styled.p`
    margin-left: 10px;
`;
const RLColumn = styled.div`
    width: 148px;
    margin-left: 20px;
`;
const CloseColumn = styled.div`
     margin-left: 10px;
     width: 30px;
`;
const Card = styled.div`
    width: 100%;   
    height: 60px;
    border: 1px solid black;
    margin: 10px 0px;
    display: flex;
    align-items: center;
`;
const Image = styled.div`
    height: 60px;
    width: 60px;
    border-radius: 6px;
    background-size: cover;
    background-position: center;

    ${props => {
        return `
            background-image: url(${props.image})
        `;
    }
    }

`;
const Info = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-left: 10px;
    height: 60%;
    justify-content: space-around;
`;
const Title = styled.p`
    max-width: 200px;
    font-size: 16px;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
`;
const License = styled.p`
    max-width: 200px;
    font-size: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #b0b0b0;

    @media only screen and (max-width: 660px) {
        max-width: 160px;
  }
  @media only screen and (max-width: 420px) {
        max-width: 60px;
  }
`;
const Price = styled.p`
    font-weight: bold;
    margin-left: 10px;
`;
const ReviewLicense = styled.div`
    width: 140px;
    height: 40px;
    background-color: white;
    color: black;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    font-size: 14px;
    margin-left: 20px;
    cursor: pointer;

    @media only screen and (max-width: 860px) {
        width: 60px;
        font-size: 10px;
        text-align: center;
  }

  @media only screen and (max-width: 500px) {
        display: none;
  }
    
`;

const NoButton = styled.div`
    width: 140px;
    margin-left: 20px;

    @media only screen and (max-width: 860px) {
        width: 60px;
  }

  @media only screen and (max-width: 500px) {
        display: none;
  }
`;

const Delete = styled.div`
    margin-left: 10px;
    color: gray;
    cursor: pointer;
`;

const GrossContainer = styled.div`
    width: 100%;
    height: 20px;
    display: flex;
    justify-content: space-between;
    font-weight: bold;
`;
const GrossTitle = styled.div`

`;
const GrossAmount = styled.div`

`;
const DiscountContainer = styled.div`
    width: 100%;
    height: 20px;
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    margin-top: 10px;
`;
const DiscountTitle = styled.div`

`;
const DiscountAmount = styled.div`

`;

const TotalContainer = styled.div`
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: space-between;
    font-size: 22px;
    font-weight: bold;
    color: #03ad34;
    margin-top: auto;
`;
const TotalTitle = styled.div`

`;
const TotalAmount = styled.div`

`;

const PaymentContainer = styled.div`
    width: 100%;
    margin-top: 10px;
`;
const Payment = styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-weight: bold;
    background-color: teal;
    border-radius: 4px;
    cursor: pointer;
`;
const Disclaimer = styled.div`
    font-size: 12px;
    text-align: center;
    margin-top: 10px;
`;
const Refund = styled.div`
    font-size: 12px;
    text-align: center;
    margin-top: 10px;

    a{
        text-decoration: underline;
        cursor: pointer;
    }
`;

const SummaryContainer = styled.div`
    margin-bottom: 20px;
    text-align: center;
`;
const SummaryTitle = styled.h1`

`;

const CartReview = () => {

    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const modalRef = useRef()

    const [license, setLicense] = useState(null);

    const onToken = (token) => {
        console.log(token)
    }

    const handleDelete = (track) => {

        let updatedTracks = cart.tracks.filter(function (value) {
            return !(value._id === track._id && value.selectedLicense === track.selectedLicense);
        });
        dispatch(deleteTrack({ tracks: updatedTracks, price: track.selectedPrice }));
    }

    const findLicenseInfo = () => {
        switch (license) {
            case "Non-Profit":
                return <NonProfitLicenseInfo />
                break;
            case "Basic":
                return <BasicLicenseInfo />
                break;
            case "Professional":
                return <ProfessionalLicenseInfo />
                break;
            case "UNLIMITED":
                return <UnlimitedLicenseInfo />
                break;
            default:
                break;
        }
    }


    return (
        <Container>
            <Wrapper>
                <Heading>Cart Review</Heading>
                <Content>
                    <Left>
                        <ColumnNames>
                            <ImageColumn></ImageColumn>
                            <InfoColumn>PRODUCT</InfoColumn>
                            <PriceColumn>PRICE</PriceColumn>
                            <RLColumn></RLColumn>
                            <CloseColumn></CloseColumn>
                        </ColumnNames>
                        {cart.tracks.map((track => (
                            <Card>
                                <Image image={track.img}></Image>
                                <Info>
                                    <Title><Link className="Link" to={"/trackinfo/" + track._id}>{track.trackname}</Link> </Title>
                                    <License>{`${track.selectedLicense} (${track.selectedItems})`}</License>
                                </Info>
                                <Price>${track.selectedPrice}</Price>
                                {track.selectedLicense === "Drumkit" ?
                                    <NoButton />
                                    :
                                    <ReviewLicense onClick={() => { setLicense(track.selectedLicense); modalRef.current.open(); }}>REVIEW LICENSE</ReviewLicense>
                                }
                                <Delete><CloseIcon onClick={() => { handleDelete(track) }} /></Delete>
                            </Card>
                        )))}
                    </Left>
                    <Right>
                        <SummaryContainer>
                            <SummaryTitle>Order Summary</SummaryTitle>
                        </SummaryContainer>
                        <GrossContainer>
                            <GrossTitle>Gross</GrossTitle>
                            <GrossAmount>${cart.total}</GrossAmount>
                        </GrossContainer>
                        <DiscountContainer>
                            <DiscountTitle>Discount</DiscountTitle>
                            <DiscountAmount>-$0.00</DiscountAmount>
                        </DiscountContainer>
                        <TotalContainer>
                            <TotalTitle>Total</TotalTitle>
                            <TotalAmount>${cart.total}</TotalAmount>
                        </TotalContainer>
                        <hr />
                        <PaymentContainer>
                            <StripeCheckout
                                name='panvoirbeats'
                                image='img/Logo2.png'
                                description={'Your total is $' + cart.total}
                                amount={cart.total * 100}
                                token={onToken}
                                stripeKey={KEY}
                            >
                                <Payment>PAY VIA STRIPE OR CREDIT CARD</Payment>
                            </StripeCheckout>

                        </PaymentContainer>
                        <Disclaimer>By clicking the button you accept the product(s) <br />License Agreement(s)</Disclaimer>
                        <Refund>Please read our <a>Refund Policy.</a></Refund>
                    </Right>
                </Content>
            </Wrapper>
            <Modal ref={modalRef}>
                {findLicenseInfo()}
            </Modal>
        </Container >
    )
}

export default CartReview