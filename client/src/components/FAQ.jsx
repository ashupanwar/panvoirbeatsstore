
import React from 'react'
import styled from 'styled-components'
import FAQContent from '../FAQContent'
import { mobile, minitablet, tablet, largeTablet, smallTablet } from "../responsive";


const Container = styled.div`
    width: 100vw;
    height: auto;
    display: flex;
    justify-content: center;
    background-color: black;
    color: white;
`;

const Wrapper = styled.div`
    width: 55%;
    padding: 0px 0px 50px 0px;

    ${tablet({ width: "90%" })}
`;
const Heading = styled.h1`
    text-align: center;
    margin-top: 30px;
    font-size: 40px;
`;
const Text = styled.h3`
    text-align: center;
    margin-top: 30px;
    margin-bottom: 40px;
`;
const Card = styled.div`
    padding: 20px 0px;
    display: flex;
    flex-direction: column;
`;
const Question = styled.b`

`;
const Answer = styled.i`

`;


const FAQ = () => {
    return (
        <Container>
            <Wrapper>
                <Heading>FAQ</Heading>
                <Text>Here you will find answers for most of your questions.</Text>
                {FAQContent.map(faq => (

                    <Card>
                        <Question>{faq.question}</Question>
                        <Answer>{faq.answer}</Answer>
                    </Card>

                ))}
            </Wrapper>

        </Container>
    )
}

export default FAQ