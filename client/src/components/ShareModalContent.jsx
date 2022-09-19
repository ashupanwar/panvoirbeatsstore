import React, { useState } from 'react'
import styled from 'styled-components'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { CLIENT_URL } from '../requestMethods';

//const CLIENT_URL = "https://panvoirbeats.com/"

const Container = styled.div`
    color: white;
    overflow: hidden;
`;

const Wrapper = styled.div`
    width: 98%;    
    height: 40px;
    display: flex;
    border: 1px solid ${props => (props.color)};
    border-radius: 4px;
    align-items: center;
    margin-top: 10px;
`;

const Input = styled.input`
    width: 75%;
    height: 36px;
    outline: none;
    font-size: 16px;
    background-color: transparent;
    color: white;
    border: none;
    flex: 1;
    box-sizing: border-box;
    padding: 0px 6px;
`;
const Copy = styled.div`
    width: 30px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;



const ShareModalContent = (props) => {

    const copy = CLIENT_URL + props.page + props.trackId;
    const [color, setColor] = useState("#8f8f8f");

    const handleClick = () => {
        navigator.clipboard.writeText(copy);
        setColor("green")
    }

    return (
        <Container>
            <Wrapper color={color}>
                <Input value={copy}></Input>
                <Copy onClick={handleClick}><ContentCopyIcon /></Copy>
            </Wrapper>

        </Container >
    )
}

export default ShareModalContent