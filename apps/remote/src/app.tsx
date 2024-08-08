import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./app.css";
import { AuthProvider, useAuth } from "@repo/auth";
import { useEffect } from "react";

const Home = () => {
	const { user, login } = useAuth();
	useEffect(() => {
		console.log("[REMOTE]: User changed:", user);
	}, [user]);

	return (
		<div>
			<h1>Remote</h1>
			<p>{user ? `Hello, ${user}!` : "Hello, guest!"}</p>
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
