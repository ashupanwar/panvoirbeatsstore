import styled from "styled-components";
import { useState } from "react";
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { restoreCart } from '../redux/cartRedux';
import { restoreCartContent } from '../redux/apiCalls';
import { mobile } from "../responsive";
import { tablet } from "../responsive";
import { Link } from "react-router-dom"

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;

  .Link{
    width: 40%;
    text-decoration: none;
  }
`;

const Wrapper = styled.div`
  width: 300px;
  padding: 20px;
  background-color: white;
  border-radius: 20px;
  ${mobile({ width: "75%" })}
`;

const Logo = styled.div`
  width: 100px; 
  height: 100px;
  background-image: url('img/Logo2.png');
  background-size: cover;
  border-radius: 50%;
  background-position: center;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;

  &:disabled{
    background-color: gray;
    cursor: not-allowed;
  }
`;

const LinkHelper = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ButtonSignUp = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: teal;
  padding: 15px 0px;
  font-size: 14px;
`;

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const { isFetching, error } = useSelector((state) => state.user);
  const user = useSelector((state) => state.user.currentUser);

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  }

  return (
    <Container>
      <Wrapper>
        <Logo></Logo>
        <Title>SIGN IN</Title>
        <Form>
          <Input placeholder="username" onChange={(e) => { setUsername(e.target.value) }} />
          <Input placeholder="password" type="password" onChange={(e) => { setPassword(e.target.value) }} />
          <ButtonContainer>
            <Button onClick={handleClick} disabled={isFetching}>LOGIN</Button>
            <Link className="Link" to="/register"><ButtonSignUp>SIGN UP</ButtonSignUp></Link>
          </ButtonContainer>
          {error && <Error>Something went wrong...</Error>}
          <LinkHelper>DO NOT YOU REMEMBER THE PASSWORD?</LinkHelper>
          <LinkHelper>CREATE A NEW ACCOUNT</LinkHelper>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
