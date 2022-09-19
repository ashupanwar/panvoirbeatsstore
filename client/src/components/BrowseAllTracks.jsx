import React from 'react'
import styled from 'styled-components'
import { Link } from "react-router-dom";

const Container = styled.div`
    width: 100vw;
    height: 100px;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 20px;

    .Link{
        color: black;
        text-decoration: none;
    }
`;

const Button = styled.div`
    width: 200px;
    height: 50px;
    background-color: teal;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    font-size: 15px;
    cursor: pointer;
`;

const BrowseAllTracks = () => {
    return (
        <Container>
            <Link className="Link" to="/allbeats/all">
                <Button>BROWSE ALL TRACKS</Button>
            </Link>

        </Container>
    )
}

export default BrowseAllTracks