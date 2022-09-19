import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@material-ui/icons";
import Modal from '../components/Modal'
import TermsOfUse from '../components/TermsOfUse'
import PrivacyPolicy from '../components/PrivacyPolicy'
import styled from "styled-components";
import { useState, useRef } from "react";
import footimg from '../img/background1.jpg'
import { Link } from "react-router-dom";
import { mobile } from "../responsive";
import { tablet } from "../responsive";

const Container = styled.div`
  display: flex;
  padding: 50px 0px 100px 0px;
  color: white;
  background: linear-gradient(rgba(0,0,0,1),rgba(0,0,0,0)), url(${footimg});
  background-size: cover;
  background-position: top;

  .Link{
    color: white;
    text-decoration: none;
  }

  ${tablet({ flexDirection: "column", alignItems: "center" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1`
  margin-left: 30px;

  ${tablet({ marginLeft: "0px" })}
`;

const Desc = styled.p`
  margin-left: 70px;
  flex: 1;

  ${tablet({ marginLeft: "40px" })}
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  transition: 0.2s;

  &:hover{
    transform: scale(1.2);
  }
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
  cursor: pointer;
  transition: 0.2s;
  box-sizing: border-box;
  display: flex;

  &:hover{
    color: teal;
  }

  ${tablet({ justifyContent: "center" })}
  ${mobile({ width: "100%" })}

`;

const Right = styled.div`
  flex: 1;
  padding: 20px;

  display: flex;
  justify-content: center;
  align-items: flex-end;

`;


const Footer = () => {

  const modalRef = useRef()
  const [clickedPrivacy, setClickedPrivacy] = useState(false);

  return (
    <div>
      <Container>
        <Left>
          <Logo>panvoirbeats</Logo>
          <Desc>
            Producer | Beatmaker
          </Desc>
        </Left>
        <Center>
          <List>

            <ListItem><Link className="Link" to="/">Home</Link></ListItem>
            <ListItem> <Link className="Link" to="/faq">FAQ</Link></ListItem>
            <ListItem><Link className="Link" to="/allbeats/all">All Beats</Link></ListItem>
            <ListItem><Link className="Link" to="/contact">Contact</Link></ListItem>
            <ListItem><Link className="Link" to="/drumkits">Drumkits</Link></ListItem>
            <ListItem onClick={() => { modalRef.current.open(); setClickedPrivacy(false) }}>Terms of use</ListItem>
            <ListItem><Link className="Link" to="/licenseinfo">Licensing Info</Link></ListItem>
            <ListItem onClick={() => { modalRef.current.open(); setClickedPrivacy(true) }}>Privacy policy</ListItem>
            <ListItem><Link className="Link" to="/credits">Credits</Link></ListItem>

          </List>
        </Center>
        <Right>

          <SocialContainer>
            <a href='https://www.facebook.com/panvoirbeats'
              target="_blank"
              style={{ textDecoration: "none" }}>
              <SocialIcon color="3B5999">
                <Facebook />
              </SocialIcon>
            </a>

            <a href='https://www.instagram.com/panvoirbeats'
              target="_blank"
              style={{ textDecoration: "none" }}>
              <SocialIcon color="E4405F">
                <Instagram />
              </SocialIcon>
            </a>

            <a href='https://www.twitter.com/panvoirbeats'
              target="_blank"
              style={{ textDecoration: "none" }}>
              <SocialIcon color="55ACEE">
                <Twitter />
              </SocialIcon>
            </a>

            <a href='https://www.pinterest.com/panvoirbeats'
              target="_blank"
              style={{ textDecoration: "none" }}>
              <SocialIcon color="E60023">
                <Pinterest />
              </SocialIcon>
            </a>

          </SocialContainer>
        </Right>
      </Container>

      <Modal ref={modalRef}>
        {clickedPrivacy ? <PrivacyPolicy /> : <TermsOfUse />}
      </Modal>

    </div >
  );
};

export default Footer;
