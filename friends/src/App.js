import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Login from "./components/Login";

export default function App() {
	return (
		<Router>
			<main className="app">
				<header className="top">
					<nav>
						<Link to="/login">Login</Link>
					</nav>
				</header>

				<Switch>
					<Route path="/login" component={Login} />
					<Route component={Login} />
				</Switch>
			</main>
		</Router>
	);
}
