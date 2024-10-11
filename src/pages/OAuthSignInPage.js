import * as React from "react";

import { useTheme } from "@mui/material/styles";
import {
	Button,
	Grid2,
	styled,
	ThemeProvider,
	Typography,
	Divider,
	TextField,
	FormControlLabel,
	Checkbox,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";

import { getKakaoLoginLink } from "../util/APIs/kakaoApi";
import { Link, useNavigate } from "react-router-dom";

const providers = [
	{
		id: "github",
		name: "GitHub",
		icon: <GitHubIcon />,
		color: "black",
		fontColor: "white",
		link: "",
	},
	{
		id: "google",
		name: "Google",
		icon: <GoogleIcon />,
		color: "#4285F4",
		fontColor: "white",
		link: "",
	},
	{
		id: "kakao",
		name: "Kakao",
		icon: <ChatBubbleIcon />,
		color: "#FEE500",
		fontColor: "rgba(0, 0, 0, 0.85)",
		link: getKakaoLoginLink(),
	},
];

const LoginButton = styled(Button)(({ theme }) => ({
	fontSize: 16,
	fontWeight: 600,
	textTransform: "none",
}));

const componentSize = { xs: 6, sm: 6, md: 4, lg: 3, xl: 3 };
const componentOffset = { xs: 3, sm: 3, md: 4, lg: 4.5, xl: 4.5 };

export default function OAuthSignInPage() {
	const navigate = useNavigate();

	const theme = useTheme();
	return (
		<ThemeProvider theme={theme}>
			<Grid2 container columns={12} spacing={1} direction="column">
				<Grid2
					size={componentSize}
					offset={componentOffset}
					textAlign="center"
					sx={{ mt: 10 }}
				>
					<LoginIcon fontSize="large" color="primary" />
				</Grid2>
				<Grid2
					container
					size={componentSize}
					offset={componentOffset}
					direction="column"
					spacing={0}
				>
					<Grid2 textAlign="center">
						<Typography variant="h3">Sign in</Typography>
					</Grid2>
					<Grid2 textAlign="center">
						<Typography
							variant="caption"
							color="textDisabled"
							fontSize={16}
						>
							please sign in to continue
						</Typography>
					</Grid2>
				</Grid2>
				<Grid2
					container
					size={componentSize}
					offset={componentOffset}
					columns={componentSize}
					rowSpacing={1}
					sx={{ mt: 2 }}
				>
					{providers.map((item, idx) => (
						<Grid2 size={componentSize}>
							<LoginButton
								disableElevation
								fullWidth
								variant="contained"
								size="large"
								startIcon={item.icon}
								sx={{
									backgroundColor: item.color,
								}}
								onClick={() => window.open(item.link)}
							>
								<Typography
									sx={{
										fontSize: 16,
										fontWeight: 600,
										display: {
											xs: "block",
											sm: "none",
										},
									}}
								>
									{item.name}
								</Typography>
								<Typography
									sx={{
										fontSize: 16,
										fontWeight: 600,
										display: {
											xs: "none",
											sm: "block",
										},
									}}
								>
									{`Sign in with ${item.name}`}
								</Typography>
							</LoginButton>
						</Grid2>
					))}
				</Grid2>
				<Grid2 size={componentSize} offset={componentOffset}>
					<Divider sx={{ mt: 2 }}>
						<Typography color="textDisabled" fontWeight={600}>
							or
						</Typography>
					</Divider>
				</Grid2>
				<Grid2 size={componentSize} offset={componentOffset}>
					<TextField
						autoFocus
						fullWidth
						id="userEmail"
						label="Email Address"
						defaultValue=""
						variant="outlined"
						sx={{ mt: 2 }}
					/>
					<TextField
						fullWidth
						id="userPassword"
						label="Password"
						defaultValue=""
						variant="outlined"
						sx={{ mt: 1 }}
					/>
					<FormControlLabel
						control={<Checkbox />}
						label="Remember me"
					/>
					<LoginButton
						disableElevation
						fullWidth
						variant="contained"
						size="large"
						sx={{ mt: 2 }}
					>
						Sign in
					</LoginButton>
					<Grid2 container columns={2}>
						<Grid2 size={1}>
							<Typography
								variant="caption"
								component="a"
								color="info"
								fontSize={14}
								href="#"
							>
								Forgot password?
							</Typography>
						</Grid2>
						<Grid2 size={1} textAlign="end">
							<Typography
								variant="caption"
								component="a"
								color="info"
								fontSize={14}
								href="#"
							>
								Don't have an account? Sign Up
							</Typography>
						</Grid2>
					</Grid2>
				</Grid2>
			</Grid2>
		</ThemeProvider>
	);
}
