import { Badge } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { AccountCircleOutlined, Close, ShoppingBagOutlined } from "@mui/icons-material";
import MenuIcon from '@mui/icons-material/Menu';
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";
import { tablet } from "../responsive";
import CartPreview from "./CartPreview";
import logo from '../img/Logo.png'
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import { dropCart } from '../redux/cartRedux';
import { logout } from '../redux/userRedux';
import { updateCart } from '../redux/apiCalls';
import HomeIcon from '@mui/icons-material/Home';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import QuizIcon from '@mui/icons-material/Quiz';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';


const Container = styled.div`
  height: 60px;
  background-color: black;
  position: sticky; 
  top: 0;
  z-index: 100;

  .Link{
    color: white;
    text-decoration: none;
  }

  .ListItem{
    ${tablet({ display: "none", })}
  }

  .menu-button{
    display: none;
    ${tablet({ display: "block", })}
  }

  

  ${mobile({

  //height: "50px"

})}
  
`;

const Wrapper = styled.div`
  height: 100%;
  padding: 0px 20px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const SearchContainer = styled.div`
  position: relative;
  /* border: 0.5px solid lightgray; */
  display: flex;
  align-items: center;
  margin-left: 10px;
  padding: 5px;
  transition: 0.5s;

  ${tablet({ display: "none", })}
`;

const Input = styled.input.attrs({
  type: 'input'
})`
  border: none;
  width: 0px;
  margin-left: 30px;
  background-color: transparent;
  font-size: 20px;
  color: white;
  transition: 0.3s;

  &:focus{
    outline: none;
  }

  ${props => {
    if (props.open) {
      return `
        width: 150px;
        padding: 4px 10px;
      `;
    } else {
      return `
        width: 0px;
        padding: 0px;
      `;
    }
  }}


`;


const CloseContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    overflow: hidden;
    cursor: pointer;
    transition: 0.4s;

    ${props => {
    if (props.open) {
      return `
          width: 20px;
          opacity: 1;
        `;
    } else {
      return `
          width: 0px;
          opacity: 0;
        `;
    }
  }}
`;


const Logo = styled.div`
  background-image: url(${logo});
  background-position: center;
  background-size: cover;
  width: 40px; 
  height: 40px;
  border: 1px solid black;
  cursor: pointer;
  ${mobile({ fontSize: "24px" })}
`;


const Right = styled.div`
  flex: 2;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: flex-end;
`;

const MenuItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: white;
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  transition: 0.3s;

  ${props => {
    if (props.visible) {
      return `
        opacity: 1;
      `;
    } else {
      return `
        opacity: 0;
        transform: translateX(150px);
      `;
    }
  }}

  &::after{
    transition: 0.3s;
    opacity: 0;
    content: '';
    width: 0%;
    height: 4px;
    background-color: white;
    position: absolute;
    bottom: 0;
  }

  &:hover::after{
    opacity: 1;
    content: '';
    width: 110%;
    height: 4px;
    background-color: white;
    position: absolute;
    bottom: 0;
  }

  ${mobile({ marginLeft: "18px" })}
  
`;

const searchStyle = {
  position: "absolute",
  color: "white",
  fontSize: 25,
  padding: 0,
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}

const searchContainerStyle = {

}

const CartAmount = styled.p`
  color: white;
  margin-left: 12px;

  ${mobile({ display: "none", })}
`

const Login = styled.p`
  color: white;
  margin-left: 4px;
`

const MenuItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MenuIconStyle = {
  color: "white",
  marginRight: "10px"

}

const Drawer = styled.div`
  position: absolute;
  top: 60px; 
  background-color: black;
  width: 200px; 
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: 0.2s;

  ${props => {
    if (props.drawerOpen) {
      return `
        left: 0px;
      `;
    }
    else {
      return `
        left: -200px;
      `;
    }
  }}

`;

const DrawerItem = styled.div`
  height: 52px;
  display: flex;
  align-items: center;

  .drawerIcon{
    margin:0px 18px;
  }
`;

const MobileSearchContainer = styled.div`
  position: relative;
  /* border: 0.5px solid lightgray; */
  display: none;
  align-items: center;
  margin-right: 10px;
  padding: 5px;
  transition: 0.5s;

  ${tablet({ display: "flex", })}
`;

const MobileInputContainer = styled.div`
  width: 100vw;
  height: 60px;
  padding: 0px 20px;
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  background-color: black;
  z-index: 2;
  box-sizing: border-box;
  transition: 0.2s;

  ${props => {
    if (props.mobileSearch) {
      return `
        right: 0;
      `;
    } else {
      return `
        right: -100vw;
      `;
    }
  }}
`;

const MobileInput = styled.input`
  border: none;
  flex: 1;
  margin-left: 30px;
  background-color: transparent;
  font-size: 20px;
  color: white;
  transition: 0.3s;
  

  &:focus{
    outline: none;
  }
