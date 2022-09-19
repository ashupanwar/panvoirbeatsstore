import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import AllTracks from './AllTracks';
import axios from 'axios';
import Loading from './Loading';
import { SERVER_URL } from '../requestMethods';

//const SERVER_URL = 'http://localhost:5000';

const Container = styled.div`
    background-color: black;
`;

const Title = styled.h3`
    background-color: black;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 60px;
`;


const RelatedTracks = (props) => {

    const [trackId, setTrackId] = useState(props.trackId);

    useEffect(() => {
        setTrackId(props.trackId);
    }, [props.trackId])

    useEffect(() => {
        setTrackId(props.trackId);
    }, [trackId]);

    return (
        <Container>
            <Title>RELATED TRACKS</Title>
            <AllTracks from="related" query={null} trackId={trackId} />

        </Container>
    )
}

export default RelatedTracks