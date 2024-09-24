import { Suspense, useEffect } from 'react';
import './app.css';
import { createRemoteComponent } from '@module-federation/bridge-react';
import { init, loadRemote } from '@module-federation/enhanced/runtime';
import { AuthProvider, useAuth } from '@repo/auth';
import { Emitter } from '@repo/echo';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

init({
  name: 'shell',
  remotes: [
    {
      name: 'remote',
      entry: 'http://localhost:3001/mf-manifest.json',
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

  const emitter = Emitter.retrieve<{ user: string }>('shell');
  emitter.subscribe('user', (data) => changeUser(data));

  useEffect(() => {
    if (!user) return;
    console.log('[SHELL]: User changed:', user);
    emitter.emit('user', user);
  }, [user, emitter]);

  return (
    <div>
      <h1>Shell</h1>
      <p>{user ? `Hello, ${user}!` : 'Hello, guest!'}</p>
      <button type="button" onClick={() => changeUser('Visitor')}>
        Change
      </button>
    </div>
  );
};

const AppRemote = createRemoteComponent({
  loader: () => loadRemote('remote/App'),
  fallback: FallbackError,
  loading: <FallbackLoading />,
}) as unknown as () => JSX.Element;

const App = () => {
  return (
    <ErrorBoundary fallback={<FallbackError />}>
      <Suspense fallback={<FallbackLoading />}>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route index Component={Home} />
              <Route
                path="/remote/*"
                Component={() => (
                  <div className="content">
                    <AppRemote />
                    <Home />
                  </div>
                )}
              />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
