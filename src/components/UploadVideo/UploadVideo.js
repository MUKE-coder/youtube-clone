import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAppContext } from "../../context/appContext";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../../lib/firebase";

const UploadVideo = ({ video, setVideo, handleClose }) => {
  const [progress, setProgress] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [thumbnailProgress, setThumbnailProgress] = useState(0);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailURL, setThumbnailURL] = useState(null);
  const [videoURL, setVideoURL] = useState(null);
  const [id, setID] = useState(uuidv4());

  const [thumbnailUploaded, setThumbnailUploaded] = useState(false);
  const [videoUploaded, setVideoUploaded] = useState(false);

  const { currentUser } = useAppContext();

  const createID = () => setID(uuidv4());
  const handleThumbnailChange = (e) => {
    if (e.target.files[0]) {
      setThumbnail(e.target.files[0]);
    }
  };

  const handleThumbnailUpload = () => {
    const uploadThumbnail = ref(storage, `thumbnails/${thumbnail.name}`);
    const uploadTask = uploadBytesResumable(uploadThumbnail, thumbnail);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progressPercent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setThumbnailProgress(progressPercent);
      },
      (error) => {
        console.log(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            setThumbnailURL(downloadURL);
            setThumbnailUploaded(true);
          })
          .catch((err) => console.log(err));
      }
    );
  };
  const handleUploadVideo = () => {
    const uploadVideo = ref(storage, `videos/${video.name}`);
    const uploadTask = uploadBytesResumable(uploadVideo, video);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progressPercent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progressPercent);
      },
      (error) => {
        console.log(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            setVideoURL(downloadURL);
            setVideoUploaded(true);
          })
          .catch((err) => console.log(err));
      }
    );
  };
  const handleSubmit = () => {
    createID();
    handleUploadVideo();
    handleThumbnailUpload();
  };

  useEffect(() => {
    if (thumbnailUploaded && videoUploaded) {
      addDoc(collection(db, "thumbnails"), {
        id: id,
        videoURL: videoURL,
        thumbnailURL: thumbnailURL,
        title: title,
        description: description,
        channelName: currentUser.displayName,
        email: currentUser.email,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      }).then(() => {
        setProgress(0);
        setVideo(null);
        setTitle("");
        setThumbnail("");
        setThumbnailURL("");
        setVideoURL("");
        setDescription("");
        handleClose();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thumbnailUploaded, videoUploaded]);
  return (
    <div>
      <div className="SelectVideo__header">
        <DialogTitle>Upload Video</DialogTitle>
        <Close className="selectvideo__closeIcon" onClick={handleClose} />
      </div>
      <Divider />
      <DialogContent>
        <DialogTitle>Details</DialogTitle>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Description"
          rows={10}
          variant="outlined"
          multiline
          fullWidth
          placeholder="Tell your viewers about your video"
          style={{ marginTop: "30px" }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="file"
          className="custom-file-input add-thumbnail"
          onChange={handleThumbnailChange}
        />
        <progress value={progress} max={100} />
        <DialogActions>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Upload
          </Button>
        </DialogActions>
      </DialogContent>
    </div>
  );
};

export default UploadVideo;
