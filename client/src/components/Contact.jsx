import React, { useState } from 'react'
import styled from 'styled-components'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import { mobile } from "../responsive";
import { tablet } from "../responsive";
import { SERVER_URL } from '../requestMethods';

//const SERVER_URL = 'http://localhost:5000';

const Container = styled.div`
    width: 100vw;
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: black;
    padding: 0px 0px 20px 0px;
`;

const Title = styled.h1`
    margin-top: 30px;
    font-size: 40px;
    color: white;
`;

const Form = styled.form`
    margin-top: 50px;
    margin-bottom: 80px;
    width: 600px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    grid-row-gap: 40px;
    grid-column-gap: 20px;
    background-color: black;

    ${tablet({ gridTemplateColumns: "1fr", gridTemplateRows: "1fr 1fr 1fr 1fr 1fr", width: "300px" })}
`;

const InputContainer = styled.div`
    width: 100%;
    height: 50px;
    grid-column: 1 / 2;
    grid-row: 1 / 2;
    background-color: black;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    position: relative;

    ${tablet({ gridColumn: "1/3" })}
`;


const EmailContainer = styled.div`
    width: 100%;
    height: 50px;
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    background-color: black;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    position: relative;

    ${tablet({ gridColumn: "1/3", gridRow: "2/3" })}
`;
const SubjectContainer = styled.div`
    width: 100%;
    height: 50px;
    grid-column: 1 / 3;
    grid-row: 2 / 3;
    background-color: black;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    position: relative;

    ${tablet({ gridColumn: "1/3", gridRow: "3/4" })}
`;
const MessageContainer = styled.div`
    width: 100%;
    height: 50px;
    grid-column: 1 / 3;
    grid-row: 3 / 4;
    background-color: black;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    position: relative;

    ${tablet({ gridColumn: "1/3", gridRow: "4/5" })}
`;



const NameInput = styled.input`
    width: 100%;
    padding: 4px 0px;
    color: white;
    background-color: transparent;
    outline: none;
    border: none;
    border-bottom: 1px solid white;
    transition: border-bottom 0.2s ease;
    font-size: 16px;
    
    &::placeholder{
        color: #919090;
        font-weight: 500;
    }
    &:focus{
        border-bottom: 3px solid white;
    }
`;
const EmailInput = styled.input`
    width: 100%;
    padding: 4px 0px;
    color: white;
    background-color: transparent;
    outline: none;
    border: none;
    border-bottom: 1px solid white;
    transition: border-bottom 0.2s ease;
    font-size: 16px;
    &::placeholder{
        color: #919090;
        font-weight: 500;
    }
    &:focus{
        border-bottom: 3px solid white;
    }
`;
const SubjectInput = styled.input`

    width: 100%;
    padding: 4px 0px;
    color: white;
    background-color: transparent;
    outline: none;
    border: none;
    border-bottom: 1px solid white;
    transition: border-bottom 0.2s ease;
    font-size: 16px;
    &::placeholder{
        color: #919090;
        font-weight: 500;
    }
    &:focus{
        border-bottom: 3px solid white;
    }

`;
const MessageInput = styled.input`

    width: 100%;
    padding: 4px 0px;
    color: white;
    background-color: transparent;
    outline: none;
    border: none;
    border-bottom: 1px solid white;
    transition: border-bottom 0.2s ease;
    font-size: 16px;
    &::placeholder{
        color: #919090;
        font-weight: 500;
    }
    &:focus{
        border-bottom: 3px solid white;
    }
`;

const ButtonContainer = styled.div`
    grid-column: 2 / 3;
    grid-row: 4 / 5;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;

    ${tablet({ gridColumn: "1/3", gridRow: "5/6" })}
`;
const Button = styled.button`
    width: 150px;
    height: 50px;
    background-color: teal;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    font-weight: 700;
    cursor: pointer;
`;

const Error = styled.p`
    color: red;
    position: absolute;
    bottom: 0;
    left:0;
`;

const Success = styled.p`
    width: 150px;
    color: green;
    font-size: 14px;
    text-align: center;
`;
const Failed = styled.p`
    width: 150px;
    color: red;
    font-size: 14px;
    text-align: center;
`;


const Contact = () => {

    //0 - no value
    //1 - success
    //2 - failed
    const [success, setSuccess] = useState(0);

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            subject: "",
            message: ""

        },
        validationSchema: Yup.object({
            name: Yup.string()
                .max(10, "Must be less than 10 characters")
                .required("Required"),

            email: Yup.string()
                .email("Invalid email address")
                .required("Required"),

            subject: Yup.string()
                .max(50, "Must be less than 50 characters")
                .required("Required"),

            message: Yup.string()
                .max(200, "Must be less than 200 characters")
                .required("Required")
        }),

        onSubmit: (values, { resetForm }) => {

            // do your stuff 

            axios({
                method: 'post',
                url: SERVER_URL + "/api/messages",
                headers: {},
                data: {
                    name: values.name,
                    email: values.email,
                    subject: values.subject,
                    message: values.message
                }
            }).then(response => {
                if (response.status === 200) {
                    setSuccess(1);
                    resetForm();
                } else {
                    setSuccess(2);
                }
            }).catch(err => {
                console.log(err);
                setSuccess(2);
            });
        }

    });

    return (



        <Container>

            <Title>Contact</Title>

            <Form onSubmit={formik.handleSubmit}>
                <InputContainer>
                    <NameInput
                        id="name"
                        name="name"
                        type="text"
                        placeholder='Name'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}

                    >
                    </NameInput>
                    {formik.touched.name && formik.errors.name ? <Error>{formik.errors.name}</Error> : null}
                </InputContainer>

                <EmailContainer>
                    <EmailInput
                        id="email"
                        name="email"
                        type="email"
                        placeholder='Email'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    >
                    </EmailInput>
                    {formik.touched.email && formik.errors.email ? <Error>{formik.errors.email}</Error> : null}
                </EmailContainer>

                <SubjectContainer>

                    <SubjectInput
                        id="subject"
                        name="subject"
                        type="text"
                        placeholder='Subject'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.subject}
                    >
                    </SubjectInput>
                    {formik.touched.subject && formik.errors.subject ? <Error>{formik.errors.subject}</Error> : null}
                </SubjectContainer>


                <MessageContainer>
                    <MessageInput
                        id="message"
                        name="message"
                        type="text"
                        placeholder='Message'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.message}
                    >

                    </MessageInput>
                    {formik.touched.message && formik.errors.message ? <Error>{formik.errors.message}</Error> : null}
                </MessageContainer>


                <ButtonContainer>
                    <Button type="submit">
                        SEND MESSAGE
                    </Button>
                    {success === 2 ? <Failed>Failed</Failed> : success === 1 ? <Success>Sent</Success> : ''}

                </ButtonContainer>

            </Form>


        </Container>



    )
}

export default Contact