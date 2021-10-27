import "./VideoSmall.css";
import moment from "moment";
import { useHistory } from "react-router";
const VideoSmall = ({
  channelView = false,
  search = false,
  video,
  
}) => {
  const history = useHistory();
  const handleClickRedirect = () => history.push(`/watch/${video.id}`);
  const formatedDate = moment
    .unix(video?.timestamp?.seconds)
    .format("YYYYMMDD, HH:mm:ss");

  const uploadedTime = moment(formatedDate, "YYYYMMDD, HH:mm:ss").fromNow();
  return (
    <div
      onClick={handleClickRedirect}
      className={`videoSmall ${channelView && "videoSmall__channelView"} ${
        search && "videoSmall__search"
      }`}
    >
      <div className="videoSmall__left">
        <img
          src={video?.thumbnailURL}
          alt="thumbnail"
          className={`videoSmall__thumbnail ${
            channelView && "videoSmall__channelView__img"
          } ${search && "videoSmall__search__img"}`}
        />
      </div>
      <div className="videoSmall__right">
        <p className="videoSmall__title">{video?.title}</p>

        <div className="videoSmall__texts videothumb__texts">
          {!channelView && (
            <p className="videothumb__text">{video.channelName}</p>
          )}
          <p className="videothumb__text">110k views . {uploadedTime} </p>
        </div>
      </div>
    </div>
  );
};

export default VideoSmall;
