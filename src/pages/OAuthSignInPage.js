import * as React from "react";

import { useTheme } from "@mui/material/styles";
import { AppProvider, SignInPage } from "@toolpad/core";
import {
	Box,
	Button,
	Grid2,
	styled,
	ThemeProvider,
	Typography,
	Divider,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";

const providers = [
	{
		id: "github",
		name: "GitHub",
		icon: <GitHubIcon />,
		color: "black",
		fontColor: "white",
	},
	{
		id: "google",
		name: "Google",
		icon: <GoogleIcon />,
		color: "#4285F4",
		fontColor: "white",
	},
	{
		id: "kakao",
		name: "Kakao",
		icon: <ChatBubbleIcon />,
		color: "#FEE500",
		fontColor: "rgba(0, 0, 0, 0.85)",
	},
];

const SocialLoginButton = styled(Button)(({ theme }) => ({
	fontSize: 16,
	fontWeight: 600,
	textTransform: "none",
}));

const signIn = async (provider) => {
	const promise = new Promise((resolve) => {
		setTimeout(() => {
			console.log(`Sign in with ${provider.id}`);
			resolve();
		}, 500);
	});
	return promise;
};

export default function OAuthSignInPage() {
	const theme = useTheme();
	return (
		<ThemeProvider theme={theme}>
			<Grid2
				container
				columns={{ xs: 1, sm: 9, md: 5, lg: 3, xl: 3 }}
				spacing={1}
				alignContent="center"
				direction="column"
				// sx={{ backgroundColor: "blue" }}
			>
				<Grid2
					size={{ xs: 1, sm: 5, md: 2, lg: 1, xl: 1 }}
					textAlign="center"
					// sx={{ backgroundColor: "red" }}
					sx={{ mt: 10 }}
				>
					<LoginIcon fontSize="large" color="primary" />
				</Grid2>
				<Grid2
					container
					direction="column"
					spacing={0}
					// sx={{ backgroundColor: "green" }}
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
					columns={5}
					rowSpacing={1}
					// sx={{ backgroundColor: "red" }}
					display="flex"
					justifyContent="center"
					sx={{ mt: 2 }}
				>
					{providers.map((item, idx) => (
						<Grid2 size={3}>
							<SocialLoginButton
								disableElevation
								fullWidth
								variant="contained"
								size="large"
								startIcon={item.icon}
								sx={{
									color: item.fontColor,
									backgroundColor: item.color,
								}}
							>
								<Typography
									sx={{
										fontSize: 16,
										fontWeight: 600,
										display: { xs: "block", sm: "none" },
									}}
								>
									{item.name}
								</Typography>
								<Typography
									sx={{
										fontSize: 16,
										fontWeight: 600,
										display: { xs: "none", sm: "block" },
									}}
								>
									{`Sign in with ${item.name}`}
								</Typography>
							</SocialLoginButton>
						</Grid2>
					))}
				</Grid2>
				<Grid2>
					<Divider sx={{ mt: 2 }}>
						<Typography color="textDisabled" fontWeight={600}>
							or
						</Typography>
					</Divider>
				</Grid2>
				<Grid2 container>{/* 로그인 정보 직접 입력 */}</Grid2>
			</Grid2>
		</ThemeProvider>
	);
}
