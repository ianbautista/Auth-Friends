import React from "react";
import "./Friends.css";

export default function Friend(props) {
	return (
		<div className="friend-card">
			<h2>{props.friend.name}</h2>
			<h3>Age: {props.friend.age}</h3>
			<h3>{props.friend.email}</h3>
		</div>
	);
}
