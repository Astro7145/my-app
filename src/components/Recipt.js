import React from "react";
import { addComma } from "../util/calculator";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid2, List, ListItem, ListItemText } from "@mui/material";

export default function Recipt(props) {
	const card = props.orderList.map((order, idx) => (
		<Grid2 key={`ORDER_${idx}`} size={{ xs: 2, sm: 4, md: 4 }}>
			<Card
				variant="outlined"
				sx={{ margin: 3, width: 400, boxShadow: 2 }}
			>
				<React.Fragment>
					<CardContent>
						<Typography
							gutterBottom
							sx={{ color: "text.secondary", fontSize: 14 }}
						>
							{order.purchase_date}
						</Typography>
						<Typography variant="h5" component="div">
							{`${
								order.purchase_type === 2
									? "배달 주문"
									: String(order.table_number).padStart(
											2,
											"0"
									  ) + "번 테이블"
							}`}
						</Typography>
						{order.products.map((product, idx) => (
							<List
								key={`PRODUCT_${idx}`}
								sx={{
									width: "100%",
									bgcolor: "background.paper",
								}}
							>
								<ListItem alignItems="flex-start">
									<ListItemText
										primary={`${product.prod_name} ${product.prod_quantity}건`}
										secondary={`단가 ${addComma(
											product.prod_price
										)}원 • 총 ${addComma(
											product.prod_price *
												product.prod_quantity
										)}원`}
									></ListItemText>
								</ListItem>
							</List>
						))}
						<Grid2
							container
							spacing={2}
							justifyContent="space-between"
							alignItems="center"
							flexDirection={{ sx: "column", sm: "row" }}
							sx={{ fontSize: "20px" }}
						>
							<Grid2 sx={{ order: { sx: 2, sm: 1 } }}>
								{`받은 금액`}
							</Grid2>
							<Grid2 sx={{ order: { sx: 2, sm: 1 } }}>
								{`${addComma(order.total_price)}원`}
							</Grid2>
						</Grid2>
						<Grid2
							container
							spacing={2}
							justifyContent="end"
							alignItems="center"
							flexDirection={{ sx: "column", sm: "row" }}
							sx={{ fontSize: "12px" }}
						>
							<Grid2 sx={{ order: { sx: 2, sm: 1 } }}>
								{`부가세 ${addComma(
									order.total_price / order.tax
								)}원 포함`}
							</Grid2>
						</Grid2>
					</CardContent>
				</React.Fragment>
			</Card>
		</Grid2>
	));

	return (
		<Box sx={{ flexGrow: 1, padding: 5 }}>
			<Grid2
				container
				spacing={{ xs: 2, md: 3 }}
				column={{ xs: 4, xm: 8, md: 12 }}
			>
				{card}
			</Grid2>
		</Box>
	);
}
