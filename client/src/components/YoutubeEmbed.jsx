
import Embed from '../YoutubeEmbedVideo';

const YoutubeEmbed = () => {
    return (
        <>
            <div class="ratio ratio-16x9">
                <iframe src={Embed.url} width="400" height="320" frameBorder="0" title="panvoirbeats" allowFullScreen></iframe>
            </div>
        </>


    )
}

export default YoutubeEmbed