import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

const Loading = <div>Loading...</div>;
const Main = lazy(() => import("../pages/OrderList"));
const Login = lazy(() => import("../pages/OAuthSignInPage"));

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
]);

export default root;
