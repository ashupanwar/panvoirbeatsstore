import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion/dist/framer-motion'
import './ModalScrollbar.css'
import CloseIcon from '@mui/icons-material/Close';
import styled from 'styled-components';

const Container = styled.div`
    overflow: hidden;
    z-index: 3;

    /* body{
        ${props => {
        if (props.open) {
            document.querySelector('body').style.overflowY = "hidden";
        } else {
            document.querySelector('body').style.overflowY = "scroll";
        }
    }}
    } */
`;

const BackdropStyle = {
    position: "fixed",
    height: "100vh",
    width: "100vw",
    top: "0",
    left: "0",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
}

const WrapperStyle = {
    position: "fixed",
    width: "300px",
    height: "100px",
    backgroundColor: "#242424",
    margin: "auto",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
    padding: "20px"
}

const CloseBtnStyle = {
    marginLeft: "auto",
    backgroundColor: "transparent",
    color: "white",
    border: "none",
    paddingRight: "10px",
    fontSize: "30px",
    cursor: "pointer"
}

const ContentStyle = {
    width: "100%",
    height: "100%",
    color: "white",
    backgroundColor: "#242424",
    display: "flex",
    flexDirection: "column",
}

const Top = styled.div`
    display: flex;
    align-items: center;
`;
const Heading = styled.h3`

`;


const ShareModal = forwardRef((props, ref) => {

    useImperativeHandle(ref, () => {
        return {
            open: () => { setOpen(true) },
            close: () => { setOpen(false) }
        }
    })

    const [open, setOpen] = useState(false);

    return (

        <Container open={open}>
            <AnimatePresence>
                {open && (
                    <>
                        <motion.div
                            initial={{
                                opacity: 0,

                            }}
                            animate={{
                                opacity: 1,
                                transition: {
                                    duration: 0.2
                                }
                            }}
                            exit={{
                                opacity: 0,
                                transition: {
                                    delay: 0.3
                                }
                            }}
                            onClick={() => { setOpen(false) }}
                            style={BackdropStyle}
                            className="modal-backdrop" />
                        <motion.div
                            initial={{
                                scale: 0,

                            }}
                            animate={{
                                scale: 1,
                                transition: {
                                    duration: 0.1
                                }
                            }}
                            exit={{
                                scale: 0,
                                transition: {
                                    delay: 0.1
                                }
                            }}
                            style={WrapperStyle}
                            className="modal-content-wrapper">
                            <motion.div
                                initial={{
                                    y: 30,
                                    opacity: 0
                                }}
                                animate={{
                                    y: 0,
                                    opacity: 1,
                                    transition: {
                                        duration: 0.1,
                                        delay: 0.1
                                    }
                                }}
                                exit={{
                                    y: 30,
                                    opacity: 0,
                                    transition: {
                                        duration: 0.1
                                    }
                                }}
                                style={ContentStyle}
                                className="modal-content">

                                <Top>
                                    <Heading>Share</Heading>
                                    <button style={CloseBtnStyle} onClick={() => { setOpen(false) }} className='close-btn'>
                                        <CloseIcon />
                                    </button>
                                </Top>



                                {props.children}



                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </Container>
    )
}
)

export default ShareModal