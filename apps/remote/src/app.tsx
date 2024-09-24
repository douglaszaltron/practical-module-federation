import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './app.css';
import { AuthProvider, useAuth } from '@repo/auth';
import { Emitter } from '@repo/echo';
import { useEffect } from 'react';

const Home = () => {
  const { user, login, changeUser } = useAuth();

  const emitter = Emitter.retrieve<{ user: string }>('shell');
  emitter.subscribe('user', (data) => changeUser(data));

  useEffect(() => {
    if (!user) return;
    console.log('[REMOTE]: User changed:', user);
    emitter.emit('user', user);
  }, [user, emitter]);

  return (
    <div>
      <h1>Remote</h1>
      <p>{user ? `Hello, ${user}!` : 'Hello, guest!'}</p>
      <button type="button" onClick={login}>
        Sign
      </button>
    </div>
  );
};

const About = () => {
  return (
    <div className="content">
      <h1>About</h1>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route index Component={Home} />
          <Route path="/about" Component={About} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
