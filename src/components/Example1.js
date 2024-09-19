import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Example1() {
	const [data, setData] = useState([
		{ userId: 0, id: 0, title: "", completed: false },
	]);

	useEffect(() => {
		axios({
			method: "get",
			url: "https://jsonplaceholder.typicode.com/todos",
		})
			.then((res) => {
				setData(res.data);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	return (
		<div>
			{data.map((item, idx) => (
				<div key={`ITEM${idx}`}>
					<b>id: </b>
					{item.id}
					<b>userId: </b>
					{item.userId}
					<b>title: </b>
					{item.title}
					<b>completed: </b>
					{item.completed}
				</div>
			))}
		</div>
	);
}
