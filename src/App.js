import {
  Header,
  Login,
  Main,
  PreviewChannel,
  Sidebar,
  Watch,
  SelectVideo,
  Search,
} from "./components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useAppContext } from "./context/appContext";
const App = () => {
  const { appState, showUploadVideo, videos, channel } = useAppContext();

  return (
    <Router>
      <Switch>
        {appState === "home" && (
          <div className="home">
            {videos.map(({ data }) => (
              <Route path={`/watch/${data.id}`} key={data.id}>
                <Header />
                <Watch video={data} vidId={data.id} />
              </Route>
            ))}

            <Route path="/previewChannel/">
              <Header />
              <div className="app">
                <Sidebar changeWidth />
                <PreviewChannel />
              </div>
            </Route>

            <Route path="/search">
              <Header />
              <div className="app">
                <Sidebar searchChangeWidth />
                <Search />
              </div>
            </Route>

            <Route exact path="/">
              <Header />
              <div className="app">
                <Sidebar />
                <Main />

                {showUploadVideo && <SelectVideo />}
              </div>
            </Route>
          </div>
        )}
        {appState === "login" && <Login />}
      </Switch>
    </Router>
  );
};

export default App;
