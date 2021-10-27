import { Avatar } from "@material-ui/core";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { useAppContext } from "../../context/appContext";

const VideoThumb = ({ video }) => {
  const { channel, setChannel } = useAppContext();
  const history = useHistory();
  const handleThumbClick = () => history.push(`/watch/${video?.id}`);
  const handleAvatarClick = () => {
    history.push(`/previewChannel/`);
  };

  const formatedDate = moment
    .unix(video?.timestamp?.seconds)
    .format("YYYYMMDD, HH:mm:ss");

  const uploadedTime = moment(formatedDate, "YYYYMMDD, HH:mm:ss").fromNow();
  return (
    <div className="videothumb">
      <img
        src={video.thumbnailURL}
        alt="thumbnail"
        onClick={handleThumbClick}
        className="videothumb__thumbnail"
      />

      <div className="videothumb__details">
        <Avatar onClick={handleAvatarClick} />
        <div className="videothumb__channel">
          <h1 className="videothumb__title">{video.title}</h1>
          <div className="videothumb__texts">
            <p className="videothumb__text">{video.channelName}</p>
            <p className="videothumb__text">500 views . {uploadedTime}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoThumb;
