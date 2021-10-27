import { useAppContext } from "../../context/appContext";
import "./Main.css";
import VideoThumb from "./VideoThumb";
const Main = () => {
  const { videos } = useAppContext();
  return (
    <div className="main">
      {videos.map(({ data }) => (
        <VideoThumb video={data} />
      ))}
    </div>
  );
};

export default Main;
