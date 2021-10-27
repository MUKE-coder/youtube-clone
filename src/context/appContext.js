import { useContext, createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../lib/firebase";
// import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { onSnapshot, orderBy, query, collection } from "firebase/firestore";

const AppContext = createContext();
export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [appState, setAppState] = useState("empty");
  const [showUploadVideo, setShowUploadVideo] = useState(false);

  const [videos, setVideos] = useState([]);

  const [views, setViews] = useState(0);
  const [subscribers, setSubscribers] = useState(0);

  const [searchInput, setSearchInput] = useState("");
  const [channel, setChannel] = useState("");
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // Check for user status
      if (user) {
        setAppState("home");
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
        setAppState("login");
      }
    });
  }, []);

  useEffect(() => {
    onSnapshot(
      query(collection(db, "thumbnails"), orderBy("timestamp", "desc")),
      (snapshot) =>
        setVideos(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
    );
  }, []);

  const value = {
    channel,
    setChannel,
    setSearchInput,
    searchInput,
    appState,
    currentUser,
    showUploadVideo,
    setShowUploadVideo,
    videos,
    views,
    setViews,
    subscribers,
    setSubscribers,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
