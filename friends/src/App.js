import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "./App.css";

import Login from "./components/Login";
import FriendsList from "./components/FriendsList";
import PrivateRoute from "./components/PrivateRoute";
import AddFriend from "./components/AddFriend";

import { FriendsContext } from "./contexts/FriendsContext";
import { axiosWithAuth } from "./utils/axiosWithAuth";

export default function App() {
	const [friends, setFriends] = useState([]);
	const [loading, setLoading] = useState(false);

	const getFriends = () => {
		setLoading(true);
		axiosWithAuth()
			.get("/api/friends")
			.then((res) => {
				setFriends(res.data);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	useEffect(() => {
		getFriends();
	}, []);

	const postNewFriend = (friend) => {
		axiosWithAuth()
			.post("/api/friends", friend)
			.then((res) => {
				setFriends([]);
				getFriends();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const deleteFriend = (id) => {
		axiosWithAuth()
			.delete(`/api/friends/${id}`)
			.then((res) => {
				setFriends([]);
				getFriends();
			});
	};

	return (
		<Router>
			<FriendsContext.Provider
				value={{
					setFriends,
					getFriends,
					friends,
					loading,
					postNewFriend,
					deleteFriend,
				}}
			>
				<div className="App">
					<header className="App-header">
						<img
							src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Friends_logo.svg/1280px-Friends_logo.svg.png"
							alt="friends logo"
						/>
						<Link className="nav" to="/">
							Home
						</Link>
						<Link className="nav" to="/Login">
							Login
						</Link>
						<Link className="nav" to="/Friends">
							Friends
						</Link>
					</header>
				</div>
				<div className="main-content">
					<Switch>
						<PrivateRoute path="/friends" component={FriendsList} />
						<PrivateRoute path="/add-friend" component={AddFriend} />
						<Route path="/login" component={Login} />
						<Route exact path="/">
							<h1>Welcome Friends!</h1>
							<img
								src="http://getwallpapers.com/wallpaper/full/2/6/c/1017915-friends-tv-show-wallpapers-1920x1080-for-mac.jpg"
								alt="friends cast"
							/>
						</Route>
					</Switch>
				</div>
			</FriendsContext.Provider>
		</Router>
	);
}
