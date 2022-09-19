import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;   
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: black;
    overflow-x: hidden;
`;

const Loading = () => {
    return (
        <Container>
            <CircularProgress style={{ color: "white" }} />
        </Container>
    )
}

export default Loading