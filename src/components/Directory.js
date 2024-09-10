import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Directory() {
	let dir;
	let curDir;
	let fileList = [];

	const [folderList, setFolderList] = useState([]);

	// useEffect(() => {
	// 	dir = data.directory;
	// 	curDir = data.currentDirectory;
	// 	folderList = data.folderList;
	// 	fileList = data.fileList;
	// }, [data]);

	axios({
		method: "get",
		url: "https://gist.githubusercontent.com/Astro7145/c7e454dd629dd23ae2b2e71d688e2881/raw/847ffb7d4386dd68b7db0b3743c98572c4a32195/tempserverdirectory.json",
	})
		.then((res) => {
			setFolderList(res.data.folderList);
		})
		.catch((err) => {
			console.error(err);
		});

	const Folder = folderList.map((item, idx) => (
		<div key={`${item.name + idx}`}>
			<b>name: </b>
			{item.name}
			<br />
			<b>modified: </b>
			{item.type}
			<br />
			<b>name: </b>
			{item.modified}
			<br />
			<hr />
		</div>
	));

	return (
		<div>
			<hr />
			{Folder}
		</div>
	);
}
