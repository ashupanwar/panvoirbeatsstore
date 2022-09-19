import React, { useRef } from 'react'
import styled from 'styled-components'
import Modal from '../components/Modal'


const Container = styled.div`
    height: 2000px;
`;

const Button = styled.button`
    height: 10px;
    width: 10px;
    margin-top: 1000px;
    padding: 30px;
`;

const Test = () => {

    const modalRef = useRef()

    return (

        <Container>
            <Button onClick={() => { modalRef.current.open() }}>Click me</Button>
            <Modal ref={modalRef}>
                Hello World!
            </Modal>
        </Container>

    )
}

export default Test