const rest_api_key = `Oq5gcQ0EqOVJbBQ3STuLwUZ8Y2Dji5cp`;
const redirect_uri = `http://localhost:3000/member/kakao`;
const auth_code_path = `https://kauth.kakao.com/oauth/authorize`;

export const getKakaoLoginLink = () => {
	const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

	return kakaoURL;
};
