import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./app.css";

const Home = () => {
  return (
    <div className="content">
      <h1>Remote</h1>
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
    <BrowserRouter>
      <Routes>
        <Route index Component={Home} />
        <Route path="/about" Component={About} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
