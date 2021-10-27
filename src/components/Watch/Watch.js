import "./Watch.css";
import {
  MoreHoriz,
  PlaylistAdd,
  Reply,
  ThumbDownAlt,
  ThumbUpAlt,
} from "@material-ui/icons";
import { Avatar, Button } from "@material-ui/core";
import { VideoSmall } from "..";
import { useHistory } from "react-router";
import { useState } from "react";
import moment from "moment";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { v4 as uuidv4 } from "uuid";
import { useAppContext } from "../../context/appContext";

const Watch = ({ video, vidId }) => {
  const history = useHistory();
  const avatarRedirect = () => history.push("/previewChannel");
  const { subscribers, videos, setSubscribers } = useAppContext();
  const [showDesc, setShowDesc] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  //LIKE STATE
  const [likeCount, setLikeCount] = useState(10);
  const [disLikeCount, setDisLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisLiked, setIsDisLiked] = useState(false);
  const [id, setID] = useState(uuidv4());
  const createID = () => setID(uuidv4());
  const formatedDate = moment
    .unix(video?.timestamp?.seconds)
    .format("MMM DD, YYYY");

  const subscribe = () => {
    createID();
    addDoc(collection(db, "subscribers"), {
      id: id,
      subscribers: subscribers,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    }).then(() => {
      setSubscribed(!subscribe);
    });
  };
  const handleSubscribe = () => {
    if (subscribed) {
      setSubscribers(subscribers - 1);
      setSubscribed(false);
      subscribe();
    } else {
      setSubscribers(subscribers + 1);
      setSubscribed(true);
      subscribe();
    }
  };

  const onLikeClick = () => {
    if (!isLiked) {
      setLikeCount(likeCount + 1);
      setIsLiked(true);
    } else {
      setLikeCount(likeCount - 1);
      setIsLiked(false);
    }
  };
  const onDisLikeClick = () => {
    if (!isDisLiked) {
      setDisLikeCount(disLikeCount + 1);
      setIsDisLiked(true);
    } else {
      setDisLikeCount(disLikeCount - 1);
      setIsDisLiked(false);
    }
  };
  return (
    <div className="watch">
      <div className="watch__wrap">
        <div className="watch__left">
          <video controls autoPlay className="watch__video">
            <source src={video.videoURL} type="video/mp4" />
          </video>
          <div className="watch__leftBtn">
            <h1 className="watch__title">{video.title}</h1>
            <div className="watch__videoInfo">
              <div className="watch__videoInfoLeft">
                <p className="videothumb__text">123 views . {formatedDate}</p>
              </div>
              <div className="watch__videoInfoRight">
                <div className="watch_likeContainer">
                  <div className="watch__likeWrap">
                    <div className="watch__likeBtnContainer color--gray">
                      <ThumbUpAlt
                        className="watch__icon"
                        onClick={onLikeClick}
                      />
                      <p>{`${likeCount}k`}</p>
                    </div>
                    <div className="watch__likeBtnContainer color--gray">
                      <ThumbDownAlt
                        className="watch__icon"
                        onClick={onDisLikeClick}
                      />
                      <p>{`${disLikeCount}k`}</p>
                    </div>
                  </div>
                  <div className="watch__likeDislikes"></div>
                </div>
                <div className="watch__likeBtnContainer color--gray">
                  <Reply className="watch__icon share-icon" />
                  <p>SHARE</p>
                </div>
                <div className="watch__likeBtnContainer color--gray">
                  <PlaylistAdd className="watch__icon play-addIcon" />
                  <p>SAVE</p>
                </div>
                <div className="watch__likeBtnContainer color--gray">
                  <MoreHoriz className="watch__icon play-addIcon" />
                </div>
              </div>
            </div>
          </div>
          <div className="watch__details">
            <div className="watch__detailsContainer">
              <div className="videothumb__details watch__avatarWrap">
                <Avatar onClick={avatarRedirect} />
                <div className="videothumb__channel" onClick={avatarRedirect}>
                  <h1 className="videothumb__title">{video.channelName}</h1>
                  <p className="videothumb__text watch__subCount">
                    4.08M Subscribers
                  </p>
                </div>
              </div>

              <Button
                className="watch__subBtn"
                color={subscribed ? "secondary" : "primary"}
                variant="contained"
                onClick={handleSubscribe}
              >
                {subscribed ? "UN SUBSCRIBE" : "SUBSCRIBE"}
              </Button>
            </div>
            <div className="watch__description">
              <p style={{ maxHeight: showDesc && "100%" }}>
                {video.description}
              </p>

              <p
                onClick={() => setShowDesc(!showDesc)}
                className="watch__showMore"
              >
                SHOW {showDesc ? "LESS" : "MORE"}
              </p>
            </div>
          </div>
        </div>
        <div className="watch__right">
          {videos
            .filter(({ data }) => data.id !== vidId)
            .map(({ data }) => (
              <VideoSmall video={data} key={data.id} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Watch;