`;


const Navbar = (props) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [visible, setvisible] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);

  const [cartOpen, setCartOpen] = useState(false);

  const cartRef = useRef();
  const drawerRef = useRef();
  const ref = useRef();

  const quantity = useSelector(state => state.cart.quantity);
  const total = useSelector(state => state.cart.total);
  const tracks = useSelector(state => state.cart.tracks);
  const user = useSelector(state => state.user.currentUser);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target) && !drawerRef.current.contains(event.target)) {
        setDrawerOpen && setDrawerOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [setDrawerOpen]);

  useEffect(() => {
    //console.log(inputValue);
  }, [inputValue]);

  const toggleSearch = () => {
    if (!open) {
      document.getElementById("input").focus();
    }
    setOpen(!open);
    setvisible(!visible);
  }

  const takeInput = (e) => {
    setInputValue(e.target.value);

    //set the search query which will reflect in the search box in featured page
    props.setSearchQuery && props.setSearchQuery(e.target.value);
    if (e.key === "Enter") {
      //Go to all beats page with the e.target.value as prop and perform search

      e.target.value = "";
      setInputValue("");
      toggleSearch();

      let q = inputValue.trim();

      q && navigate('/allbeats/' + q)
    }
  }

  const handleClickOnCartButton = () => {
    setCartOpen(!cartOpen);
  }

  const handleLogout = () => {

    let cart = {
      quantity,
      total,
      tracks,
      userId: user._id
    }

    //console.log(user)

    updateCart(user, cart);

    dispatch(logout());
    dispatch(dropCart());
  }

  const handleDrawerClick = () => {
    setDrawerOpen(!drawerOpen);
  }

  const handleMobileSearch = () => {
    setMobileSearch(!mobileSearch);
  }

  return (
    <Container>
      <Drawer drawerOpen={drawerOpen} ref={ref}>
        <Link className="Link" to="/"><DrawerItem className="DrawerItem" ><HomeIcon className="drawerIcon" />Home</DrawerItem></Link>
        <Link className="Link" to="/allbeats/all"><DrawerItem className="DrawerItem" ><MusicNoteIcon className="drawerIcon" />All Beats</DrawerItem></Link>
        <Link className="Link" to="/drumkits"><DrawerItem className="DrawerItem" ><GraphicEqIcon className="drawerIcon" />Drumkits</DrawerItem></Link>
        <Link className="Link" to="/FAQ"><DrawerItem className="DrawerItem" ><QuizIcon className="drawerIcon" />FAQ</DrawerItem></Link>
        <Link className="Link" to="/credits"><DrawerItem className="DrawerItem" ><EmojiEventsIcon className="drawerIcon" />Credits</DrawerItem></Link>
        <Link className="Link" to="/contact"><DrawerItem className="DrawerItem" ><ContactSupportIcon className="drawerIcon" />Contact</DrawerItem></Link>
      </Drawer>
      <Wrapper>
        <Left>
          <MenuIcon className="menu-button" style={MenuIconStyle} onClick={handleDrawerClick} ref={drawerRef} />
          <Link to="/">
            <Logo></Logo>
          </Link>

        </Left>
        <Right>

          <MenuItem className="ListItem" visible={visible}><Link className="Link" to="/allbeats/all">All Beats</Link></MenuItem>
          <MenuItem className="ListItem" visible={visible}><Link className="Link" to="/drumkits">Drumkits</Link></MenuItem>
          <MenuItem className="ListItem" visible={visible}><Link className="Link" to="/FAQ">FAQ</Link></MenuItem>
          <MenuItem className="ListItem" visible={visible}><Link className="Link" to="/credits">Credits</Link></MenuItem>
          <MenuItem className="ListItem" visible={visible}><Link className="Link" to="/contact">Contact</Link></MenuItem>

          <SearchContainer style={searchContainerStyle}>
            <Search style={searchStyle} onClick={toggleSearch} />
            <Input id="input" open={open} placeholder="Search" onKeyUp={takeInput} onBlur={() => { setOpen(false); setvisible(true) }} />
            <CloseContainer open={open}>
              <Close style={{ fontSize: 30 }} />
            </CloseContainer>
          </SearchContainer>

          <MobileSearchContainer>
            <Search style={searchStyle} onClick={handleMobileSearch} />
          </MobileSearchContainer>

          <MobileInputContainer mobileSearch={mobileSearch}>
            <Search style={searchStyle} />
            <MobileInput id="mobile-input" placeholder="Search" onKeyUp={takeInput} onBlur={() => { setMobileSearch(false); }} />
            <Close style={{ color: "white", fontSize: 30 }} onClick={() => { setMobileSearch(false) }} />
          </MobileInputContainer>




          <MenuItem ref={cartRef} visible={true} onClick={handleClickOnCartButton}>
            <MenuItemContainer>
              <Badge badgeContent={quantity} color="secondary">
                <ShoppingBagOutlined />
              </Badge>
              <CartAmount>${total}</CartAmount>
            </MenuItemContainer>
          </MenuItem>

          {user ?
            <MenuItem visible={true} onClick={handleLogout}>
              <Link className="Link" to="/login">
                <MenuItemContainer>
                  <AccountCircleOutlined />
                  <Login>Logout</Login>
                </MenuItemContainer>
              </Link>
            </MenuItem> :

            <MenuItem visible={true}>
              <Link className="Link" to="/login">
                <MenuItemContainer>
                  <AccountCircleOutlined />
                  <Login>Login</Login>
                </MenuItemContainer>
              </Link>
            </MenuItem>
          }

        </Right>
      </Wrapper>
      <CartPreview cartOpen={cartOpen} onClickOutside={setCartOpen} cartButtonRef={cartRef} />

    </Container >
  );
};

export default Navbar;
