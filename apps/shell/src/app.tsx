import { Suspense } from "react";
import "./app.css";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createRemoteComponent } from "@module-federation/bridge-react";
import { init, loadRemote } from "@module-federation/runtime";

init({
  name: "shell",
  remotes: [
    {
      name: "remote",
      entry: "http://localhost:3001/mf-manifest.json",
    },
  ],
});

const FallbackLoading = () => {
  return (
    <div className="content">
      <h1>Loading...</h1>
    </div>
  );
};

const FallbackError = () => {
  return (
    <div className="content">
      <h1>Failed to load remote.</h1>
    </div>
  );
};

const Home = () => {
  return (
    <div className="content">
      <h1>Shell</h1>
    </div>
  );
};

const AppRemote = createRemoteComponent({
  loader: () => loadRemote("remote/App"),
  fallback: FallbackError,
  loading: <FallbackLoading />,
}) as () => JSX.Element;

const App = () => {
  return (
    <ErrorBoundary fallback={<FallbackLoading />}>
      <Suspense fallback={<FallbackLoading />}>
        <BrowserRouter>
          <Routes>
            <Route index Component={Home} />
            <Route path="/remote/*" Component={() => <AppRemote />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
