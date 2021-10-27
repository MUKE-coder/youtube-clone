import { Avatar } from "@material-ui/core";
import moment from "moment";
import { useHistory } from "react-router-dom";
import {
  videoThumbSearch,
  videothumb__thumbnail,
  videothumb__details,
  videothumb__channel,
  channel__top,
  videothumb__title,
  videothumb__text,
  videothumb__texts,
  search__avatar,
  subs,
  channel__bottom,
  description,
} from "./Search.module.css";
const SearchView = ({ video }) => {
  const history = useHistory();
  const handleThumbClick = () => history.push(`/watch/${video?.id}`);
  const handleAvatarClick = () => history.push("/previewChannel");

  const formatedDate = moment
    .unix(video?.timestamp?.seconds)
    .format("YYYYMMDD, HH:mm:ss");

  const uploadedTime = moment(formatedDate, "YYYYMMDD, HH:mm:ss").fromNow();
  return (
    <div className={videoThumbSearch}>
      <img
        src={video.thumbnailURL}
        alt="thumbnail"
        onClick={handleThumbClick}
        className={videothumb__thumbnail}
      />

      <div className={videothumb__details}>
        <div className={videothumb__channel}>
          <div className={channel__top}>
            <h1 className={videothumb__title}>{video.title}</h1>
            <p className={videothumb__text}>500 views . {uploadedTime}</p>
          </div>
          <div className={videothumb__texts}>
            <Avatar onClick={handleAvatarClick} className={search__avatar} />
            <p className={videothumb__text && subs}>
              {video.channelName} . 3.5M subscribers
            </p>
          </div>
          <div className={channel__bottom}>
            <p className={description}>{video.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchView;
