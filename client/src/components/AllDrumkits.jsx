import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link } from "react-router-dom";
import axios from 'axios';
import Loading from './Loading';
import { SERVER_URL } from '../requestMethods';


//const SERVER_URL = 'http://localhost:5000';

const Container = styled.div`
    width: 100vw;
    height: auto;
    background-color: black;
    color: white;
    display: flex;
    justify-content: center;

    .Link{
        color: white;
        text-decoration: none;
        margin-right: 30px;
    }

`;

const Wrapper = styled.div`

    width: 75%;
    font-size: 22px;
    padding: 0px 0px 60px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const Heading = styled.h1`
    margin-top: 30px;
    font-size: 40px;
`;
const List = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-top: 50px;
    justify-content: center;
    align-items: center;
`;
const Card = styled.div`
    width: 250px;
    height: 440px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;
const Image = styled.div`
    width: 250px;
    height: 250px;
    background-image: url(${props => (props.img)});
    background-position: center;
    background-size: cover;
    border-radius: 10px;
    cursor: pointer;
`;
const Title = styled.h4`
    width: 100%;
    font-size: 20px;
    margin-top: 10px;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;

    &:hover{
        text-decoration: underline;
    }
`;
const Price = styled.p`
    font-size: 15px;
    font-weight: 500;
    margin-top: 6px;
`;
const Button = styled.div`
    width: 90px;
    height: 40px;
    background-color: teal;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
    color: black;
    margin-top: 14px;
    border-radius: 4px;
    cursor: pointer;
`;

const AllDrumkits = () => {

    const [soundKits, setSoundKits] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let res = await axios.get(SERVER_URL + '/api/drumkits');
            setSoundKits(res.data);
        }
        fetchData();
    }, [])


    return (
        <Container>
            <Wrapper>
                <Heading>DrumKits</Heading>
                <List>
                    {!soundKits ? <Loading /> : soundKits.map(kit => (
                        <Link className="Link" to={"/drumkitInfo/" + kit._id}>
                            <Card>

                                <Image img={kit.img}></Image>
                                <Title>{kit.kitname}</Title>
                                <Price>${kit.price}</Price>
                                <Button>DETAILS</Button>

                            </Card>
                        </Link>


                    ))}
                </List>
            </Wrapper>

        </Container >
    )
}

export default AllDrumkits