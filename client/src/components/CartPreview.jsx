import React, { useEffect, useRef, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux"
import { deleteTrack } from '../redux/cartRedux';
import { useDispatch } from "react-redux";
import { mobile } from "../responsive";
import { tablet } from "../responsive";


const CartPreviewContainer = styled.div`
  
  width: 350px;
  border-radius: 4px;
  position: absolute;
  right: 0;
  margin-right: 102px;
  background-color: black;
  color: white;
  
  z-index: 3;
  transition: 0.2s;
  overflow: hidden;

  ${props => {
    if (props.cartOpen) {
      return `
        height: fit-content;
        padding: 20px 20px 10px 20px;
        border: 1px solid #262626;
        opacity: 1;
      `;
    } else {
      return `
        opacity: 0;
        height: 0;
        padding: 0;
        border: 0px solid #262626;
      `;
    }

  }}

  .Link{
    width: 100%;
    text-decoration: none;
    color: white;
  }

  ${tablet({ marginRight: "0px", width: "100vw", boxSizing: "border-box" })}
`;

const Title = styled.h4`
  margin-bottom: 10px;
`;

const CartWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const ItemsContainer = styled.div`
  margin: 10px 0px;
  width: 100%;
  max-height: 300px;
  overflow-y: scroll;
  
`;

const Item = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  margin: 14px 0px;
`;

const CheckoutBtn = styled.div`
  width: 100%;
  height: 40px;
  border-radius: 4px;
  margin-top: 12px;
  background-color: teal;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const ContinueCheckout = styled.div`
  width: 100%;
  height: 40px;
  border-radius: 4px;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  
  &:hover{
    text-decoration: underline;
    cursor: pointer;
  }
`;

const ItemLeft = styled.div`
    width: 60px;
    height: 100%;
    border-radius: 6px;
    cursor: pointer;
`;
const ItemCenter = styled.div`
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 160px;
    margin-left: 10px;
    cursor: pointer;
`;
const ItemRight = styled.div`
  color: white;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-left: auto;
  margin-right: 6px;
`;
const Thumbnail = styled.div`
  height: 100%;
  width: 60px;
  border-radius: 6px;
  background-image: url(${props => (props.image)});
  background-size: cover;
  background-position: center;
`;
const TrackName = styled.div`
  font-weight: bold;
  font-size: 18px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  &:hover{
    text-decoration: underline;
  }
`;
const Type = styled.div`
  color: #878787;
`;
const Price = styled.div`
  font-weight: bold;
  margin-right: 6px;
  font-size: 14px;
  margin-bottom: 3px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
const Delete = styled.div`
  cursor: pointer;
`;



const CartPreview = (props) => {

  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const [cont, setCont] = useState(false);
  const ref = useRef(null);
  const { onClickOutside } = props;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target) && !props.cartButtonRef.current.contains(event.target)) {
        onClickOutside && onClickOutside(false);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [onClickOutside]);

  const handleContinue = () => {
    setCont(true);
    if (cont) {
      onClickOutside && onClickOutside(false);
    }
  }

  const handleDelete = (track) => {

    let updatedTracks = cart.tracks.filter(function (value) {
      return !(value._id === track._id && value.selectedLicense === track.selectedLicense);
    });
    dispatch(deleteTrack({ tracks: updatedTracks, price: track.selectedPrice }));
  }



  return (
    <CartPreviewContainer ref={ref} className="cart-preview" cartOpen={props.cartOpen}>
      <Title>YOUR CART ({cart.quantity}):</Title>
      <CartWrapper>
        <ItemsContainer>

          {cart.tracks.map((track => (
            <Item>
              <ItemLeft>
                <Thumbnail image={track.img}></Thumbnail>
              </ItemLeft>
              <ItemCenter>
                <TrackName><Link className="Link" to={"/trackinfo/" + track._id}>{track.trackname}</Link></TrackName>
                <Type>{track.selectedType}</Type>
              </ItemCenter>
              <ItemRight>
                <Price>${track.selectedPrice}</Price>
                <Delete><CloseIcon onClick={() => { handleDelete(track) }} /></Delete>
              </ItemRight>
            </Item>
          )))}

        </ItemsContainer>
        <Link className="Link" to="/cartreview">
          <CheckoutBtn>PROCEED TO CHECKOUT</CheckoutBtn>
        </Link>

        <ContinueCheckout onClick={handleContinue}>CONTINUE SHOPPING</ContinueCheckout>

      </CartWrapper>

    </CartPreviewContainer>
  )
}

export default CartPreview