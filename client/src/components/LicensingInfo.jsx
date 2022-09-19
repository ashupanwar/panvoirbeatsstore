import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import LicenseInfo from '../LicenseInfoContent'
import StarIcon from '@mui/icons-material/Star';
import Modal from './Modal';
import NonProfitLicenseInfo from './NonProfitLicenseInfo'
import BasicLicenseInfo from './BasicLicenseInfo'
import ProfessionalLicenseInfo from './ProfessionalLicenseInfo'
import UnlimitedLicenseInfo from './UnlimitedLicenseInfo'
import { mobile } from "../responsive";
import { tablet } from "../responsive";
import { largeTablet } from "../responsive";

const Container = styled.div`
    width: 100vw;
    min-height: 750px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: black;
    
`;

const Title = styled.h1`
    margin-top: 20px;
    margin-bottom: 20px;
    color: white;
`;

const Wrapper = styled.div`
    margin-top: 20px;
    width: 100%;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    overflow-x: scroll;

    ::-webkit-scrollbar {
        height: 4px;
    }

    ${largeTablet({ justifyContent: "flex-start", width: "90%" })}
`;

const Card = styled.div`
    min-width: 220px;
    max-width: 220px;
    border: 1px solid black;
    padding: 10px;
    margin: 0px 4px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border-radius: 6px;

    ${props => {
        if (props.isPopular) {
            return `
                color: black;
                background-color: teal;
            `;
        } else {
            return `
                color: white;
                background-color: black;
            `;
        }
    }}

    ${largeTablet({ minWidth: "100%", maxWidth: "100%" })}

`;

const Popular = styled.div`
    display: flex;
    align-items: center;
    margin-top: 12px;
    ${props => {
        if (props.isPopular) {
            return `
                opacity: 1
            `;
        } else {
            return `
                opacity: 0
            `;
        }
    }}
`;
const Star = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
const PopularTitle = styled.p`

    font-size: 12px;
    font-weight: bold;
    margin-top: 3px;

`;
const Name = styled.p`
    margin-top: 16px;
    font-weight: 600;
`;
const Price = styled.h1`
    margin-top: 6px;
    font-size: 40px;
`;
const Type = styled.p`
    margin-top: 10px;
    font-size: 12px;
    font-weight: bold;
`;
const Details = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    padding: 0px 20px;
`;
const Text = styled.p`
    text-align: center;
    font-size: 12px;
    font-weight: bold;
    line-height: 20px;
`;
const Button = styled.div`
    height: 40px;
    width: 100%;
    margin-top: 16px;
    background-color: teal;
    border-radius: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    cursor: pointer;

    ${largeTablet({ width: "240px" })}

    ${props => {
        if (props.isPopular) {
            return `
                background-color: black;
                color: white;
            `;
        } else {
            return `
                background-color: teal;
                color: black;
            `;
        }
    }}
`;
const BulkDeals = styled.p`
    margin-top: 16px;
    font-size: 13px;
    font-weight: 600;
    margin-bottom: 6px;
`;
const DealText = styled.h4`
    margin-bottom: 2px;
`;

const LicensingInfo = () => {

    const modalRef = useRef()

    const [license, setLicense] = useState(null);

    const findLicenseInfo = () => {
        switch (license) {
            case "Non-Profit":
                return <NonProfitLicenseInfo />
                break;
            case "Basic":
                return <BasicLicenseInfo />
                break;
            case "Professional":
                return <ProfessionalLicenseInfo />
                break;
            case "UNLIMITED":
                return <UnlimitedLicenseInfo />
                break;

            default:
                break;
        }
    }

    return (
        <>
            <Container>
                <Title>Licensing Info</Title>
                <Wrapper>
                    {LicenseInfo.map(license => (
                        <Card isPopular={license.isPopular}>
                            <Popular isPopular={license.isPopular}>
                                <Star>
                                    <StarIcon style={{ fontSize: 16 }} />
                                </Star>
                                <PopularTitle>POPULAR</PopularTitle>
                            </Popular>
                            <Name>{license.name}</Name>
                            <Price>${license.price}</Price>
                            <Type>{license.type}</Type>
                            <Details>
                                {license.details.map(det => (
                                    <Text>{det}</Text>
                                ))}
                            </Details>
                            <Button isPopular={license.isPopular} onClick={() => { setLicense(license.name); modalRef.current.open(); }} >READ LICENSE</Button>
                            <BulkDeals>Bulk deals:</BulkDeals>
                            {license.bulkDeals.map(bulkdeal => (
                                <DealText>{bulkdeal}</DealText>
                            ))}
                        </Card>

                    ))};
                </Wrapper>
            </Container >
            <Modal ref={modalRef}>
                {findLicenseInfo()}
            </Modal>
        </>
    )
}

export default LicensingInfo