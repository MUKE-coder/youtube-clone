import "./PreviewChannel.css";
import img from "../../assets/channelArt.png";
import { Avatar, Button } from "@material-ui/core";
import { VideoSmall } from "..";
import { useAppContext } from "../../context/appContext";
const PreviewChannel = ({ channel }) => {
  const { videos } = useAppContext();
  return (
    <div className="channel">
      <img src={img} alt="Channel art" className="channel__art" />
      <div className="channel__details">
        <div className="channel__detailsWrap">
          <div className="channel__avatarWrap">
            <Avatar className="channel__avatar" />
            <div className="videothumb__channel">
              <h1 className="channel__title">JB WEBDEVELOPER</h1>
              <p className="videothumb__text watch__subCount">
                4.85M Subscribers
              </p>
            </div>
          </div>
          <Button
            className="watch__subBtn channel__subBtn"
            color="primary"
            variant="contained"
          >
            SUBSCRIBE
          </Button>
        </div>
        <div className="channel__links">
          <div className="channel__link">
            <p>HOME</p>
          </div>
          <div className="channel__link channel__link--active">
            <p>VIDEOS</p>
            <div className="channel__link__border"></div>
          </div>
          <div className="channel__link">
            <p>COMMUNITY</p>
          </div>
          <div className="channel__link">
            <p>PLAYLISTS</p>
          </div>
          <div className="channel__link">
            <p>CHANNELS</p>
          </div>
          <div className="channel__link">
            <p>ABOUT</p>
          </div>
        </div>
      </div>
      <div className="channel__content">
        <div className="channel__contentWrapper">
          {videos
            .filter(({ data }) => data.channelName)
            .map(({ data }) => (
              <VideoSmall channelView video={data} key={data.id} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default PreviewChannel;
