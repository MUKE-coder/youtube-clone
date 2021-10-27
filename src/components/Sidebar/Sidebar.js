import {
  ExpandMore,
  Home,
  OndemandVideo,
  Restore,
  Subscriptions,
  ThumbUp,
  VideoLibrary,
  WatchLater,
  Whatshot,
} from "@material-ui/icons";
import { useHistory } from "react-router";
import "./Sidebar.css";
const Sidebar = ({ changeWidth, searchChangeWidth }) => {
  const history = useHistory();
  const RedirectHome = () => history.push("/");
  return (
    <div
      className={`sidebar ${changeWidth && "sidebar__extraWidth"} ${
        searchChangeWidth && "sidebar__search"
      }`}
    >
      <div className="sidebar__buttons">
        <div
          onClick={RedirectHome}
          className="sidebar__btn sidebar__btn--active"
        >
          <Home className="sidebar__icon" />
          <p>Home</p>
        </div>

        <div className="sidebar__btn ">
          <Whatshot className="sidebar__icon" />
          <p>Trending</p>
        </div>

        <div className="sidebar__btn ">
          <Subscriptions className="sidebar__icon" />
          <p>Subscriptions</p>
        </div>
      </div>

      <div className="sidebar__buttons bottom">
        <div className="sidebar__btn ">
          <VideoLibrary className="sidebar__icon" />
          <p>Libraries</p>
        </div>

        <div className="sidebar__btn ">
          <Restore className="sidebar__icon" />
          <p>History</p>
        </div>

        <div className="sidebar__btn ">
          <OndemandVideo className="sidebar__icon" />
          <p>Your Videos</p>
        </div>

        <div className="sidebar__btn ">
          <WatchLater className="sidebar__icon" />
          <p>Watch Later</p>
        </div>

        <div className="sidebar__btn ">
          <ThumbUp className="sidebar__icon" />
          <p>Liked Videos</p>
        </div>

        <div className="sidebar__btn ">
          <ExpandMore className="sidebar__icon" />
          <p>Show More</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
