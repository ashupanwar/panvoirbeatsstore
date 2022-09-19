
import Embed from '../YoutubeEmbedVideo';

const YoutubeEmbedMobile = () => {
    return (
        <>
            <div class="ratio ratio-16x9">
                <iframe src={Embed.url} width="300" height="220" frameBorder="0" title="panvoirbeats" allowFullScreen></iframe>
            </div>
        </>


    )
}

export default YoutubeEmbedMobile