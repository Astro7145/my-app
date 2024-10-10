import React, { useEffect } from "react";
import SearchAppBar from "../components/SearchAppBar";
import { Grid2 } from "@mui/material";

export default function BasicLayout({ children }) {
	useEffect(() => {}, []);

	return (
		<Grid2 container direction="column">
			<Grid2>
				<SearchAppBar
					title={"주문 목록"}
					subtitle={"음식을 만들어 주세요!"}
				/>
			</Grid2>
			<Grid2>{children}</Grid2>
		</Grid2>
	);
}
