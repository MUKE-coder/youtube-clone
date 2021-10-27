import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Slide,
} from "@material-ui/core";
import { Close, Publish } from "@material-ui/icons";
import React, { useState } from "react";
import { useAppContext } from "../../context/appContext";
import "./SelectVideo.css";
import UploadVideo from "./UploadVideo";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const SelectVideo = () => {
  const { showUploadVideo, setShowUploadVideo } = useAppContext();
  const handleClose = () => setShowUploadVideo(false);

  const [video, setVideo] = useState(null);
  const handleVideoChange = (e) => {
    if (e.target.files[0]) {
      setVideo(e.target.files[0]);
    }
  };

  return (
    <div>
      <Dialog
        TransitionComponent={Transition}
        open={showUploadVideo}
        keepMounted
      >
        {video ? (
          <UploadVideo
            video={video}
            setVideo={setVideo}
            handleClose={handleClose}
          />
        ) : (
          <>
            <div className="SelectVideo__header">
              <DialogTitle>Upload Video</DialogTitle>
              <Close className="selectvideo__closeIcon" onClick={handleClose} />
            </div>
            <Divider />
            <DialogContent className="selectvideo__dialog">
              <div className="selectvideo__publishWrap">
                <Publish className="selectvideo__publishIcon " />
              </div>
              <div className="selectvideo__texts">
                <div className="sv__texts__title">
                  <p>Drag and drop your video to upload</p>
                  <p>Your video will be private until you publish them</p>
                </div>
                <input
                  onChange={handleVideoChange}
                  type="file"
                  className="custom-file-input"
                />
                <p className="sv__texts__prpo">
                  By submitting your videos to Youtube, you acknowledge that you
                  agree to Youtube's Terms of Service and comunity Guidelines.
                  Please be sure not to violate others' copyright or privacy
                  rights. Learn More
                </p>
              </div>
            </DialogContent>
          </>
        )}
      </Dialog>
    </div>
  );
};

export default SelectVideo;
