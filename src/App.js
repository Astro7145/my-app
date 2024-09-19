import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import DirectoryTable from "./components/DirectoryTable";
import Directory from "./components/Directory";
import SearchAppBar from "./components/SearchAppBar";
import Example1 from "./components/Example1";
import Example2 from "./components/Example2";

function App() {
	const [data, setData] = useState({
		directory: "",
		currentDirectory: "",
		folderList: [],
		fileList: [],
	});

	useEffect(() => {
		axios({
			method: "get",
			url: "https://gist.githubusercontent.com/Astro7145/c7e454dd629dd23ae2b2e71d688e2881/raw/1f0bd1e5d8795a8173fe86cdff54eaf1fc84f861/tempserverdirectory.json",
		})
			.then((res) => {
				setData(res.data);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	const curDir = data.currentDirectory;
	const dir = data.directory;
	const folderList = data.folderList;
	const fileList = data.fileList;

	return (
		<div className="App">
			<SearchAppBar curDir={curDir} dir={dir} />
			{/* <Directory folderList={folderList} fileList={fileList} /> */}
			<DirectoryTable folderList={folderList} fileList={fileList} />
			{/* <Example2 /> */}
		</div>
	);
}

export default App;
