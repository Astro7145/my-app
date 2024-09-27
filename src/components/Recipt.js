import React, { useRef, useState } from "react";
import { addComma } from "../util/calculator";
import { setReciptDone, cancelRecipt } from "../util/data";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Divider,
	Grid2,
	List,
	ListItem,
	ListItemText,
	Skeleton,
	Stack,
} from "@mui/material";

export default function Recipt(props) {
	const dialogType = useRef("");
	const dialogOrder = useRef({
		id: 0,
		purchase_date: "",
		table_number: 0,
		purchase_type: 0,
		tax: 0,
		products: [
			{
				id: 0,
				prod_serial: 0,
				prod_name: "",
				purchase_date: "",
				prod_quantity: 0,
			},
		],
		success: false,
		done: true,
	});

	const [openDialog, setOpenDialog] = useState(false);

	const handleOpenDialog = () => {
		setOpenDialog(true);
	};

	const handleCloseDialog = () => {
		setOpenDialog(false);
	};

	function printDialog() {
		let title = "";
		if (dialogType.current === "done") {
			title = `${dialogOrder.current.table_number}번 테이블의 주문을 완료 처리합니다.`;
		} else if (dialogType.current === "discard") {
			title = `${dialogOrder.current.table_number}번 테이블의 주문을 취소하시겠습니까?`;
		} else {
			title = `${dialogOrder.current.table_number}번 테이블 오류 발생`;
		}

		let dialogButton;
		if (dialogType.current === "done") {
			dialogButton = (
				<DialogActions>
					<Button
						onClick={() => {
							setReciptDone(dialogOrder.current.id);
							handleCloseDialog();
							window.location.reload(true);
						}}
						color="primary"
						variant="contained"
					>
						DONE
					</Button>
					<Button
						onClick={handleCloseDialog}
						variant="text"
						autoFocus
					>
						CANCEL
					</Button>
				</DialogActions>
			);
		} else if (dialogType.current === "discard") {
			dialogButton = (
				<DialogActions>
					<Button
						onClick={() => {
							cancelRecipt(dialogOrder.current.id);
							handleCloseDialog();
							window.location.reload(true);
						}}
						color="error"
						variant="outlined"
					>
						DISCARD
					</Button>
					<Button onClick={handleCloseDialog} color="error" autoFocus>
						CANCEL
					</Button>
				</DialogActions>
			);
		} else {
			dialogButton = (
				<DialogActions>
					<Typography color="error">Error</Typography>
				</DialogActions>
			);
		}

		return (
			<Dialog
				open={openDialog}
				onClose={handleCloseDialog}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
				fullWidth={true}
			>
				<DialogTitle id="alert-dialog-title">{title}</DialogTitle>
				<DialogContent>
					{dialogOrder.current.products.map((product, idx) => (
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
							{`${addComma(dialogOrder.current.total_price)}원`}
						</Grid2>
					</Grid2>
				</DialogContent>
				{dialogButton}
			</Dialog>
		);
	}

	const card = props.orderList.map((order, idx) => (
		<Grid2 key={`ORDER_${idx}`} size={{ xs: 2, sm: 4, md: 4 }}>
			<Card variant="outlined" sx={{ boxShadow: 2 }}>
				<React.Fragment>
					<CardContent>
						<Grid2
							container
							// columnSpacing={{ sx: 2, sm: 4, md: 12 }}
						>
							<Grid2 size="grow">
								{props.loading ? (
									<Skeleton animation="wave" width={100} />
								) : (
									<Typography
										variant="h5"
										component="div"
										textAlign="left"
									>
										{props.loading ? (
											<Skeleton animation="wave" />
										) : (
											`${
												order.purchase_type === 2
													? "배달 주문"
													: String(
															order.table_number
													  ).padStart(2, "0") +
													  "번 테이블"
											}`
										)}
									</Typography>
								)}
							</Grid2>
							<Grid2 size="grow">
								{props.loading ? (
									<Skeleton animation="wave" width={100} />
								) : (
									<Typography
										textAlign="right"
										sx={{
											color: "text.secondary",
											fontSize: 14,
										}}
									>
										{order.purchase_date}
									</Typography>
								)}
							</Grid2>
						</Grid2>
						<Divider sx={{ mt: 1, mb: 1 }}>
							<Typography color="textDisabled">
								Order list
							</Typography>
						</Divider>
						{props.loading ? (
							<Skeleton animation="wave" height={300} />
						) : (
							order.products.map((product, idx) => (
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
							))
						)}
						<Divider sx={{ mt: 1, mb: 2 }}>
							<Typography color="textDisabled">Price</Typography>
						</Divider>
						{props.loading ? (
							<Skeleton animation="wave" height={30} />
						) : (
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
						)}
						<Grid2
							container
							spacing={2}
							justifyContent="end"
							alignItems="center"
							flexDirection={{ sx: "column", sm: "row" }}
							sx={{ fontSize: "12px" }}
						>
							{props.loading ? (
								<Skeleton animation="wave" width={100} />
							) : (
								<Grid2 sx={{ order: { sx: 2, sm: 1 } }}>
									{`부가세 ${addComma(
										order.total_price / order.tax
									)}원 포함`}
								</Grid2>
							)}
						</Grid2>
						<Stack spacing={2} sx={{ mt: 5 }}>
							<Button
								variant="contained"
								color="primary"
								onClick={() => {
									dialogOrder.current = order;
									dialogType.current = "done";
									handleOpenDialog();
								}}
							>
								DONE
							</Button>
							<Button
								variant="outlined"
								color="error"
								onClick={() => {
									dialogOrder.current = order;
									dialogType.current = "discard";
									handleOpenDialog();
								}}
							>
								DISCARD
							</Button>
						</Stack>
					</CardContent>
				</React.Fragment>
			</Card>
		</Grid2>
	));

	return (
		<Box sx={{ flexGrow: 1, p: 5 }}>
			<Grid2
				container
				spacing={{ xs: 6, md: 6 }}
				columns={{ xs: 4, sm: 8, md: 12 }}
			>
				{card}
			</Grid2>
			{printDialog()}
		</Box>
	);
}
