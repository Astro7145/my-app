import * as React from "react";
import { calculateSize, modifiedToMDY } from "../util/calculator";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { Typography } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.white,
		color: "#1976d2",
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	"&:nth-of-type(odd)": {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	"&:last-child td, &:last-child th": {
		border: 0,
	},
}));

export default function DirectoryTable(props) {
	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 700 }} aria-label="customized table">
				<TableHead>
					<TableRow>
						<StyledTableCell colSpan={2}>Name</StyledTableCell>
						<StyledTableCell align="right">
							Modified
						</StyledTableCell>
						<StyledTableCell align="right">Owner</StyledTableCell>
						<StyledTableCell align="right">Size</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{props.folderList.map((item) => (
						<StyledTableRow key={item.name}>
							<StyledTableCell align="center" padding="checkbox">
								<FolderIcon
									fontSize="medium"
									sx={{ color: "#1976d2" }}
								/>
							</StyledTableCell>
							<StyledTableCell>
								<Typography>{item.name}</Typography>
							</StyledTableCell>
							<StyledTableCell align="right">
								{modifiedToMDY(item.modified)}
							</StyledTableCell>
							<StyledTableCell align="right">
								{item.owner}
							</StyledTableCell>
							<StyledTableCell align="right">
								{calculateSize(item.size)}
							</StyledTableCell>
						</StyledTableRow>
					))}
					{props.fileList.map((item) => (
						<StyledTableRow key={item.name}>
							<StyledTableCell align="center" padding="checkbox">
								<InsertDriveFileIcon
									fontSize="medium"
									sx={{ color: "#8f8f8f" }}
								/>
							</StyledTableCell>
							<StyledTableCell align="left">
								<Typography>{`${item.name}.${item.ext}`}</Typography>
							</StyledTableCell>
							<StyledTableCell align="right">
								{modifiedToMDY(item.modified)}
							</StyledTableCell>
							<StyledTableCell align="right">
								{item.owner}
							</StyledTableCell>
							<StyledTableCell align="right">
								{calculateSize(item.size)}
							</StyledTableCell>
						</StyledTableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
