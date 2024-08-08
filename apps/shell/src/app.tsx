import { Suspense, useEffect } from "react";
import "./app.css";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createRemoteComponent } from "@module-federation/bridge-react";
import { init, loadRemote } from "@module-federation/runtime";
import { AuthProvider, useAuth } from "@repo/auth";
import * as Auth from "@repo/auth";
import React from "react";
import ReactDOM from "react-dom";

init({
  name: "shell",
  remotes: [
    {
      name: "remote",
      entry: "http://localhost:3001/mf-manifest.json"
    },
  ],
  shared: {
    react: {
      version: '18.3.1',
      scope: 'default',
      lib: () => React,
      shareConfig: {
        eager: true,
        singleton: true,
        requiredVersion: '^18.3.1',
      }
    },
    "react-dom": {
      version: '18.3.1',
      scope: 'default',
      lib: () => ReactDOM,
      shareConfig: {
        eager: true,
        singleton: true,
        requiredVersion: '^18.3.1',
      }
    },
    "@repo/auth": {
      version: '0.0.1',
      scope: 'default',
      lib: () => Auth,
      shareConfig: {
        eager: true,
        singleton: true,
        requiredVersion: '^0.0.1',
      }
    },
  },
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
  useEffect(() => {
    console.log("[SHELL]: User changed:", user);
  }, [user])

  return (
    <div>
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
              <Route path="/remote/*" Component={() => (<div className="content"><AppRemote /><Home /></div>)} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
