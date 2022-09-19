import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import axios from 'axios';
import { Link } from "react-router-dom";
import { mobile } from "../responsive";
import { tablet } from "../responsive";
import { SERVER_URL } from '../requestMethods';

//const SERVER_URL = 'http://localhost:5000';


const Container = styled.div`
    width: 100vw;
    height: 500px;
    background-color: black;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    .Link{
        color: white;
        text-decoration: none;
        margin: 0px 10px;
    }
    .AllDrumkitsLink{
        color: white;
        text-decoration: none;
        margin-top: 60px;
    }

    ${tablet({ height: "fit-content" })}
`;
const Heading = styled.h1`
    margin-top: 30px;
    color: white;
`;
const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    margin-bottom: 0px;
    background-color: black;
    color: white;

    ${tablet({ flexDirection: "column" })}
`;

const CardContainer = styled.div`
    width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    
`;

const Card = styled.div`
    width: 100%;
    height: 100%;
    background-color: black;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;

    ${tablet({ marginBottom: "26px" })}
`;
const Image = styled.div`
    width: 100%;
    height: 180px;
    background-image: url(${props => (props.img)});
    background-size: cover;
    background-position: center;
    border-radius: 4px;
    
`;
const Title = styled.a`
    width: 100%;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    margin-top: 10px;

    &:hover{
        text-decoration: underline;

    }
`;
const Price = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: bold;
    margin-top: 10px;
    color: white;
`;
const BrowseAllButton = styled.div`
    width: 200px;
    height: 50px;
    background-color: teal;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    font-size: 15px;
    padding: 0px 10px;
    cursor: pointer;

    ${tablet({ marginBottom: "36px" })}
`;

const FeaturedSoundKit = () => {

    const [soundKits, setSoundKits] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let res = await axios.get(SERVER_URL + '/api/drumkits?new=true');
            setSoundKits(res.data);
        }
        fetchData();
    }, [])


    return (
        <Container>

            <Heading>Sound Kits</Heading>
            <Wrapper>
                {soundKits.map(kit => (
                    <Link className="Link" to={"/drumkitInfo/" + kit._id}>
                        <CardContainer>

                            <Card>
                                <Image img={kit.img} />
                                <Title>{kit.kitname}</Title>
                                <Price>${kit.price}</Price>
                            </Card>

                        </CardContainer>
                    </Link>


                ))}
            </Wrapper>
            <Link className="AllDrumkitsLink" to="/drumkits">
                <BrowseAllButton>BROWSE ALL SOUND KITS</BrowseAllButton>
            </Link>


        </Container>
    )
}

export default FeaturedSoundKit