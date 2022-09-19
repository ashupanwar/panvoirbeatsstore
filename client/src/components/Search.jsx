import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import styled from 'styled-components';
import { mobile, minitablet, tablet, largeTablet, smallTablet } from "../responsive";

const Container = styled.div`
    width: 100vw;   
    height: 200px;
    background-color: black;
    color: white;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
`;
const Heading = styled.h1`
    margin-top: 30px;
    font-size: 40px;
`;
const SearchContainer = styled.div`
    margin-top: 30px;
    width: 50%;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 6px 10px;
    border-radius: 6px;

    ${largeTablet({ width: "70%" })}
`;
const Input = styled.input`
    font-size: 16px;
    margin-left: 4px;
    width:${props => props.text ? '100%' : '40%'};
    border: none;
    outline: none;
    transition: 0.3s ease;

    ${largeTablet({ width: "100%" })}
    ${minitablet({ fontSize: "12px" })}
    

    &:focus{
        width: 100%;
        font-size: 20px;
        ${minitablet({ fontSize: "13px" })}
    }
`;



const Search = (props) => {

    const [text, setText] = useState("");

    useEffect(() => {
        if (props.tag !== 'all' && props.tag !== undefined) {
            const input = document.querySelector('.search-input');
            input.value = decodeURIComponent(props.tag);
            props.setQuery(props.tag);
            setText(props.tag);
        }
    }, [props.tag])


    const handleKeyUp = () => {
        //console.log("fetching")
        let q = document.querySelector('.search-input');
        props.setQuery(q.value);
        setText(q.value);
    }


    function debounce(func, timeout = 300) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => { func.apply(this, args); }, timeout);
        };
    }

    const processChange = debounce(() => handleKeyUp())

    return (
        <Container>
            <Heading>All Beats</Heading>
            <SearchContainer>
                <SearchIcon style={{ color: "black", fontSize: 30 }} />
                <Input className="search-input" onKeyUp={processChange} placeholder='What type of track are you looking for?' text={text} />
            </SearchContainer>
        </Container>
    )
}

export default Search