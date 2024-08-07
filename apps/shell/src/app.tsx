import { Suspense, useEffect } from "react";
import "./app.css";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createRemoteComponent } from "@module-federation/bridge-react";
import { init, loadRemote } from "@module-federation/runtime";
import { AuthProvider, useAuth } from "@repo/auth";

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
  const { user, changeUser } = useAuth();
  return (
    <div className="content">
      <h1>Shell</h1>
      <p>{user ? `Hello, ${user}!` : "Hello, guest!"}</p>
      <button onClick={() => changeUser('Visitor')}>Change</button>
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
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route index Component={Home} />
              <Route path="/remote/*" Component={() => <AppRemote />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
