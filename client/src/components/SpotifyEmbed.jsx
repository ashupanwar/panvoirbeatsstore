import Embed from '../YoutubeEmbedVideo';

const SpotifyEmbed = (props) => {
    return (
        <iframe style={{ borderRadius: "12px " }} src={props.url} width="100%" height="80" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>


    )
}

export default SpotifyEmbed