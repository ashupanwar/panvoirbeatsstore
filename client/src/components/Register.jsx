import React, { useState } from 'react'
import styled from 'styled-components';
import { register } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { mobile } from "../responsive";
import { tablet } from "../responsive";


const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: black;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Wrapper = styled.div`
    width: 400px;
    height: 500px;
    display: flex;
    flex-direction: column;
    background-color: white;
    align-items: center;
    justify-content: flex-start;
    box-sizing: border-box;
    padding: 20px;
    border-radius: 20px;

    h1{
        color: black;
    }

    ${mobile({ width: "75%", padding: " 20px 0px" })}
`;
const Logo = styled.div`
    width: 100px;
    height: 100px;
    background-image: url('img/Logo2.png');
    background-size: cover;
    background-position: center;
    border-radius: 50%;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  margin-top: 10px;
  margin-bottom: 20px;
`;
const Input = styled.input`
    border: 1px solid black;
    padding: 10px;
    width: 75%;

    margin-bottom: 12px;
`;

const Button = styled.button`
    width: 82%;
    height: 40px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: teal;
    border-radius: 4px;
    border: none;
    cursor: pointer;

    &:disabled{
        background-color: gray;
        cursor: not-allowed;
  }
`;

const Error = styled.span`
    color: red;
`;

const Register = () => {

    const { isFetching, error } = useSelector((state) => state.user);

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");
    const [mismatchPass, setMisMatchPass] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password === cpassword) {
            register(dispatch, { email, username, password });
        } else {
            setMisMatchPass(true);
        }
    }

    return (
        <Container>
            <Wrapper>
                <Logo></Logo>
                <Title>SIGN IN</Title>
                <Input id='email' placeholder='Email' onChange={(e) => { setEmail(e.target.value) }}></Input>
                <Input id='username' placeholder='Username' onChange={(e) => { setUsername(e.target.value) }}></Input>
                <Input id='password' placeholder='Password' onChange={(e) => { setPassword(e.target.value) }}></Input>
                <Input id='cpassword' placeholder='Confirm Password' onChange={(e) => { setCpassword(e.target.value) }}></Input>
                <Button onClick={handleSubmit} disabled={isFetching}>SIGN UP</Button>
                {error && <Error>Something went wrong...</Error>}
                {mismatchPass && <Error>Please type in the same password</Error>}


            </Wrapper>
        </Container>
    )
}

export default Register