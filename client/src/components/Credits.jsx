import React from 'react'
import styled from 'styled-components';
import SpotifyEmbed from './SpotifyEmbed'
import links from '../SpotifyContent'


const Container = styled.div`
    width: 100vw;
    height: auto;
    background-color: black;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;

`;

const Heading = styled.h1`
    margin-top: 30px;
    font-size: 40px;
`;
const Logo = styled.div`
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background-image: url('img/Logo2.png');
    background-size: cover;
    background-position: center;
    margin-top: 30px;
`;
const Biography = styled.h2`
    margin-top: 20px;
`;
const Desc = styled.p`
    margin-top: 20px;
    font-size: 14px;
    font-weight: 600;
`;
const Inquires = styled.p`
    margin-top: 20px;
    font-size: 14px;
    font-weight: 600;
`;
const Discography = styled.h2`
    margin-top: 100px;
    font-size: 40px;
`;
const Wrapper = styled.div`
    margin-top: 30px;
    width: 70%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    
`;
const Card = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 300px;
    margin: 20px 14px;
`;
const Role = styled.p`
    font-size: 14px;
    color: #b8b8b8;
    font-weight: 600;
    margin-left: 6px;
    margin-top: 4px;
`;

const Credits = () => {
    return (
        <Container >

            <Heading>Credits</Heading>
            <Logo></Logo>
            <Biography>Biography</Biography>
            <Desc>Producer | Beatmaker</Desc>
            <Inquires>Inquiries : panvoir@gmail.com</Inquires>
            <Discography>Discography</Discography>
            <Wrapper>

                {links.map(link => (
                    <Card>
                        <SpotifyEmbed url={link.url} />
                        <Role>Role: {link.role}</Role>
                    </Card>

                ))}

            </Wrapper>

        </Container>
    )
}

export default Credits