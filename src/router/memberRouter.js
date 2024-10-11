import { lazy, Suspense } from "react";

const Loading = <div>Loading...</div>;
const KakaoRedirect = lazy(() => import("../pages/member/KakaoRedirectPage"));

const memberRouter = () => {
	return [
		{
			path: "kakao",
			element: (
				<Suspense fallback={Loading}>
					<KakaoRedirect />
				</Suspense>
			),
		},
	];
};

export default memberRouter;
