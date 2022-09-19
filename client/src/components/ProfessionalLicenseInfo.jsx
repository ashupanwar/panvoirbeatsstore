import React from 'react'
import styled from 'styled-components'


const Container = styled.div`
    padding-right: 20px;
    li{
        color: #a1a1a1;
    }
    
`;

const Heading = styled.h2`
    color: #bababa;
`;
const I = styled.i`
    color: #a6a6a6;
`;
const P = styled.p`
    color: #a1a1a1;
`;
const Bold = styled.strong`
    font-size: 16px;
    color: #a6a6a6;
`;

const Strong = styled.strong`
    font-size: 18px;
    color: #a6a6a6;
`;

const Title = styled.h2`

`;

const ProfessionalLicenseInfo = () => {

    const date = new Date();

    return (
        <Container>
            <Title>License Preview</Title>
            <br /><br />
            <P>This Non-Exclusive <Bold>Professional</Bold> License Agreement (the “Agreement”), having been made on and effective as of <Bold>{date.toString()}</Bold> (the “Effective Date”) by and between <Bold>Producer Name</Bold> p/k/a <Bold>PanvoirBeats</Bold> (the “Producer” or “Licensor”); and <Bold>Licensee</Bold> residing at <Bold>[N/A]</Bold> (“You” or “Licensee”), sets forth the terms and conditions of the Licensee’s use, and the rights granted in, the Producer’s instrumental music file entitled <Bold>The Beat Title (Contract Preview Only)</Bold> (the “Beat”) in consideration for Licensee’s payment of <Bold>$99.98</Bold> (the “License Fee”), on a so-called <Bold>“Professional”</Bold> basis.</P>
            <br />
            <P>This Agreement is issued solely in connection with and for Licensee's use of the Beat pursuant and subject to all terms and conditions set forth herein.</P>
            <br />
            <ol style={{ listStyleType: "number" }}>
                <li><Bold>License Fee:</Bold>Producer's receipt of a $99.98 licensee fee (the “Professional License Fee”) from you is a precondition to this Professional License Agreement</li>
                <br />
                <li><Bold>Delivery of the Beat: </Bold>Following receipt of the Premium + Tracked Out License Fee and execution of this Premium + Tracked Out License Agreement, Producer will email a link to the Beat in 24-bit/44.1k WAV and 320kbps MP3 file format, along with “tracked out” stem files for the Beat (as such terms are understood in the music industry), to the email address you provided to Producer.</li>
                <br />
                <li><Bold>Term:</Bold>The Term of this Premium + Tracked Out License Agreement shall be in perpetuity (unless terminated earlier pursuant to the terms of this Agreement).</li>
                <br />
                <li><Bold>Use of the Beat:</Bold>
                    <ul>
                        <br />
                        <li><Bold>Non-Exclusive.</Bold>The Beat is being licensed to you on a non-exclusive basis, which means for example without limitation that Producer may continue to exploit the Beat and/or license it to other third parties.</li>
                        <br />
                        <li><Bold>Making One New Song.</Bold>You will have a limited, non-exclusive, nontransferable license to create one (1) new, substantially different (i.e., with substantial unique addition) derivative musical composition (the “New Composition”) and one (1) new derivative master recording (the “New Recording”) incorporating the Beat. For example, you may choose to record your own topline vocals over the Beat, and/or incorporate all or portions/samples of the Beat into the instrumental music of a New Composition and New Recording. You will have the right to modify the arrangement, tempo, duration, and/or pitch of the Beat in preparation of the New Composition and New Recording. You will not have the right to sublicense the New Composition and/or New Recording to third parties (e.g., you may not permit anyone to “sample” your New Recording in a subsequent master recording).</li>
                        <br />
                        <li><Bold>For Sale and Streaming.</Bold>You may exploit and/or permit exploitation of the New Composition and New Recording in nonpaid and/or paid uses—e.g., where people don't have to pay to listen to and/or download it, and where they do. For example, you may release the New Recording for free download, include it on a free mixtape or free compilation of music, or release it on non-monetized digital streaming service (such as SoundCloud); and you may also sell physical copies of it (e.g., on CD), or release it for sale on a digital service platform (such as iTunes or Amazon Music), or release it on a monetized digital streaming service (such as Spotify or Apple Music).</li>
                        <br />
                        <li><Bold>10,000 Copy/500,000 Stream Cap.</Bold>Your rights to exploit a New Composition and New Recording are subject to a maximum aggregate number of five hundred thousand (500,000) streams and ten thousand (10,000) copies (physical, or digital downloads), across all services and platforms (for illustrative example, if the Video had 250,000 plays on YouTube and the New Recording had 250,001 streams on SoundCloud, that would be a breach of this paragraph). If you are approaching the foregoing cap on your rights to use the Beat, New Composition, and New Recording, you must either remove the New Composition and New Recording from all platforms, or you must purchase a new higher-level license of the Beat from Producer (e.g., an Unlimited License), before exceeding the foregoing cap.</li>
                        <br />
                        <li><Bold>Public Performances.</Bold>You may perform the New Recording (and/or underlying New Composition) publicly (for example, in a live concert performance, at a festival, or in a nightclub), and even if people are paying to see you perform. Any recording of a live performance of the New Composition shall be subject to the same terms of this Premium + Tracked Out License Agreement (i.e., and would qualify as a New Recording hereunder).</li>
                        <br />
                        <li><Bold>No Radio.</Bold>You may not pitch, submit or permit the pitching or submission of the New Composition and New Recording for performance on terrestrial, satellite, or internet radio (e.g., over-the-air radio, Sirius XM, Pandora, etc.)—any such use would require your purchase of an Unlimited License in connection with the Beat.</li>
                        <br />
                        <li><Bold>One Video.</Bold>You may synchronize (use) the New Composition and New Recording in one (1) audiovisual work (“Video”). The duration of the Video can't exceed the longer of: (i) five (5) minutes; and (ii) the duration of the New Composition as embodied on the New Recording. The Video can't be used to promote any third-party product or service—it can only be used to promote the New Composition and New Recording. You may exploit the Video only on free-access internet video platforms (e.g., YouTube, Vimeo, Instagram, Facebook, and/or Vevo), and you may not monetize the Video (on those platforms or otherwise). The description of the Video on such video platforms must include credit to Ramoon as producer. You may not license or permit the Video to be broadcast on television networks, or to be otherwise licensed to third parties. For the avoidance of doubt, the New Composition and/or New Recording (and/or Beat) may not be synchronized with or incorporated in any other audiovisual work—for example without limitation, in any commercial, television show, film, or video game.</li>
                        <br />
                        <li><Bold>One Signature Tag.</Bold>Only one signature tag in the beginning of the beat which can't be removed.</li>
                        <br />
                        <li><Bold>No ContentID Registration.</Bold>You may not register or permit the registration of the New Composition and/or New Recording with any content identification system or service (for example without limitation, with YouTube's ContentID, whether directly or through a third party such as CDBaby or TuneCore). This is a non-exclusive license agreement, and the Beat may have been or may yet be licensed to third parties for their own use; if any licensed users of the Beat tried to register their derivative songs, the content identification system might improperly flag all other users of the Beat as infringing uses. Licensee reserves the sole right to register or permit the registration of the Beat or any work derivative of the Beat with content identification systems and services.</li>
                        <br />
                        <li><Bold>No Direct Use of the Beat.</Bold>For the avoidance of doubt, you are not getting any right to exploit the Beat directly, only to create and exploit a New Composition and New Recording that incorporates the Beat along with sufficient new and unique material to distinguish the New Composition and New Recording from and not directly compete with the Beat.</li>
                    </ul>
                </li>
            </ol>
            <br />
            <P><Bold>PRO Registration:</Bold>Producer has written and composed the Beat, which is commonly treated as one-half of the total songwriting on a musical composition (and you agree that Producer retains a 50% ownership of the copyright in the New Composition). You agree that any registration of the New Composition with relevant performance rights organizations (e.g., ASCAP, BMI, etc.) will reference Producer having 50% of the total writer's share under <Bold> Ashu Panwar</Bold> and 50% of the total publisher's share under <Bold>Create Digital Music IPI (Number here)</Bold> . Royalties: In addition to the Premium + Tracked Out License Fee, you agree to pay the following royalties to Producer, either by directing the distributor of your records to do so (i.e., your record label, or the digital distribution company you use, e.g., DistroKid), or by doing so yourself (e.g., to PayPal ID: panvoir@gmail.com or via Producer banking information that may be provided upon emailed request)</P>
            <ul>
                <br />
                <li><Bold>Mechanical Royalties.</Bold>When a copy of a master recording like the New Recording is sold (either on a CD, or when someone buys it on a service like iTunes) or streamed (e.g., on a service like Apple Music or Spotify), copyright law requires that the songwriters get paid a royalty called a mechanical license. You agree to make sure that Producer is paid mechanical royalties for Producer's 50% songwriting share of the New Composition, at the minimum statutory rate.</li>
                <br />
                <li><Bold>Producer Royalties.</Bold>For Producer's production of the Beat you intend to use in the New Recording, you agree to pay Producer 50% of everything you make from the New Recording.</li>
            </ul>
            <br />
            <P><Bold>Credit:</Bold>You will have the right to use and permit others to use Producer's approved name “Panvoir” for purposes of the New Recording and “Prod.By Panvoir” for purposes of the New Composition, but solely in connection with uses of the New Composition and New Recording permitted hereunder. You will use best efforts to have Producer credited as a “producer” of the New Recording (e.g., “Produced by Panvoir”) in any and all metadata, liner notes, and/or other customary place for such credits in connection with all exploitations of the New Recording and/or New Composition (as applicable), and in a manner no less favorable to Producer than credit accorded to any other producer or songwriter of the master recordings and musical compositions (respectively) bundled with the New Recording and/or New Composition. In the event of any failure to have Producer properly credited, you will use reasonable efforts to cure such failure immediately on a prospective basis.</P>
            <br />
            <P><Bold>Ownership:</Bold>The Producer is and shall remain the sole owner and holder of all right, title, and interest in the Beat, including all copyrights to and in the sound recording and the underlying musical compositions written and composed by Producer. Nothing contained herein shall constitute an assignment by Producer to Licensee of any of the foregoing rights. You may not register or attempt to register (or permit the registration or attempted registration) of the Beat with the U.S. Copyright Office. You may own a copyright to the extent of your contributions embodied in the New Song and New Recording (e.g., your topline lyrics, melody, and/or other new instrumental elements), but any registration or claim of copyright as to the New Song and/or New Recording must be as a derivative work disclaiming any ownership to the copyright(s) in the Beat. For the avoidance of doubt, there is no intention of the parties for the New Composition and/or New Recording to constitute a joint work for purposes of copyright law, and Producer does not herein grant to you any rights in or to any other derivative works that may have been or may yet be created by third parties based on the Beat. Producer reserves to itself any and all rights in and to the Beat not expressly granted to you herein. You will, upon request, execute, acknowledge and deliver to Producer such additional documents as Producer may deem necessary to evidence and effectuate Producer's rights hereunder, and you hereby grant to Producer the right as attorney-in-fact to execute, acknowledge, deliver and record in the U.S. Copyright Office or elsewhere any and all such documents if you fail to execute same within five (5) days after so requested by Producer.</P>
            <br />
            <P><Bold>Breach by You: </Bold>
                <ul>
                    <br />
                    <li>Producer represents and warrants that Producer has the full right and ability to enter into this Unlimited License Agreement and grant those rights granted herein. Producer warrants that the exploitations of the Beat permitted hereunder will not infringe upon or violate any common law or statutory right of any person, firm, or corporation; including, without limitation, contractual rights, copyrights, and right(s) of privacy and publicity and will not constitute libel and/or slander.</li>
                    <br />
                    <li>You represent and warrant that exploitation of the New Composition and/or New Recording hereunder will not infringe upon or violate any common law or statutory right of any person, firm, or corporation; including, without limitation, contractual rights, copyrights, and right(s) of privacy and publicity and will not constitute libel and/or slander. Just to be clear, Producer takes no responsibility whatsoever as to any elements added to the New Composition and/or New Recording by Licensee or any third party, and Licensee indemnifies and holds Producer harmless for any and all such elements.</li>
                    <br />
                    <li>Parties hereto shall indemnify and hold each other harmless from any and all third party claims, liabilities, costs, losses, damages, judgments, costs, and expenses as are actually incurred by the non-defaulting party (including, without limitation, reasonable attorneys' fees) arising in connection with any breach or claim of breach of this Unlimited License Agreement by the defaulting party, their agents, heirs, successors, assigns and employees, which have been reduced to final judgment or settled with the defaulting party's consent. The non-defaulting party shall give the defaulting party prompt written notice of all claims giving rise to indemnification obligations hereunder, and the defaulting party shall have the right to participate in the defense of such claims with counsel of its choice at its sole expense</li>
                </ul>
            </P>
            <br />
            <P><Bold>Miscellaneous:</Bold>In no event shall Artist be entitled to seek injunctive or any other equitable relief for any breach or non-compliance with any provision of this Professional License Agreement. This Professional License Agreement constitutes the entire understanding of the parties and cannot be changed or waived, in whole or in part, except in writing signed by both parties hereto. This Professional License Agreement supersedes all prior agreements between the parties, whether oral or written. Should any provision of this Professional License Agreement be held to be void, invalid or inoperative, such decision shall not affect any other provision hereof, and the remainder of this Professional License Agreement shall be effective as though such void, invalid or inoperative provision had not been contained herein. No failure by Producer hereto to perform any of its obligations hereunder shall be deemed a material breach of this agreement until you give Producer written notice of its failure to perform, and such failure has not been corrected within thirty (30) days of notice (or, if such breach is not reasonably capable of being cured that quickly, Producer does not commence to cure such breach within said time period, and proceed with reasonable diligence thereafter). This agreement shall be governed by and interpreted in accordance with the laws of the State of Nevada applicable to agreements entered into and wholly performed in said State, without regard to any conflict of laws principles. You hereby agree that the exclusive jurisdiction and venue for any action, suit or proceeding based upon any matter, claim or controversy arising hereunder or relating hereto shall be in the state or federal courts located in the State of Nevada, Clark County. You don't have the right to make any money off the Beat, the New Composition, or the New Recording except as specifically allowed in this Professional License Agreement. You shall be deemed to have signed, affirmed and ratified your acceptance of the terms of this Professional License Agreement by virtue of your payment of the Professional License Fee to Producer and your electronic acceptance of the terms and conditions (e.g., at the time of your payment of the Professional License Fee).</P>


        </Container>

    )
}

export default ProfessionalLicenseInfo