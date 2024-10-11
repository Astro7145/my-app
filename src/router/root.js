import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import memberRouter from "./memberRouter";

const Loading = <div>Loading...</div>;
const Main = lazy(() => import("../pages/OrderList"));
const Login = lazy(() => import("../pages/OAuthSignInPage"));
const KakaoRedirect = lazy(() => import("../pages/member/KakaoRedirectPage"));

const root = createBrowserRouter([
	{
		path: "",
		element: (
			<Suspense fallback={Loading}>
				<Main />
			</Suspense>
		),
	},
	{
		path: "login",
		element: (
			<Suspense fallback={Loading}>
				<Login />
			</Suspense>
		),
	},
	{
		path: "member",
		element: (
			<Suspense fallback={Loading}>
				<KakaoRedirect />
			</Suspense>
		),
		children: memberRouter(),
	},
]);

export default root;
