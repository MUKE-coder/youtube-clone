import { Avatar, Badge, Button, makeStyles, Popover } from "@material-ui/core";
import {
  Apps,
  CameraAltOutlined,
  Menu,
  Notifications,
  PersonAddOutlined,
  Search,
  VideoCall,
} from "@material-ui/icons";
import { useState } from "react";
import { useHistory } from "react-router";
import logo from "../../assets/logo1.png";
import { useAppContext } from "../../context/appContext";
import { auth } from "../../lib/firebase";
import "./Header.css";
const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));
const Header = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const history = useHistory();
  const homeRedirect = () => history.push("/");
  const searchRedirect = () => history.push("/search");
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const { currentUser, searchInput, setSearchInput, setShowUploadVideo } =
    useAppContext();

  return (
    <div className="header">
      <div className="header__left" onClick={homeRedirect}>
        <Menu className="header__menuIcon" />
        <img src={logo} alt="Youtube" className="header__logo" />
      </div>
      <form className="header__center">
        <input
          type="search"
          className="header__input"
          value={searchInput}
          placeholder="Search"
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <Button className="header__btn" onClick={searchRedirect}>
          <Search className="header__searchIcon" />
        </Button>
      </form>
      <div className="header__right">
        <VideoCall onClick={() => setShowUploadVideo(true)} />
        <Apps className="header__appsIcon" />
        <Notifications className="header__notificationIcon" />
        <Avatar onClick={handleClick} />
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <div className="home__popoverContainer">
            <div className="home__popover__top">
              <Badge
                overlap="circle"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                badgeContent={
                  <div className="home__badge">
                    <CameraAltOutlined className="home__camera" />
                  </div>
                }
              >
                <Avatar className={classes.large} />
              </Badge>
              <div className="home__text">
                <div className="home__displayName">
                  {currentUser?.displayName}
                </div>
                <div className="home__email">{currentUser?.email}</div>
              </div>
              <div className="home__btn">Manage your google account</div>
            </div>
            <div className="home__popover__btm">
              <div className="home__addBtn">
                <PersonAddOutlined className="home__addIcon" />
                <p>Add another Account</p>
              </div>
              <Button
                variant="outlined"
                onClick={() => auth.signOut()}
                className="home__signOut"
              >
                Sign Out
              </Button>
              <div className="home__popover__footer">
                <p>Privacy Policy</p>
                <span>.</span>
                <p>Terms of Service</p>
              </div>
            </div>
          </div>
        </Popover>
      </div>
    </div>
  );
};

export default Header;
