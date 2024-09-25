import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Example1() {
	const [data, setData] = useState([{ id: 0, name: "" }]);

	useEffect(() => {
		axios({
			method: "get",
			url: "http://localhost:8080/api/objList",
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
					<b>name: </b>
					{item.name}
				</div>
			))}
		</div>
	);
}
