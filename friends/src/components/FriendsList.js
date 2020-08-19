import React, { useContext } from "react";
import Friends from "./Friends";
import { useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";
import { FriendsContext } from "../contexts/FriendsContext";

export default function FriendsList() {
	const history = useHistory();
	const { friends, deleteFriend, loading } = useContext(FriendsContext);

	const handleClick = () => {
		history.push("/add-friend");
	};
	return (
		<div className="friends-list">
			<img
				src="https://seeklogo.com/images/F/friends-logo-9047BF936E-seeklogo.com.png"
				alt="friends"
			/>
			<button onClick={handleClick}>Add a New Friend</button>
			<div className="friend-cards">
				{loading === true && <Loader type="Audio" color="cyan" height={150} width={150} />}
				{friends.map((friend) => (
					<Friends key={friend.id} friend={friend} />
				))}
			</div>
		</div>
	);
}
