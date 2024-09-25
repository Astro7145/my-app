import React, { useEffect, useState } from "react";
import axios from "axios";
import { modifiedToMDY } from "../src/util/calculator";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

export default function Directory(props) {
	const Folders = props.folderList.map((item, idx) => (
		<ListItem key={`${item.name + idx}`}>
			<ListItemAvatar>
				<Avatar>
					<FolderIcon />
				</Avatar>
			</ListItemAvatar>
			<ListItemText
				primary={item.name}
				secondary={modifiedToMDY(item.modified)}
			/>
		</ListItem>
	));

	const Files = props.fileList.map((item, idx) => (
		<ListItem key={`${item.name + idx}`}>
			<ListItemAvatar>
				<Avatar>
					<InsertDriveFileIcon />
				</Avatar>
			</ListItemAvatar>
			<ListItemText
				primary={`${item.name}.${item.ext}`}
				secondary={modifiedToMDY(item.modified)}
			/>
		</ListItem>
	));

	return (
		<List
			sx={{
				width: "100%",
				maxWidth: "auto",
				bgcolor: "background.paper",
			}}
		>
			{Folders}
			{Files}
		</List>
	);
}
